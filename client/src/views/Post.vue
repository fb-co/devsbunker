<template>
    <div class="main_post_container">
        <div v-if="postData">
            <PostMobile v-if="$store.getters.mobile" :projectData="postData" />
            <PostDesktop v-if="!$store.getters.mobile" :projectData="postData" :authorData="authorData" :notifications="[]" @postComment="postComment" />
        </div>
        <NewPostMenu ref="newPostMenu" />
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import GraphQLService from "../services/graphql.service";

import PostMobile from "../components/Post/PostMobile.vue";
import PostDesktop from "../components/Post/PostDesktop.vue";
import NewPostMenu from "../components/NewPost/NewPost.vue";

export default {
    data() {
        return {
            postData: undefined,
            authorData: undefined,
        };
    },
    async created() {
        SharedMethods.loadPage();

        // TODO: first thing to do is checking if we have already fetched all the project details
        // TODO: by using the new API call in the posts cache "extractCachedFullPostById"
        // TODO: if we get a match then we dont need to run the code below

        await this.$store.dispatch("extractCachedPostById", this.$route.params.postid);

        const cachedPost = this.$store.getters.cachedPostById;

        if (this.$store.getters.cachedNewlyMadePost && cachedPost.id === this.$store.getters.cachedNewlyMadePost.id) {
            this.postData = this.$store.getters.cachedNewlyMadePost;
        } else {
            let toFetch = [];

            if (cachedPost) {
                // we can use the cached data
                toFetch = [
                    `images {
                        ogname
                    dbname
                }`,
                    "links",
                    "tags",
                    "collaborators",
                    "createdAt",
                    `comments {
                        commenter
                    comment
                    timestamp
                }`,
                ];
            } else {
                toFetch = [
                    "author",
                    "title",
                    "bunkerTag",
                    "description",
                    "id",
                    `images {
                        ogname
                    dbname
                }`,
                    "isLiked",
                    "isSaved",
                    "likeAmt",
                    "price",
                    "links",
                    "collaborators",
                    "tags",
                    "createdAt",
                    `comments {
                        commenter
                    comment
                    timestamp
                }`,
                ];
            }

            const pData = await GraphQLService.fetchPostById(this.$route.params.postid, toFetch, this.$store.getters.accessToken);

            this.postData = pData.data.getPostById;

            if (cachedPost) {
                // we need to merge the new data to the cached post
                this.postData = Object.assign(this.postData, cachedPost);

                // 10 hours of troubleshooting later, I found out that it was not reactive because of this cache. So by
                // assigning the post data object to a new fresh object, vuejs recalculates the hash making the frontend watch for changes again,
                // so DONT REMOVE THIS EVEN IF IT LOOKS STUPID
                this.postData = Object.assign({}, this.postData);
            }
        }

        this.getAuthorData(this.postData.author);
    },
    methods: {
        getAuthorData(author) {
            GraphQLService.fetchUserDetails(author, ["followerAmt", "isFollowing"], this.$store.getters.username).then((res) => {
                this.authorData = res.data.user;
            });
        },
        async postComment(value) {
            const response = await GraphQLService.commentOnPost(this.postData.id, value, this.$store.getters.accessToken);

            // if it was successfull
            if (response.data.commentOnPost.commenter != null) {
                this.postData.comments.push(response.data.commentOnPost);
            }
        },
        openPostMenu() {
            this.$refs.newPostMenu.open();
        },
        closePostMenu() {
            this.$refs.newPostMenu.close();
        },
    },
    components: {
        PostMobile,
        PostDesktop,
        NewPostMenu,
    },
};
</script>

<style scoped></style>

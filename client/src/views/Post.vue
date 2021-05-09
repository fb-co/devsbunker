<template>
    <div class="main_post_container">
        <div v-if="postData">
            <PostMobile v-if="$store.getters.mobile" :projectData="postData" />
            <PostDesktop v-if="!$store.getters.mobile" :projectData="postData" :authorData="authorData" :notifications="[]" @postComment="postComment" />
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import GraphQLService from "../services/graphql.service";

import PostMobile from "../components/Post/PostMobile.vue";
import PostDesktop from "../components/Post/PostDesktop.vue";

export default {
    data() {
        return {
            postData: undefined,
            authorData: undefined,
        };
    },
    async created() {
        SharedMethods.loadPage();

        await this.$store.dispatch("extractCachedPostById", this.$route.params.postid);

        const cachedPost = this.$store.getters.cachedPostById;

        if (this.$store.getters.cachedNewlyMadePost && cachedPost.id === this.$store.getters.cachedNewlyMadePost.id) {
            this.postData = this.$store.getters.cachedNewlyMadePost;
        } else {
            let toFetch = [];

            if (cachedPost) {
                console.log("this post was cached, so I had to fetch less data :D");

                // we can use the cached data
                toFetch = [
                    `images {
                        ogname
                    dbname
                }`,
                    "links",
                    "tags",
                    "createdAt",
                    `comments {
                        commenter
                    comment
                    timestamp
                }`,
                ];
            } else {
                // get everything
                console.log("this post was not cached, so I had to fetch everthing :(");

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
                // TODO: flag this post (merge it also in the cache) so if the user clicks again on the same post we don't have to refetch all this data
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
    },
    components: {
        PostMobile,
        PostDesktop,
    },
};
</script>

<style scoped></style>

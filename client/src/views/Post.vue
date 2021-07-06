<template>
    <div class="main_post_container">
        <div v-if="postData">
            <PostMobile v-if="$store.getters.mobile" :projectData="postData" @postComment="postComment" />
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

        const cachedPost = this.$store.getters.getFullPost(this.$route.params.postid);

        if (cachedPost) {
            this.postData = cachedPost;
            this.authorData = cachedPost.authorData; // this is hidden in here when the post is cached
        } else {
            const toFetch = [
                "author",
                "title",
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
                    id
                    userId
                    payload
                    createdBy
                    createdAt
                }`,
            ];

            // fetch the post data
            const pData = await GraphQLService.fetchPostById(this.$route.params.postid, toFetch, this.$store.getters.accessToken);
            this.postData = pData.data.getPostById;

            // fetch the author details
            const authorData = await this.getAuthorData(this.postData.author);
            this.authorData = authorData.data.user;

            // kinda strange, but hide the author data into the post object so that you can avoid re-asking the server for that too when the post is cached
            let postToCache = pData.data.getPostById;
            postToCache.authorData = authorData.data.user;

            this.$store.dispatch("cacheFullPost", postToCache);
        }

        /* We might need to add this back in the future, im not sure
            if (cachedPost) {
                // we need to merge the new data to the cached post
                this.postData = Object.assign(this.postData, cachedPost);

                // 10 hours of troubleshooting later, I found out that it was not reactive because of this cache. So by
                // assigning the post data object to a new fresh object, vuejs recalculates the hash making the frontend watch for changes again,
                // so DONT REMOVE THIS EVEN IF IT LOOKS STUPID
                this.postData = Object.assign({}, this.postData);
            }
        */
    },
    methods: {
        async getAuthorData(author) {
            return await GraphQLService.fetchUserDetails(author, ["followerAmt", "isFollowing"], this.$store.getters.username);
        },
        async postComment(value) {
            const response = await GraphQLService.commentOnPost(this.postData.id, value, this.$store.getters.accessToken);

            // if it was successfull
            if (response.data.commentOnPost.userId != null) {
                console.log(response);
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

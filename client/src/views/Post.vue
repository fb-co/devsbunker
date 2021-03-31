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

        //get the data including comments and everything
        const pData = await GraphQLService.fetchPostById(this.$route.params.postid, [
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
        ], this.$store.getters.accessToken);

        this.postData = pData.data.getPostById;
        this.getAuthorData(this.postData.author);
    },
    methods: {
        getAuthorData(author) {
            GraphQLService.fetchUserDetails(
                author,
                ["followerAmt", "isFollowing"],
                this.$store.getters.username
            ).then((res) => {
                this.authorData = res.data.user;
            });
        },
        async postComment(value) {
            const response = await GraphQLService.commentOnPost(this.postData.id, value, this.$store.getters.accessToken);

            // if it was successfull
            if (response.data.commentOnPost.commenter != null) {
                this.postData.comments.push(response.data.commentOnPost);
            }
        }
    },
    components: {
        PostMobile,
        PostDesktop,
    },
};
</script>

<style scoped></style>

    
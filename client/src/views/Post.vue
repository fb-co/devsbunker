<template>
    <div class="main_post_container">
        <div v-if="postData">
            <PostMobile v-if="$store.getters.mobile" :projectData="postData" />
            <PostDesktop v-if="!$store.getters.mobile" :projectData="postData" :authorData="authorData" :notifications="[]" />
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
    created() {
        SharedMethods.loadPage();

        // sometimes the query is just a string that says [Object object], so I had to handle for it
        if (!this.$route.query.projectData.title) {
            GraphQLService.fetchPostById(this.$route.params.postid, [
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
            ]).then((res) => {
                this.postData = res.data.getPostById;
                this.getAuthorData(this.postData.author); // make sure these two calls stay seperate since one is in an async response
            });
        } else {
            this.postData = this.$route.query.projectData;
            this.getAuthorData(this.postData.author);
        }
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
    },
    components: {
        PostMobile,
        PostDesktop,
    },
};
</script>

<style scoped></style>

    
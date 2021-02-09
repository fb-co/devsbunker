<template>
    <div class="main_post_container">
        <div v-if="postData">
            <PostMobile v-if="mobile" :projectData="postData" />
            <PostDesktop
                v-if="!mobile"
                :projectData="postData"
                :authorData="authorData"
                :notifications="[]"
            />
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import ScreenType from "../utils/screenType.js";
import GraphQLService from "../services/graphql.service";

import PostMobile from "../components/Post/PostMobile.vue";
import PostDesktop from "../components/Post/PostDesktop.vue";

export default {
    data() {
        return {
            mobile: false,
            postData: undefined,
            authorData: undefined
        };
    },
    created() {
        SharedMethods.loadPage();
        this.mobile = this.isMobile();

        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
        });

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
        isMobile() {
            return ScreenType.isMobile(950);
        },
        getAuthorData(author) {
            GraphQLService.fetchUserDetails(author, ["followerAmt", "isFollowing"], this.$store.getters.username).then((res) => {
                this.authorData = res.data.user;
            });
        }
    },
    components: {
        PostMobile,
        PostDesktop,
    },
};
</script>

<style scoped></style>

    
<template>
    <div class="main_post_container">
        <div v-if="postData">
            <PostMobile v-if="mobile" :projectData="postData" />
            <PostDesktop
                v-if="!mobile"
                :projectData="postData"
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
            postData: undefined
        };
    },
    created() {
        // What does it mean?? It works while being on mobile but not on desktop
        // refrain from setting 'postData' until you receive the other data so the component wont be rendered too early
        // EDIT: I have added ? this.$route.query.projectData : {}
        const tempPostData = this.$route.query.projectData
            ? this.$route.query.projectData
            : {};

        console.log("xx: ", this.$route.query);

        SharedMethods.loadPage();

        this.mobile = this.isMobile();

        // we also check when the user resizes the window
        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
        });

        // query for the remaining post fields
        // EDIT: im using the route ID param instead of tempPostData.id cuz it wasn't working on desktop
        GraphQLService.fetchPostById(this.$route.params.postid, [
            "links",
            "tags"
        ]).then(res => {
            const response = res.data.getPostById;
            console.log("res >>", response);

            // add any newly requested post data to the postData object
            for (const [key, value] of Object.entries(response)) {
                tempPostData[key] = value;
            }

            this.postData = tempPostData;
        });
    },
    methods: {
        isMobile() {
            return ScreenType.isMobile(950);
        }
    },
    components: {
        PostMobile,
        PostDesktop
    }
};
</script>

<style scoped></style>

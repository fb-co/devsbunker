<template>
    <div class="main_post_container">
        <div v-if="postData">
            <PostMobile v-if="mobile" :projectData="postData" />
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import ScreenType from "../utils/screenType.js";
import GraphQLService from '../services/graphql.service';

import PostMobile from "../components/Post/PostMobile.vue";

export default {
    data() {
        return {
            mobile: false,
            postData: undefined,
        }
    },
    created() {
        // refrain from setting 'postData' until you receive the other data so the component wont be rendered too early
        const tempPostData = this.$route.query.projectData;

        SharedMethods.loadPage();

        this.mobile = this.isMobile();

        // we also check when the user resizes the window
        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
        });

        // query for the remaining post fields
        GraphQLService.fetchPostById(tempPostData.id, ["links", "tags"]).then((res) => {
            const response = res.data.getPostById;

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
        },
    },
    components: {
        PostMobile
    }
}
</script>

<style scoped>

</style>
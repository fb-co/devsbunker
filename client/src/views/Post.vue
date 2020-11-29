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

import PostMobile from "../components/Post/PostMobile.vue";

export default {
    data() {
        return {
            mobile: false,
            postData: undefined,
        }
    },
    created() {
        console.log(this.$route.query.projectData);
        this.postData = this.$route.query.projectData;

        SharedMethods.loadPage();

        this.mobile = this.isMobile();

        // we also check when the user resizes the window
        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
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
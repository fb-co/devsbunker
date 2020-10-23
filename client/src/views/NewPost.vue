<template>
    <div class="main_new_post_container">
        <NavBar />
        <NewPostMobile v-if="mobile" />
        <NewPostDesktop v-else />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "../utils/shared";
import ScreenType from "../utils/screenType.js";

import NewPostMobile from "@/components/NewPost/NewPostMobile.vue";
import NewPostDesktop from "@/components/NewPost/NewPostDesktop.vue";

export default {
    data() {
        return {
            mobile: false
        }
    },
    components: {
        NavBar,
        NewPostMobile,
        NewPostDesktop
    },
    created() {
        SharedMethods.loadPage();

        this.mobile = this.isMobile();

        // we also check when the user resizes the window
        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
        });
    },
    destroyed() {
        window.removeEventListener("resize", () => {
            this.mobile = this.isMobile();
        });
    },
    methods: {
        isMobile() {
            return ScreenType.isMobile(950);
        },
    },
}
</script>

<style scoped>

</style>
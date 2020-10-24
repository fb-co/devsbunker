<template>
    <div v-if="isOpen" class="main_new_post_container">
        <NewPostMobile v-if="mobile" />
        <NewPostDesktop v-else />
    </div>
</template>

<script>
import SharedMethods from "@/utils/shared";
import ScreenType from "@/utils/screenType.js";

import NewPostMobile from "@/components/NewPost/NewPostMobile.vue";
import NewPostDesktop from "@/components/NewPost/NewPostDesktop.vue";

export default {
    data() {
        return {
            mobile: false,
            isOpen: false
        }
    },
    components: {
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
        close() {
            this.isOpen = false;
        },
        open() {
            this.isOpen = true;
        }
    },
}
</script>

<style scoped>
    .main_new_post_container {
        position: absolute;
        top: calc(var(--header-height) + 10px);
        width: 100%;
        z-index: 3;
        background-color: var(--main-color);
    }
</style>
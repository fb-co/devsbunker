<template>
    <div class="profile">
        <NavBar />
        <ProfileMobile v-if="mobile" />
        <ProfileDesktop v-else />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from '../utils/shared';
import ProfileMobile from '../components/Profile/ProfileMobile.vue';
import ProfileDesktop from '../components/Profile/ProfileDesktop.vue';
import ScreenType from "../utils/screenType.js";

export default {
    data() {
        return {
            mobile: false
        }
    },
    created() {
        SharedMethods.loadPage();

        this.mobile = this.isMobile();

        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
        });
    },
    components: {
        NavBar,
        ProfileMobile,
        ProfileDesktop
    },
    methods: {
        isMobile() {
            return ScreenType.isMobile(450);
        }
    }
};
</script>

<style scoped>

</style>

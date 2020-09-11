<template>
    <div id='settings'>
        <NavBar />
        <SettingsMobile v-if="mobile" />
        <SettingsDesktop v-else />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SettingsDesktop from "@/components/Settings/SettingsDesktop";
import SettingsMobile from "@/components/Settings/SettingsMobile";
import ScreenType from "../utils/screenType.js";

import SharedMethods from "../utils/shared";

export default {
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
    data() {
        return {
            mobile: false,
        };
    },

    components: {
        NavBar,
        SettingsDesktop,
        SettingsMobile,
    },
    methods: {
        isMobile() {
            return ScreenType.isMobile(950);
        },
    },
};
</script>

<style scoped>
</style>
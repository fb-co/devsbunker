<template>
    <div id='settings'>
        <NavBar />
        <SettingsDesktop v-if="desktop" />
        <SettingsMobile v-else />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SettingsDesktop from "@/components/Settings/SettingsDesktop";
import SettingsMobile from "@/components/Settings/SettingsMobile";

import SharedMethods from "../utils/shared";

export default {
    created() {
        SharedMethods.loadPage();

        this.desktop = !this.isMobile();

        // we also check when the user resizes the window
        window.addEventListener("resize", () => {
            this.desktop = !this.isMobile();
        });
    },

    data() {
        return {
            desktop: true,
        };
    },

    components: {
        NavBar,
        SettingsDesktop,
        SettingsMobile,
    },
    methods: {
        isMobile() {
            if (screen.width <= 760) {
                return true;
            } else {
                return false;
            }
        },
    },
};
</script>

<style scoped>
</style>
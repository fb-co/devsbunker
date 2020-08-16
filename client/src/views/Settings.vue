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
import Settings from "../templates/Settings";

export default {
    created() {
        if (!this.checkValidSettingURL(Object.keys(Settings)))
            this.$router.push("/404");

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
            // screen.width in firefox returns a value based on the zoom and not the actual window
            // screen.width in chrome returns the first value it calculates

            // so heres a dynamic version
            const screenWidth = Math.max(
                document.documentElement.clientWidth || 0,
                window.innerWidth || 0
            );

            if (screenWidth <= 950) {
                return true;
            } else {
                return false;
            }
        },

        checkValidSettingURL(settingsList) {
            let settings = [];
            const section = this.$route.params.section;

            for (let setting of settingsList) {
                settings.push(setting.toLowerCase());
            }

            return !!settings.includes(section);
        },
    },
};
</script>

<style scoped>
</style>
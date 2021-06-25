<template>
    <div id="settings">
        <SettingsMobile v-if="$store.getters.mobile" />
        <SettingsDesktop v-else />
    </div>
</template>

<script>
import SettingsDesktop from "@/components/Settings/SettingsDesktop";
import SettingsMobile from "@/components/Settings/SettingsMobile";

import SharedMethods from "../utils/shared";

export default {
    created() {
        SharedMethods.loadPage();
    },

    components: {
        SettingsDesktop,
        SettingsMobile,
    },
};
</script>

<style scoped>
#settings {
    height: calc(100vh - var(--header-height) - var(--footer-height));
}
</style>
<template>
    <div id='section'>
        <div class='setting_labels'>
            <div class='setting_container'>
                <p class='setting_label'>Theme</p>
            </div>
        </div>
        <div class='settings_cont'>
            <div class='setting_container'>
                <ThemeSwitcher width="30" height="30" />
            </div>
        </div>
    </div>
</template>
<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";

export default {
    components: {
        ...GlobalComponents,
    },
};
</script>
<style scoped>
@import "../../stylesheets/settings.css"; /* Import the Settings Component Style-sheet */
</style>
<template>
    <div id='section'>
        <div class='setting_labels'>
            <div class='setting_container'>
                <p class='setting_label'>Theme</p>
            </div>
        </div>
        <div class='settings_cont'>
            <div class='setting_container'>
                <ThemeSwitcher width="25" height="25" />
            </div>
        </div>

    </div>
</template>

<script>
import ThemeSwitcher from "@/components/global/ThemeSwitcher";

export default {
    components: {
        ThemeSwitcher,
    },
};
</script>

<style scoped>
@import "../../stylesheets/mobile.settings.css"; /* Import the Settings Component Style-sheet */
</style>
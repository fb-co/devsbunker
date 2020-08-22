<template>
    <WrapperMobile>
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
    </WrapperMobile>
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
</style>
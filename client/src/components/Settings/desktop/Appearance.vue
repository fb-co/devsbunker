<template>
    <WrapperDesktop>
        <div id='section'>
            <div class='setting_labels'>

                <!-- applying the test class which is inside the Wrapper -->
                <div class='setting_container test'>
                    <p class='setting_label'>Theme</p>
                </div>
            </div>
            <div class='settings_cont'>
                <div class='setting_container'>
                    <ThemeSwitcher width="30" height="30" />
                </div>
            </div>
        </div>
    </WrapperDesktop>

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
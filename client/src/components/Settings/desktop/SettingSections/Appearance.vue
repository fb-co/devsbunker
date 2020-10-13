<template>
    <WrapperDesktop>
        <div class='setting_item'>
            <p class='setting_label'>Theme</p>
            <span class="setting_item_spacer" />
            <div class='setting_container'>
                <ThemeSwitcher width="30" height="30" />
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
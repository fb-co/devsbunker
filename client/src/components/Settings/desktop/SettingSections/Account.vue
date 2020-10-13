<template>
    <WrapperDesktop>
        <div class="setting_item">
            <p class='setting_label'>Account Visibility</p>
            <span class="setting_item_spacer" />
            <Dropdown class="setting_dropdown" label="Public" linkHeight="50px" height="50px" id='vis_dropdown'>
                <button>Public</button>
                <button>Private</button>
            </Dropdown>
        </div>
    </WrapperDesktop>
</template>
<script>
import Dropdown from "@/components/global/Dropdown.vue";
import WrapperDesktop from "@/components/global/WrapperDesktop.vue" 

export default {
    components: {
        Dropdown,
        WrapperDesktop
    }
};
</script>

<style scoped>

</style>
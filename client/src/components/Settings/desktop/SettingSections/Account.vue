<template>
    <WrapperDesktop>
        <div id='section'>
            <div class='setting_labels'>
                <div class='setting_container'>
                    <p class='setting_label'>Account Visibility</p>
                </div>
            </div>
            <div class='setting_cont'>
                <div class='setting_container'>
                    <Dropdown label="Public" spacing="50px" class="visibility_dropdown" id='vis_dropdown'>
                        <button>Public</button>
                        <button>Private</button>
                    </Dropdown>
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
    }
};
</script>

<style scoped>
.visibility_dropdown {
    width: 200px;
    height: 50px;
}
</style>
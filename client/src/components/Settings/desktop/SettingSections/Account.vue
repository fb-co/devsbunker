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
                    <Dropdown spacing="50px" label="Public" class="visibility_dropdown" id='vis_dropdown'>
                        <button @click="changeAccVisibility('Public')">Public</button>
                        <button @click="changeAccVisibility('Private')">Private</button>
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
    },
    methods: {
        changeAccVisibility(state) {
            document.getElementById('vis_dropdown').querySelector('p').innerText = state;
        }
    }
};
</script>

<style scoped>
.visibility_dropdown {
    width: 200px;
    height: 50px;
}
</style>
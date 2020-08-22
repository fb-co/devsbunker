<template>
    <div>
        <SettingListItem v-for="(item, index) in items" :key="index" :label="item">
            <div class="setting-content">
                <component :is="item"></component>
            </div>
        </SettingListItem>
    </div>
</template>

<script>
import SettingListItem from "./SettingListItem";
import SettingsComponents from "./SettingSections/mobile.import.settings";

export default {
    components: {
        SettingListItem,
        ...SettingsComponents,
    },

    data() {
        return {
            items: ["Account", "Appearance", "Privacy"],
        };
    },
};
</script>

<style scoped>
.setting-content {
    padding-left: 25px;
    height: 150px;
    width: 80%;
    margin: auto;
}
</style>
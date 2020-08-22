<template>
    <div>
        <!-- Account -->
        <SettingListItem label="Account">
            <div class="setting-content"></div>
        </SettingListItem>

        <!-- Appearance -->
        <SettingListItem label="Appearance">
            <div class="setting-content"></div>
        </SettingListItem>

        <!-- Privacy -->
        <SettingListItem label="Privacy">
            <div class="setting-content"></div>
        </SettingListItem>
    </div>
</template>

<script>
import SettingListItem from "./SettingListItem";

export default {
    components: {
        SettingListItem,
    },
};
</script>

<style scoped>
.setting-content {
    padding-left: 25px;
    height: 150px;
    width: 80%;
    margin: auto;
    background: red;
}
</style>
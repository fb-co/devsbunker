<template>
    <div class="settings_list_item no_select" @click="navigateTo()">
        <p class="setting-label">{{ label }}</p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["label"],
};
</script>

<style scoped>
.settings_list_item {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-bottom: 15px;
}

.setting-label {
    text-align: left;
    color: var(--main-font-color);
    font-size: 20px;
    font-weight: bold;

    padding-top: 20px;
    padding-left: 30px;
    padding-bottom: 20px;
}
</style>
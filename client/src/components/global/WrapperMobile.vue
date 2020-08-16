<template>
    <div class='no_select'>
        <slot></slot>
    </div>
</template>


<style scoped>
#section {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.setting_labels {
    display: flex;
    flex-direction: column;

    width: 50%;
}

.setting_label {
    margin: 0px;
    margin-left: 5px;
    text-align: left;
    font-weight: 500;
    font-size: 16px;
}

.settings_cont {
    width: 50%;
}

.setting_cont {
    margin: 0 auto;
}

.setting_container {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
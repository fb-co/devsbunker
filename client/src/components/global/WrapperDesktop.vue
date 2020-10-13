<!-- 
    This wrapper solves the issue we had with external styles sheets 
    It lets us register SCOPED styles that affect whatever we pass to 
    the wrapper as a slot. In this case the settings components such as Account, Privacy etc
-->
<template>
    <div class='main_wrapper no_select'>
        <slot></slot>
    </div>
</template>

<style scoped>
.main_wrapper {
    padding-top: 20px;
}

/* GLOBAL SETTINGS STYLES */

.setting_item {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.setting_label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
}
.setting_dropdown {
    width: 150px;
}
.setting_item_spacer {
    width: 15%;
    height: 10px;
}
</style>
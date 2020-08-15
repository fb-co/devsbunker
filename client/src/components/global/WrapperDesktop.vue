<!-- 
    This wrapper solves the issue we had with external styles sheets 
    It lets us register SCOPED styles that affect whatever we pass to 
    the wrapper as a slot. In this case the settings components such as Account, Privacy etc
-->
<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
/* GLOBAL SETTINGS STYLES */

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
    margin: 0 auto;
    font-weight: bold;
    font-size: 20px;
}

.settings_cont {
    width: 50%;
}

.setting_cont {
    margin: 0 auto;
}

.setting_container {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* this class can be used in the mobile version */
.test {
    background: red;
}
</style>
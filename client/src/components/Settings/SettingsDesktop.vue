<template>
    <!-- old good settings page (re-add when we have a lot more settings)
    <div class="pageContainer">
        <div class="pageSubcontainer">
            <div class="settings_list">
                <ul>
                    <li class="list_title">Settings</li> 
                    <SettingSearch />
                    
                    <SettingList />
                </ul>
            </div>
            <div class="settings_selection">
                <component :is="$route.name"></component>
            </div>

        </div>
    </div>
    -->
    <div class="simple_settings_container">
        <p>Settings</p>

        <div class="settings_box">
            <div class="setting_item">
                <p>Theme</p>
                <div class="placeholder" />
                <ThemeSwitcher class="theme_switcher" width="30px" />
            </div>
            <div class="setting_item">
                <InputModal
                    ref="resetPwd"
                    :fields="[{
                        label: 'New Password',
                        type: 'pwd'
                    }, {
                        label: 'Confirm New Password',
                        type: 'pwd'
                    }]"
                    title="Reset"
                    @submitted="resetPwd($event[0], $event[1])"
                /> 
            </div>
        </div>
    </div>
</template>

<script>
//import SettingSearch from "@/components/SettingSearch.vue";
//import GlobalComponents from "@/components/global/GlobalComponents.js";
//import SettingsComponents from "./desktop/SettingSections/desktop.import.settings.js"; /* Import the different components for the settings tabs */
//import SettingList from "./desktop/SettingList";
/*
export default {
     old good settings page
    components: {
        ...GlobalComponents,
        ...SettingsComponents,
        SettingList,
        SettingSearch
    },
};
*/

import ThemeSwitcher from "@/components/global/ThemeSwitcher.vue";
import InputModal from "@/components/global/InputModal.vue";

export default {
    components: {
        ThemeSwitcher,
        InputModal
    }
}
</script>

<style scoped>
.simple_settings_container {  
    width: 100%;
    height: calc(100vh - var(--header-height));
}
.simple_settings_container > p {
    font-weight: bold;
    font-size: 28px;
    padding-top: 30px;
    margin-bottom: 60px;
    color: var(--main-font-color);
}
.settings_box {
    display: flex;
    flex-direction: column;
    width: 50%;
    max-width: 700px;
    min-width: 500px;
    height: 200px;
    margin: 0 auto;
    border-radius: 6px;
    background-color: var(--secondary-color);
    box-shadow: 0px 0px 8px var(--drop-shadow);
}
.setting_item {
    display: flex;
    flex-direction: row;
    width: 25%;
    margin: 30px auto 0px auto;
}
.setting_item p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
}

.placeholder {
    flex-grow: 1;
}

/* Old good settings page
* {
    list-style: none;
}

.pageSubcontainer {
    padding-top: 20px;
    margin-right: auto;
    margin-left: auto;
    width: 80%;
    display: flex;
    flex-direction: row;
}
.list_title {
    padding: 15px;
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 15px;
}
.list_title:hover {
    cursor: default;
}
.settings_list {
    margin: 50px;
}
.settings_selection {
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    background: var(--settings-mobile-card);
    flex-grow: 1;
    min-width: 500px;
    margin: 50px;
    height: 500px;
    border-radius: 7px;
    max-width: 750px;
}

@media only screen and (max-width: 1100px) {
    .pageSubcontainer {
        width: 90%;
    }
}
@media only screen and (max-width: 1000px) {
    .pageSubcontainer {
        width: 100%;
    }
}
*/
</style>
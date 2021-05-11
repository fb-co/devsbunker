<template>
    <div class="pageContainer">
        <div class="pageSubcontainer">
            <div class="settings_list">
                <ul>
                    <li class="list_title">Settings</li>
                    
                    <SettingSearch />
                    <!--
                    <CustomInput>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                        <input type="text" name="search" id="setting_search" placeholder="Search a setting...">
                    </CustomInput>
                    -->

                    <!-- setting list on the left side -->
                    <SettingList />
                </ul>
            </div>

            <div class="settings_selection">
                <component :is="$route.name"></component>
            </div>

        </div>

    </div>
</template>

<script>
import SettingSearch from "@/components/SettingSearch.vue";
import GlobalComponents from "@/components/global/GlobalComponents.js";
import SettingsComponents from "./desktop/SettingSections/desktop.import.settings.js"; /* Import the different components for the settings tabs */
import SettingList from "./desktop/SettingList";

export default {
    components: {
        ...GlobalComponents,
        ...SettingsComponents,
        SettingList,
        SettingSearch
    },
};
</script>

<style scoped>
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

/* Media Queries */

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
</style>
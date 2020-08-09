<template>
    <div class="pageContainer">
        <div class="pageSubcontainer">
            <div class="settings_list">
                <ul>
                    <li class="list_title">Settings</li>
                    <input type="text" name="search" class="search-bar" placeholder="Search a setting...">
                    <li class="settings_list_item" v-for="(option, index) in Object.keys(settings)" :key="index">
                        <!-- todo: pull icons from a template like for the Settings -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user option-icon" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="12" cy="7" r="4" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                        {{ option }}

                        <p class="option-arrow">></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Settings from "../templates/Settings";

export default {
    data() {
        return {
            settings: Settings,
        };
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
    width: 1000px;
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
.settings_list_item {
    border-left: 2px solid transparent;
    box-sizing: border-box;
    width: 250px;
    padding: 15px;
    text-align: left;
}
.settings_list_item:hover {
    border-left: 2px solid var(--accent);
    cursor: pointer;
}

.search-bar {
    width: 100%;
    height: 27px;

    padding: 10px;

    background: var(--secondary-color);
    border: none;
    border-radius: 5px;

    margin-bottom: 25px;
}

.search-bar::placeholder {
    color: #bcbcbc;
}

.option-icon {
    margin-right: 15px;
}

.option-arrow {
    text-align: right;
    width: 10px;
    height: 20px;

    display: inline-block;
}
</style>
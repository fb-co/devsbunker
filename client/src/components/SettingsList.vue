<template>
    <div class="pageContainer">
        <div class="pageSubcontainer">
            <div class="settings_list">
                <ul>
                    <li class="list_title">Settings</li>
                    <input type="text" name="search" class="search-bar" placeholder="Search a setting...">
                    <li class="settings_list_item" v-for="(option, index) in Object.keys(settings)" :key="index">
                        <!-- todo: pull icons from a template like for the Settings -->
                        <div class="option_icon_container">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user option-icon" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                        </div>

                        <p class="option_text">{{ option }}</p>

                        <p class="option-arrow option_text">></p>
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
.settings_list_item {
    border-left: 2px solid transparent;
    width: 250px;
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    margin-bottom: 15px;
}
.settings_list_item:hover {
    border-left: 2px solid var(--accent);
    cursor: pointer;
    font-weight: bold;
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
.option_icon_container {
    padding-top: 10px;
    padding-bottom: 10px;
}
.option-icon {
    margin-top: 3px;
    margin-left: 15px;
    margin-right: 15px;    
}
.option_text {
    margin-top: 3px;
    display: inline-block;
    line-height: 47px;
}
.option-arrow {
    flex-grow: 1;
    text-align: right;
    display: inline-block;
}


/* Media Queries */

@media only screen and (max-width: 767px) {
    .pageSubcontainer{
        width: 100%;
    }
}
</style>
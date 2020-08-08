<template>
    <div id='settings'>
        <NavBar />
        <div class="pageContainer">
            <div class="pageSubcontainer">
                <div class="settings_list">
                    <ul>
                        <li class="list_title">Settings</li>
                        <li class="settings_list_item">General</li>
                        <li class="settings_list_item">Profile</li>
                        <li class="settings_list_item">Layout</li>
                        <li class="settings_list_item">Privacy</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "../utils/shared";

export default {
    created() {
        SharedMethods.loadPage();
    },
    components: {
        NavBar
    }
}
</script>

<style scoped>
    *{
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
        font-size: 20px;
    }
    .list_title:hover {
        cursor: default;
    }
    .settings_list {
        margin: 20px;
        background-color: var(--secondary-color);
    }
    .settings_list_item {
        border-left: 2px solid transparent;
        box-sizing: border-box;
        width: 250px;
        padding: 15px;
    }
    .settings_list_item:hover {
        border-left: 2px solid var(--accent);
        font-weight: bold;
        cursor: pointer;
    }
    
</style>
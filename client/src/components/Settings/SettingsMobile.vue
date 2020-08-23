<template>
    <div id="SettingsPage">
        <h1 class="title">Settings</h1>
        
        <CustomInput class="search_input">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
            <input type="text" name="search" placeholder="Search a setting...">
        </CustomInput>
        

        <div v-if="username" class="profile-banner">
            <img src="../../assets/profilePlaceholder.png" alt="profile_pic" class="profile-pic">
            <h2 style="text-align: left">{{ username }}</h2>
            <p class="user-mail">{{ email }}</p>
        </div>

        <div class="settings">
            <div class="margin-top"></div>
            <SettingList />
        </div>
    </div>
</template>

<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";
import MobileSettingsComponents from "@/components/Settings/mobile/SettingSections/mobile.import.settings";
import SettingList from "./mobile/SettingList";

import UserService from "@/services/user.service";

export default {
    components: {
        ...GlobalComponents,
        ...MobileSettingsComponents,
        SettingList,
    },
    data() {
        return {
            username: "",
            email: "TODO: provide also the email",
        };
    },

    created() {
        UserService.isLoggedIn().then((result) => {
            console.log(result);
            if (result.user) {
                this.username = result.user.username;
            }
        });
    },
};
</script>

<style scoped>

.search_input {
    width: 80%;
    margin: 0 auto;
    margin-top: 55px;
    margin-bottom: 55px;
    max-width: 450px;
}

.title {
    font-weight: bold;
    font-size: 24px;
    color: var(--main-font-color);

    margin-top: 30px;
}

.profile-banner {
    width: 80%;
    height: 55px;
    margin: auto;
    margin-top: 20px;
    max-width: 450px;
}

.profile-pic {
    width: 70px;
    float: left;
    margin-right: 20px;
}

.user-mail {
    color: #a7a7a7;
    text-align: left;
    margin-top: 5px;
}

.settings {
    width: 90%;
    max-width: 450px;
    height: 100%;

    margin: auto;
    margin-top: 40px;
    background: var(--settings-mobile-card);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

/* space at very top of the settings card */
.margin-top {
    width: 100%;
    height: 20px;
}

.setting-content {
    padding-left: 25px;
    height: 150px;
    margin: auto;
}
</style>
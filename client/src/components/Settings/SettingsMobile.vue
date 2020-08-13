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

        <div class="profile-banner">
            <img src="../../assets/profilePlaceholder.png" alt="profile_pic" class="profile-pic">
            <h2 style="text-align: left">Username</h2>
            <p class="user-mail">user@mail.com</p>
        </div>

        <div class="settings"></div>
    </div>
</template>

<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";
import SettingsComponents from "@/components/Settings/ImportSettings"; /* Import the different components for the settings tabs */

export default {
    components: {
        ...GlobalComponents,
        ...SettingsComponents
    },
};
</script>

<style scoped>
.title {
    font-weight: bold;
    font-size: 24px;
    color: var(--main-font-color);

    margin-top: 30px;
}
.search_input {
    width: 80%;
    margin: 0 auto;
    margin-top: 55px;
    margin-bottom: 55px;
}

.profile-banner {
    width: 80%;
    height: 55px;
    margin: auto;
    margin-top: 20px;
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
    height: 80vh;

    margin: auto;
    margin-top: 40px;
    background: var(--settings-mobile-card);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
</style>
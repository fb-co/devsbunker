<template>
    <div class="settings_page">
        <h1 class="title">Settings</h1>
        <!--
        <CustomInput class="search_input">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-search"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="var(--main-font-color)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
            <input type="text" name="search" placeholder="Search a setting..." />
        </CustomInput>
        -->

        <div v-if="username" class="profile-banner">
            <ProfilePicture :username="username" wrapperSize="75px" class="profile-pic" />
            <h2 class="username">{{ username }}</h2>
        </div>

        <div class="settings">
            <SettingList />
        </div>
    </div>
</template>

<script>
import SettingList from "./mobile/SettingList";
import ProfilePicture from "@/components/User/ProfilePicture.vue";

import UserService from "@/services/user.service";

export default {
    components: {
        SettingList,
        ProfilePicture,
    },
    data() {
        return {
            username: "",
        };
    },

    created() {
        UserService.isLoggedIn().then((result) => {
            if (result.user) {
                this.username = result.user.username;
            }
        });
    },
};
</script>

<style scoped>
.settings_page {
    height: calc(100vh - var(--header-height));
    overflow: auto;
}
.search_input {
    width: 80%;
    margin: 0 auto;
    margin-top: 55px;
    margin-bottom: 55px;
    max-width: 450px;
}

.title {
    font-weight: bold;
    font-size: 40px;
    color: var(--main-font-color);
    padding-top: 30px;
    margin-bottom: 80px;
}

.profile-banner {
    display: flex;
    flex-direction: row;
    width: 80%;
    margin: auto;
    margin-top: 20px;
    max-width: 450px;

    text-overflow: ellipsis;
}

.profile-pic {
    margin-right: 20px;
}
.username {
    text-align: left;
    margin-top: 10px;
    font-size: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.settings {
    width: 85%;
    max-width: 450px;
    margin: 30px auto 20px auto;
}
</style>

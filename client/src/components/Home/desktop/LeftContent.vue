<template>
    <div class="left_content">
        <p class="username_box">{{ $store.getters.username }}</p>

        <router-link to="/settings/account" class="tab_container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-settings"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="var(--main-font-color)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
                />
                <circle cx="12" cy="12" r="3" />
            </svg>
            <p>Settings</p>
        </router-link>
        <router-link v-if="$store.getters.isLoggedIn" :to="'user/' + $store.getters.username + '/saved'" class="tab_container">
            <svg
                width="30"
                height="20"
                stroke-width="1.2"
                stroke="var(--main-font-color)"
                viewBox="0 0 16 16"
                class="bi bi-bookmark"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                />
            </svg>
            <router-link :to="'user/' + $store.getters.username + '/saved'" class="saved_projects_link">Saved Projects</router-link>
        </router-link>
        <router-link v-if="$store.getters.isLoggedIn" :to="'user/' + $store.getters.username + '/projects'" class="tab_container">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="7 8 3 12 7 16" />
                <polyline points="17 8 21 12 17 16" />
                <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
            <router-link :to="'user/' + $store.getters.username + '/projects'" class="saved_projects_link">Saved Projects</router-link>
        </router-link>

        <button @click="makeNewPost()" class="new_button">
            <p>New</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-plus"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                stroke-width="0.7"
                stroke="var(--main-font-color)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </button>
        <p v-if="$store.getters.isLoggedIn" @click="logout()" class="logout_button">
            Logout
        </p>
    </div>
</template>

<script>
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            userRoute: "",
        };
    },
    methods: {
        logout() {
            GraphQLService.logoutUser().then((response) => {
                console.log("logged out: ", response);
            });
        },
        makeNewPost() {
            this.$parent.$parent.openPostMenu();
        },
    },
};
</script>

<style scoped>
.left_content {
    display: flex;
    flex-direction: column;
    width: 30%;
    min-width: 250px;
    max-width: 350px;
    background-color: red;
}
.username_box {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    text-align: left;
    padding: 25px 0px 25px 15%;
}
.tab_container {
    display: flex;
    flex-direction: row;
    padding-left: 15%;
    cursor: pointer;
    margin-bottom: 10px;
    text-decoration: none;
    font-weight: normal;
}
.tab_container > p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    color: var(--main-font-color);
}
.tab_container > p:hover {
    color: var(--soft-text);
}
.saved_projects_link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    color: var(--main-font-color);
    text-decoration: none;
}
.saved_projects_link:hover {
    color: var(--soft-text);
}

.search_bar {
    margin: 0px auto 30px auto;
}

.logout_button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
    height: 30px;
    margin-top: 20px;
    margin-left: 15%;
    color: var(--error-red);
    border-radius: 4px;
    border: 1px solid var(--error-red);
    cursor: pointer;
}
.filter_dropdown {
    width: 200px;
    margin: 0px auto 40px auto;
}
.filter_dropdown > div {
    width: 200px;
}
.new_button {
    display: flex;
    flex-direction: row;
    padding: 5px;
    width: 100px;
    border-radius: 4px;
    border: 1px solid var(--main-font-color);
    margin-left: 15%;
    margin-top: 30px;
    margin-bottom: 20px;
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;
}
.new_button > p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    color: var(--main-font-color);
    height: 100%;
    font-size: 15px;
}
.new_button > svg {
    margin: 0 auto;
}
</style>

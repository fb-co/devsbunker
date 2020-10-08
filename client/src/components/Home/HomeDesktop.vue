<template>
    <div class="main_container">
        <div class="left_content">
            <p class="username_box">{{ $store.getters.username }}</p>

            <router-link to='/settings/account' class="tab_container">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.2" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                <p>Settings</p>
            </router-link>
            <router-link v-if="$store.getters.isLoggedIn" :to="userRoute" class="tab_container">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.2" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                    <circle cx="12" cy="14" r="2" />
                    <polyline points="14 4 14 8 8 8 8 4" />
                </svg>
                <p>Saved Projects</p>
            </router-link>
            <router-link to='/new' class="new_button">
                <p>New</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="25" height="25" viewBox="0 0 24 24" stroke-width="0.7" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </router-link>
            <p v-if="$store.getters.isLoggedIn" @click="logout()" class="logout_button">Logout</p>
        </div>
        <div class="center_content">
            <div class="language_cycler_container">
                <div class="lan_cycler_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="5" y1="12" x2="9" y2="16" />
                        <line x1="5" y1="12" x2="9" y2="8" />
                    </svg>
                </div>
                <div class="lan_cycler_cont">
                    <p class="no_select">Javascript * Python * C/C++ * All</p>
                </div>
                <div class="lan_cycler_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="15" y1="16" x2="19" y2="12" />
                        <line x1="15" y1="8" x2="19" y2="12" />
                    </svg>
                </div>
            </div>
            <div class="scrollable_center">
                <p class="discover_label no_select">Discover Projects</p>
                <div class="filter_dropdown">
                    <Dropdown label="Newest" spacing="40px" space_between="15px">
                        <button>Newest</button>
                        <button>Most Popular</button>
                        <button>Alphabetical</button>
                    </Dropdown>
                </div>
                <div class="projects_area">
                    <DesktopProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="70%" class="project_card" />
                </div>
                <div class="projects_footer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus add_button" width="70" height="70" viewBox="0 0 24 24" stroke-width="0.4" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <line x1="9" y1="12" x2="15" y2="12" />
                        <line x1="12" y1="9" x2="12" y2="15" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="right_content">
            <SmallNotificationCard v-for="notification in notifications" :key="notification.label" :notificationData="notification" class="home_page_notification" />
        </div>
    </div>
</template>

<script>
import DesktopProjectCard from "@/components/DesktopProjectCard.vue";
import SmallNotificationCard from "@/components/SmallNotificationCard.vue";
import GraphQLService from "@/services/graphql.service";

import Dropdown from "@/components/global/Dropdown.vue";

export default {
    data() {
        return {
            username: "",
            userRoute: "",
            projects: [
                {
                    name: "The Hungry Wolf",
                    author: "The_Jak",
                    desc:
                        "Make sure you have at least a Geforce RTX 2080 Ti graphics card before launching this game.",
                    category: "Javascript",
                    price: 0,
                    likes: 420,
                },
                {
                    name: "Why Windowz is Stoopid",
                    author: "f0lg0",
                    desc:
                        "Make sure you read this entire post in a bizza accent",
                    category: "",
                    price: 0,
                    likes: 69,
                },
                {
                    name: "Website Design Templates",
                    author: "Phil",
                    desc:
                        "For less then a dollar you could have some professional website design templates",
                    category: "HTML/CSS",
                    price: 0.99,
                    likes: 792,
                },
                {
                    name: "Spotify Ad Blocker Python",
                    author: "John",
                    desc: "Will block all spotify ads with an ad blocker",
                    category: "Python",
                    price: 0,
                    likes: 1093,
                },
            ],
            notifications: [
                {
                    label: "Bill Gates",
                    subtext: "Liked your post!",
                },
                {
                    label: "Elon Musk",
                    subtext: "Liked your post!",
                },
                {
                    label: "Jeff Bezos",
                    subtext: "Commented on your post",
                },
                {
                    label: "Bill Gates",
                    subtext: "Liked your post!",
                },
                {
                    label: "Elon Musk",
                    subtext: "Liked your post!",
                },
                {
                    label: "Jeff Bezos",
                    subtext: "Commented on your post",
                },
                {
                    label: "Bill Gates",
                    subtext: "Liked your post!",
                },
                {
                    label: "Elon Musk",
                    subtext: "Liked your post!",
                },
                {
                    label: "Jeff Bezos",
                    subtext: "Commented on your post",
                },
                {
                    label: "Bill Gates",
                    subtext: "Liked your post!",
                },
                {
                    label: "Elon Musk",
                    subtext: "Liked your post!",
                },
                {
                    label: "Jeff Bezos",
                    subtext: "Commented on your post",
                },
            ],
        };
    },
    created() {
        //GraphQLService.fetchUserDetails("jakapoo", ["username", "email"]).then((data) => { this.username = data.data.user.email });

        // refresh the store
        this.$store.dispatch("setUsername");
    },
    methods: {
        logout() {
            GraphQLService.logoutUser().then((response) => {
                console.log("logged out: ", response);
            });
        },
    },
    components: {
        DesktopProjectCard,
        Dropdown,
        SmallNotificationCard,
    },
};
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    width: 100%;
}

/* LEFT CONTENT */
.left_content {
    display: flex;
    flex-direction: column;
    width: 30%;
    min-width: 250px;
    max-width: 350px;
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
}
.new_button > p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    color: var(--main-font-color);
}
.new_button > SVG {
    margin: 0 auto;
}

/* CENTER CONTENT */

.center_content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.scrollable_center {
    overflow-y: scroll;
    height: calc(100vh - var(--header-height) - 50px);
}
.language_cycler_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
}
.lan_cycler_arrow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: var(--carosel-height);
    height: 100%;
}
.lan_cycler_arrow > SVG {
    margin: 0 auto;
}
.lan_cycler_arrow > SVG:hover {
    stroke-width: 2.5;
}
.lan_cycler_cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
}
.lan_cycler_cont > p {
    font-size: 20px;
}
.projects_area {
    width: 100%;
    flex-grow: 1;
}
.project_card {
    margin: 0px auto 20px auto;
    max-width: 750px;
    min-width: 400px;
}
.add_button {
    margin-top: 5px;
}
.add_button:hover {
    stroke-width: 0.7;
    cursor: pointer;
}
.projects_footer {
    width: 100%;
}
/* SCROLL BAR */
.scrollable_center::-webkit-scrollbar {
    width: 4px;
}
.scrollable_center::-webkit-scrollbar-thumb {
    background: var(--soft-text);
    border-radius: 10px;
}

/* RIGHT CONTENT */

.right_content {
    max-width: 450px;
    width: 35%;
    height: calc(100vh - var(--header-height));
    overflow-y: scroll;
    padding-top: 15px;
}
.discover_label {
    font-size: 25px;
    margin-top: 50px;
    margin-bottom: 40px;
}
.home_page_notification {
    width: 80%;
    margin: 20px auto 20px auto;
}

/* SCROLL BAR */
.right_content::-webkit-scrollbar {
    width: 4px;
}

/* Handle */
.right_content::-webkit-scrollbar-thumb {
    background: var(--soft-text);
    border-radius: 10px;
}

/* RESIZING FUNCTIONALITY */

/* mobile styles */
@media only screen and (max-width: 1060px) {
    .home_page_notification {
        width: 100%;
    }
}
</style>
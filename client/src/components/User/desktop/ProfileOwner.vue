<template>
    <div class="profileDesktop">
        <div class="main_container">
            <div class="row1">
                <div class="profile_pic_container row_item">
                    <!--<img :src="require('@/assets/profile_pictures/' + this.userObject.profile_pic)" alt="profile_pic" class="profile-pic" >-->
                    <ProfilePicture v-if="userObject" :username="this.$store.getters.username" wrapperSize="150px" class="profile_pic" />

                    <!-- not all users will have the verified tag, this is temp -->
                    <p class="username">
                        {{ $store.getters.username }}
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-patch-check-fll" fill="#3C93D2" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                            />
                        </svg>
                    </p>

                    <div class="follow_container">
                        <div class="follow_cont">
                            <p class="follow_label">Followers</p>
                            <p id="follower_amt">{{ userObject.followers.length }}</p>
                        </div>
                        <div class="follow_cont">
                            <p class="follow_label">Following</p>
                            <p id="following_amt">{{ userObject.following.length }}</p>
                        </div>
                    </div>
                    <div class="edit_link_container">
                        <router-link to="/settings/account">Edit</router-link>
                    </div>
                </div>
                <div class="main_links_container row_item">
                    <div class="option-wrapper link_item" :class="{
                            active_link: $route.path.includes('information'),
                        }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-info-circle"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#656565"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="12" cy="12" r="9" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                            <polyline points="11 12 12 12 12 16 13 16" />
                        </svg>

                        <router-link :to="{ name: 'userInformation' }">General</router-link>
                    </div>

                    <div class="option-wrapper link_item" :class="{
                            active_link: $route.path.includes('projects'),
                        }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-code"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#656565"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="7 8 3 12 7 16" />
                            <polyline points="17 8 21 12 17 16" />
                            <line x1="14" y1="4" x2="10" y2="20" />
                        </svg>

                        <router-link :to="{ name: 'userProjects' }">Projects</router-link>
                    </div>

                    <div class="option-wrapper link_item" :class="{ active_link: $route.path.includes('saved') }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-bookmark"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#656565"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                        </svg>

                        <router-link :to="{ name: 'userSavedProjects' }">Saved Projects</router-link>
                    </div>

                    <div class="option-wrapper link_item" :class="{
                            active_link: $route.path.includes('purchases'),
                        }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-cash"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#656565"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="7" y="9" width="14" height="10" rx="2" />
                            <circle cx="14" cy="14" r="2" />
                            <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                        </svg>

                        <router-link :to="{ name: 'userPurchases' }">Purchases</router-link>
                    </div>
                </div>
                <div class="other_links_container row_item">
                    <div class="option-wrapper link_item" :class="{
                            active_link: $route.path.includes('revenue'),
                        }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-currency-dollar"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#656565"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                            <path d="M12 3v3m0 12v3" />
                        </svg>

                        <router-link :to="{ name: 'userRevenue' }">Revenue</router-link>
                    </div>

                    <div class="option-wrapper link_item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-download"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#656565"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                            <polyline points="7 11 12 16 17 11" />
                            <line x1="12" y1="4" x2="12" y2="16" />
                        </svg>

                        <p @click="downloadUserData()">Download Data</p>
                    </div>

                    <div class="option-wrapper special_link_item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-alert-circle"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#656565"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="12" cy="12" r="9" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>

                        <p class="profile_link" @click="logout()">Logout</p>
                    </div>
                </div>
            </div>
            <div class="content_box">
                <router-view :key="$route.path" :userData="userObject" :userProjects="mainUserProjects" :savedUserProjects="savedUserProjects" @updateFilter="updateFilter" />
                <!-- This renders the sub-routes component -->
            </div>
        </div>
    </div>
</template>

<script>
import GraphQLService from "@/services/graphql.service";
import ProfilePicture from "@/components/ProfilePicture.vue";

export default {
    data() {
        return {
            active: "projects",
            userObject: this.mainUserObject,
        };
    },
    components: {
        ProfilePicture,
    },
    props: {
        mainUserObject: Object,
        mainUserProjects: Object,
        savedUserProjects: Object,
    },
    methods: {
        logout() {
            GraphQLService.logoutUser().then((response) => {
                console.log("logged out: ", response);
            });
            this.$router.push("/");
        },
        loadNewPersonalPosts() {
            this.$parent.loadNewPersonalPosts();
        },
        loadNewSavedPosts() {
            this.$parent.loadNewSavedPosts();
        },
        updateFilter(value) {
            this.$emit("updateFilter", value);
        },
        downloadUserData() {
            GraphQLService.downloadUserData(this.$store.getters.accessToken)
                .then((res) => {
                    if (!res.errors) {
                        const data = res.data.downloadUserData;

                        // straight up robbed from stackoverflow
                        const dataStr =
                            "data:text/json;charset=utf-8," +
                            encodeURIComponent(JSON.stringify(data));

                        const downloadAnchorNode = document.createElement("a");
                        downloadAnchorNode.setAttribute("href", dataStr);
                        downloadAnchorNode.setAttribute(
                            "download",
                            this.$store.getters.username + ".json"
                        );
                        document.body.appendChild(downloadAnchorNode); // required for firefox
                        downloadAnchorNode.click();
                        downloadAnchorNode.remove();
                    } else {
                        throw new Error("Error while fetching data");
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        },
    },
};
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 90%;
    height: auto;
    margin: 100px auto 25px auto;
    min-width: 900px;
}
.row1 {
    display: flex;
    flex-direction: column;
    min-width: 300px;
}
.row_item {
    background-color: var(--general-card);
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
}
.row_item:first-child {
    margin-bottom: 15px;
}
.row_item:last-child {
    margin-top: 15px;
}
.main_links_container {
    padding-top: 15px;
    padding-bottom: 15px;
}
.other_links_container {
    padding-top: 15px;
    padding-bottom: 15px;
}

.option-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.link_item {
    width: 100%;
    padding-left: 10px;
    border-left: 3px solid transparent;
    cursor: pointer;
}
.link_item a,
.link_item p {
    display: inline-block;
    width: 100%;
    text-decoration: none;
    color: var(--profile-option-color);
    font-size: 15px;
    text-align: left;
    font-weight: 600;
    padding-top: 15px;
    padding-bottom: 15px;

    margin-left: 15px;
}

.link_item:hover {
    border-left: 3px solid var(--main-accent);
    background: var(--hover-effect);
}

.link_item:hover a,
.link_item:hover p {
    color: var(--main-font-color);
    font-weight: 600;
}

.link_item:hover svg {
    stroke: var(--main-accent);
}
.active_link {
    border-left: 3px solid var(--main-accent);
    background: var(--hover-effect);
}

.special_link_item {
    width: 100%;
    padding: 10px 0px 10px 10px;
    border-left: 3px solid transparent;
}

.special_link_item p {
    text-decoration: none;
    color: #db5454;
    font-size: 15px;
    text-align: left;
    font-weight: 600;

    margin-left: 15px;
    cursor: pointer;
}

.special_link_item svg {
    stroke: #db5454;
}

.profile_pic_container {
    padding: 40px 40px 10px 40px;
}
.profile_pic {
    width: 100px;
}
.profile_link {
    width: 100%;
}
.content_box {
    border-radius: 5px;
    flex-grow: 1;
    background-color: var(--main-color);
    margin: 0px 15px 0px 15px;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
}

.username {
    margin-top: 20px;
    font-weight: bold;
    font-size: 18px;
}

.follow_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 90%;
    padding-top: 30px;
    margin: 0 auto;
}
.follow_cont {
    margin: 0 auto;
}
.follow_label {
    font-weight: bold;
    margin-bottom: 10px;
}

.edit_link_container {
    padding-top: 25px;
    padding-bottom: 5px;
}
.edit_link_container a {
    display: inline-block;
    text-decoration: none;
    color: #fff;
    background-color: var(--main-accent);
    padding: 5px 20px 5px 20px;
    border-radius: 20px;
}
</style>
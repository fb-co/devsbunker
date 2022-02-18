<template>
    <div class="profileDesktop">
        <div class="main_container">
            <div class="row1_placeholder">
                <div class="row1">
                    <div class="profile_pic_container row_item">
                        <!--<img :src="require('@/assets/profile_pictures/' + this.rootUserObject.profile_pic)" alt="profile_pic" class="profile-pic" >-->
                        <ProfilePicture v-if="rootUserObject" :username="this.$store.getters.username" wrapperSize="15vh" class="profile_pic" />

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
                                <p id="follower_amt">
                                    {{ rootUserObject.followers.length }}
                                </p>
                            </div>
                            <div class="follow_cont">
                                <p class="follow_label">Following</p>
                                <p id="following_amt">
                                    {{ rootUserObject.following.length }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="main_links_container row_item">
                        <div
                            class="option-wrapper link_item"
                            :class="{
                                active_link: $route.path.includes('information'),
                            }"
                        >
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

                        <div
                            class="option-wrapper link_item"
                            :class="{
                                active_link: $route.path.includes('projects'),
                            }"
                        >
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

                            <router-link :to="{ name: 'userProjects' }">Your Projects</router-link>
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

                        <div
                            class="option-wrapper link_item"
                            :class="{
                                active_link: $route.path.includes('purchases'),
                            }"
                        >
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
                        <!--
                        <div
                            @click="$router.push({ name: 'userRevenue' })"
                            class="option-wrapper link_item"
                            :class="{
                                active_link: $route.path.includes('revenue'),
                            }"
                        >
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
                                <path
                                    d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"
                                />
                                <path d="M12 3v3m0 12v3" />
                            </svg>

                            <router-link :to="{ name: 'userRevenue' }"
                                >Revenue</router-link
                            >
                        </div>
                        -->

                        <div @click="openDownloadDataConfirmation()" class="option-wrapper link_item">
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

                            <p>Download Data</p>
                        </div>

                        <div @click="logout()" class="option-wrapper special_link_item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-logout"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#656565"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                <path d="M7 12h14l-3 -3m0 6l3 -3" />
                            </svg>
                            <p class="profile_link">Logout</p>
                        </div>
                        <div @click="openConfirmation(0)" class="option-wrapper special_link_item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-circle-off"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#656565"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M20.042 16.045a9 9 0 0 0 -12.087 -12.087m-2.318 1.677a9 9 0 1 0 12.725 12.73" />
                                <path d="M3 3l18 18" />
                            </svg>
                            <p class="profile_link">Disable account</p>
                        </div>
                        <div @click="openConfirmation(1)" class="option-wrapper special_link_item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-trash"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#656565"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="4" y1="7" x2="20" y2="7" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>

                            <p class="profile_link">Delete account</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_box">
                <router-view :key="$route.path" :userObject="rootUserObject" />
                <!-- This renders the sub-routes component -->
            </div>
        </div>

        <InputModal
            ref="deleteProfileConfirmation"
            :fields="[
                {
                    label: 'Confirm Password',
                    type: 'pwd',
                },
            ]"
            title="Delete Account"
            @submitted="deleteProfile($event)"
        />
        <ConfirmationPopup
            ref="download_data_confirmation"
            title="Download Data"
            msg="This will download all the data associated with your account into a JSON file."
            confirmButton="Download"
            @confirm="downloadUserData()"
        />
        <ConfirmationPopup
            ref="disable_account"
            title="Disable account"
            msg="This will temporarily disable your account, in order to enable it again you'd need to contact us at folgoni.co@gmail.com with the email address you provided while signing up."
            confirmButton="Disable"
            @confirm="disableAccount()"
        />
    </div>
</template>

<script>
import GraphQLService from "@/services/graphql.service";

import ProfilePicture from "@/components/User/ProfilePicture.vue";
import InputModal from "@/components/global/InputModal.vue";
import ConfirmationPopup from "@/components/Popups/ConfirmationPopup.vue";

import LogoutFunction from "@/mixins/logout_function.js";

export default {
    data() {
        return {
            active: "projects",
            rootUserObject: this.mainUserObject,
            accountDeleted: false,
        };
    },
    components: {
        ProfilePicture,
        InputModal,
        ConfirmationPopup,
    },
    mixins: [LogoutFunction],
    props: {
        mainUserObject: Object,
    },
    methods: {
        openDownloadDataConfirmation() {
            this.$refs.download_data_confirmation.open();
        },
        downloadUserData() {
            GraphQLService.downloadUserData(this.$store.getters.accessToken)
                .then((res) => {
                    if (!res.errors) {
                        const data = res.data.downloadUserData;

                        // straight up robbed from stackoverflow
                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));

                        const downloadAnchorNode = document.createElement("a");
                        downloadAnchorNode.setAttribute("href", dataStr);
                        downloadAnchorNode.setAttribute("download", this.$store.getters.username + ".json");
                        document.body.appendChild(downloadAnchorNode); // required for firefox
                        downloadAnchorNode.click();
                        downloadAnchorNode.remove();
                    } else {
                        throw new Error("Error while fetching data");
                    }
                })
                .catch((e) => {
                    console.error(e);
                    this.$store.dispatch("alertUser", { msg: "Something went wrong", type: "error", title: "Error" });
                });
        },
        async openConfirmation(action) {
            switch (action) {
                case 0:
                    // disable account
                    this.$refs.disable_account.open();
                    break;
                case 1: {
                    // delete account
                    const res = await GraphQLService.fetchPersonalDetails(this.$store.getters.accessToken, ["isGitHubUser"]);

                    if (res.errors) {
                        this.$store.dispatch("alertUser", { msg: "Something went wrong, try again later, try again later.", type: "error", title: "Error" });
                    } else {
                        if (res.data.getPersonalDetails.isGitHubUser) {
                            // TODO: make this pretty
                            this.deleteProfile([null]);
                        } else {
                            this.$refs.deleteProfileConfirmation.open();
                        }
                    }
                    break;
                }
            }
        },
        async deleteProfile(payload) {
            const password = payload[0];

            const res = await GraphQLService.deleteUserAccount(password, this.$store.getters.accessToken);
            console.log(res);
            if (!res.errors) {
                if (res.data.deleteAccount.success) {
                    if (res.data.deleteAccount.message === "Waiting for user interaction") {
                        // TODO: better popup
                        this.$store.dispatch("alertUser", {
                            msg: "Please confirm your identity by following the instructions sent to you via email.",
                            type: "success",
                            title: "Done",
                        });
                    } else {
                        this.accountDeleted = true;

                        this.$store.commit("refreshAccessToken", null);
                        this.$store.commit("changeLoggedInState", false);
                        this.$store.commit("changeUsername", null);

                        localStorage.removeItem("profile_pic_link");

                        this.$store.dispatch("alertUser", { msg: "Successfully deleted account. Redirecting...", type: "success", title: "Done" });
                        setTimeout(() => {
                            this.$router.push("/");
                        }, 2000);
                    }
                } else {
                    this.$store.dispatch("alertUser", { msg: res.data.deleteAccount.message, type: "error", title: "Error" });
                }
            } else {
                this.$store.dispatch("alertUser", { msg: res.errors[0].message, type: "error", title: "Error" });
            }
        },

        async disableAccount() {
            alert("todo");
        },
    },
};
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 90%;
    max-width: 1300px;
    height: calc(100vh - var(--header-height));
    padding-top: 2vh;
    padding-bottom: 0.5vh;
}
.content_box {
    border-radius: 5px;
    width: 75%;
    max-width: 1000px;
    height: 83vh;
    margin: 0 auto;
    background-color: var(--main-color);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
}
.row1_placeholder {
    position: relative;
    margin: 0 auto;
    min-width: 300px;
    max-width: 300px;
    height: 83vh;
}
.row1 {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 300px;
    max-width: 300px;
    height: 83vh;
    padding: 3px 10px 3px 10px;
    overflow-y: auto;
}
.row_item {
    background-color: var(--general-card);
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
}
.main_links_container {
    padding-top: 15px;
    padding-bottom: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
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
    height: 5vh;
    min-height: 35px;
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
    cursor: pointer;
    height: 5vh;
    min-height: 35px;
}

.special_link_item:hover {
    border-left: 3px solid var(--error-red);
    background: var(--hover-effect);
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

.username {
    overflow: hidden;
    text-overflow: ellipsis;
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
    padding-bottom: 20px;
    margin: 0 auto;
}
.follow_cont {
    margin: 0 auto;
}
.follow_label {
    font-weight: bold;
    margin-bottom: 10px;
}
</style>

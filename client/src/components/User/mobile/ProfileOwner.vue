<template>
    <div ref="scrollable_body" class="profileMobile">
        <div class="pfp_backdrop">
            <div class="actions">
                <div class="back-arrow action_item vertical_flex_center" @click="$router.go(-1)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-arrow-narrow-left"
                        width="38"
                        height="38"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#646464"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="5" y1="12" x2="9" y2="16" />
                        <line x1="5" y1="12" x2="9" y2="8" />
                    </svg>
                </div>

                <div></div>
                <div ref="more_options_icon" class="options action_item vertical_flex_center" @click="showMoreOptions()">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-dots-vertical"
                        width="38"
                        height="38"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#646464"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="19" r="1" />
                        <circle cx="12" cy="5" r="1" />
                    </svg>
                </div>
            </div>
            <ProfilePictureBackdrop :username="this.$store.getters.username" />
        </div>
        <div class="profile_card">
            <!--<ProfilePicture v-if="userObject" :username="userObject.username" wrapperSize="120px" class="profile_pic" />-->

            <div class="card_container">
                <p class="card_name">{{ $store.getters.username }}</p>
                <p class="card_desc">{{ userObject.desc }}</p>
                <form>
                    <!-- Not sure if this is nessacary, but I assume you need a form to get data to the server -->
                    <input type="submit" value="Edit" @click.prevent="$router.push('/settings/account')" />
                </form>
                <div class="follower_container">
                    <div class="follow_count">
                        <p class="follow_label">Followers</p>
                        <p class="follow_amt" id="followerAmt">{{ userObject.followers.length }}</p>
                    </div>
                    <div class="follow_count">
                        <p class="follow_label">Following</p>
                        <p class="follow_amt" id="followingAmt">{{ userObject.following.length }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="personal_btn_container">
            <div class="personal_btn" :class="{ active_section: activeSection == 'saved' ? true : false }">
                <p class="personal_btn_link" @click="navigateTo('saved')">Saved</p>
            </div>
            <div class="personal_btn" :class="{ active_section: activeSection == 'projects' ? true : false }">
                <p class="personal_btn_link" @click="navigateTo('projects')">Projects</p>
            </div>
            <div class="personal_btn" :class="{ active_section: activeSection == 'general' ? true : false }">
                <p class="personal_btn_link" @click="navigateTo('general')">General</p>
            </div>
        </div>

        <div class="dynamic_feed">
            <ProjectSection v-if="activeSection === 'projects'" />
            <SavedProjects v-if="activeSection === 'saved'" />
            <General v-if="activeSection === 'general'" :userObject="mainUserObject" />
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
        <MobileMoreOptions ref="more_options_menu">
            <div @mousedown.stop="openDownloadDataConfirmation()">
                <div class="vertical_flex_center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-download"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="var(--main-color)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                        <polyline points="7 11 12 16 17 11" />
                        <line x1="12" y1="4" x2="12" y2="16" />
                    </svg>
                </div>
                <p>Download Data</p>
            </div>
            <div @mousedown.stop="logout()">
                <div class="vertical_flex_center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-alert-triangle"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="var(--error-red)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 9v2m0 4v.01" />
                        <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                    </svg>
                </div>
                <p style="color: var(--error-red);">Logout</p>
            </div>
            <div @mousedown.stop="openConfirmation()">
                <div class="vertical_flex_center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-alert-triangle"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="var(--error-red)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 9v2m0 4v.01" />
                        <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                    </svg>
                </div>
                <p style="color: var(--error-red);">Delete Account</p>
            </div>
        </MobileMoreOptions>
    </div>
</template>

<script>
import ProfileSections from "./ProfileSections/mobile.profile.imports.js";
//import ProfilePicture from "@/components/User/ProfilePicture.vue";
import GraphQLService from "@/services/graphql.service";
import ProfilePictureBackdrop from "@/components/User/ProfilePictureBackdrop.vue";
import InputModal from "@/components/global/InputModal.vue";
import ConfirmationPopup from "@/components/Popups/ConfirmationPopup.vue";
import MobileMoreOptions from "@/components/Popups/MobileMoreOptions.vue";

import LogoutFunction from "@/mixins/logout_function.js";

export default {
    data() {
        return {
            activeSection: "projects",
            userObject: this.mainUserObject,
        };
    },
    props: {
        searchFilter: String,
        mainUserObject: Object,
    },
    mixins: [
        LogoutFunction
    ],
    components: {
        ...ProfileSections,
        //ProfilePicture,
        ProfilePictureBackdrop,
        InputModal,
        ConfirmationPopup,
        MobileMoreOptions,
    },
    mounted() {
        // this is so the blur event works on mobile
        document.body.addEventListener("touchend", () => {
            this.showMore = false;
        });
    },
    destroyed() {
        document.body.removeEventListener("touchend", () => {});
    },
    methods: {
        navigateTo(elem) {
            this.activeSection = elem;
        },
        openDownloadDataConfirmation() {
            this.$refs.download_data_confirmation.open();
        },
        downloadUserData() {
            GraphQLService.downloadUserData(this.$store.getters.accssToken)
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
                        this.$store.dispatch("alertUser", { msg: res.errors[0].message, type: "error", title: "Error" });
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
            this.showMore = false;
        },
        updateFilter(value) {
            this.$emit("updateFilter", value);
        },
        openConfirmation() {
            this.$refs.deleteProfileConfirmation.open();
        },
        showMoreOptions() {
            this.$refs.more_options_menu.openMenu();
        },
        async deleteProfile(payload) {
            const password = payload[0];

            if (password) {
                const res = await GraphQLService.deleteUserAccount(password, this.$store.getters.accessToken);
                if (!res.errors) {
                    if (res.data.deleteAccount.success) {
                        this.accountDeleted = true;

                        this.$store.commit("refreshAccessToken", null);
                        this.$store.commit("changeLoggedInState", false);
                        this.$store.commit("changeUsername", null);

                        localStorage.removeItem("profile_pic_link");

                        setTimeout(() => {
                            this.$router.push("/");
                        }, 2500);
                    } else {
                        this.$store.dispatch("alertUser", { msg: "Something went wrong", type: "error", title: "Error" });
                    }
                } else {
                    this.$store.dispatch("alertUser", { msg: "Incorrect password", type: "error", title: "Error" });
                }
            }
            this.showMore = false;
        },
    },
};
</script>

<style scoped>
.pfp_backdrop {
    position: relative;
}
.actions {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    cursor: pointer;
}
.actions svg {
    stroke: var(--main-font-color);
}
.action_item {
    padding: 5px;
    margin-top: 20px;
    background-color: var(--secondary-color);
}
.action_item:focus {
    outline: none;
}
.back-arrow {
    border-radius: 50%;
}
.options {
    position: relative;
    border-radius: 10px;
}

#more-options {
    position: absolute;
    right: 0px;
    top: 110%;
    z-index: 50;
    width: 200px;
    background: var(--main-color);
    border-radius: 5px;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
}
#more-options p {
    color: #db5454;
    font-weight: bold;
    cursor: pointer;
    padding-top: 15px;
    padding-bottom: 15px;
}
.profile_card {
    position: relative;
    top: -100px;
    width: 93%;
    max-width: 500px;
    min-width: 250px;
    height: auto;
    background-color: var(--general-card);
    box-shadow: 0px 0px 5px var(--drop-shadow);
    margin: 0 auto;
    margin-bottom: 50px;
    border-radius: 20px;
    z-index: 2;
}
.card_container {
    padding-bottom: 30px;
}
.card_name {
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 40px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 17px;
    font-weight: bold;
}
.card_desc {
    margin-top: 20px;
    padding: 20px;
    color: var(--soft-text);
    font-size: 13px;
}
.follower_container {
    display: flex;
    flex-direction: row;
    width: 90%;
    padding: 10px;
    margin: 0 auto;
}
.follow_count {
    display: flex;
    flex-direction: column;
    width: 50%;
}
.follow_label {
    color: var(--soft-text);
    margin-bottom: 7px;
}
.follow_amt {
    font-weight: bold;
}

.personal_btn_container {
    display: flex;
    flex-direction: row;
    width: 80%;
    max-width: 500px;
    min-width: 250px;
    margin-top: -100px;
    margin-left: auto;
    margin-right: auto;
    height: 50px;
}
.personal_btn_container div:first-child {
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    border-left: 1px solid var(--main-accent);
}
.personal_btn_container div:last-child {
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    border-right: 1px solid var(--main-accent);
}
.personal_btn {
    height: 100%;
    width: 50%;
    cursor: pointer;
    border-top: 1px solid var(--main-accent);
    border-bottom: 1px solid var(--main-accent);
}
.personal_btn:hover > p {
    color: var(--main-accent);
}
.personal_btn_link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    /*color: #fff;*/
    color: var(--main-font-color);
    height: 100%;
    width: 100%;
}
.active_section {
    background-color: var(--main-accent);
}
.active_section > p,
.active_section:hover > p {
    color: #fff;
}

.dynamic_feed {
    width: 100%;
    max-width: 500px;
    min-width: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 35px;
}

input[type="submit"] {
    width: 200px;
    font-size: 1rem;
    font-weight: 900;
    text-align: center;
    color: #fff;
    background-color: var(--main-accent);
    border-radius: 16px;
    padding: 0px 0px;
    cursor: pointer;
    height: 45px;
    border: none;
    margin-top: 20px;
    margin-bottom: 20px;
}
input[type="submit"]:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}
.active_section {
    background-color: var(--main-accent);
}
.active_section > p {
    color: #fff;
}
</style>

<template>
    <div class="profileMobile" @click="showMore = false">
        <div class="profile_card">
            <div class="space"></div>
            <div class="actions">
                <div class="back-arrow" @click="$router.go(-1)">
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
                <div class="options" @click.stop.prevent="showMore = !showMore">
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
                    <div v-if="showMore" id="more-options" @click="downloadUserData()">
                        <p>Download data</p>
                    </div>
                </div>
            </div>
            <div class="space"></div>

            <ProfilePicture v-if="userObject" :username="userObject.username" wrapperSize="120px" class="profile_pic" />

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
            <div class="personal_btn" :class="{ active_section: activeSection=='saved' ? true : false }">
                <p class="personal_btn_link" @click="navigateTo('saved')">Saved</p>
            </div>
            <div class="personal_btn" :class="{ active_section: activeSection=='projects' ? true : false }">
                <p class="personal_btn_link" @click="navigateTo('projects')">Projects</p>
            </div>
        </div>

        <div class="dynamic_feed">
            <ProjectSection v-if="activeSection === 'projects'" />
            <SavedProjects v-if="activeSection === 'saved'" />
        </div>
    </div>
</template>

<script>
import ProfileSections from "./ProfileSections/mobile.profile.imports.js";
import ProfilePicture from "@/components/ProfilePicture.vue";
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            activeSection: "projects",
            userObject: this.mainUserObject,
            showMore: false,
        };
    },
    props: {
        searchFilter: String,
        mainUserObject: Object,
    },
    components: {
        ...ProfileSections,
        ProfilePicture,
    },
    methods: {
        navigateTo(elem) {
            this.activeSection = elem;
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
        updateFilter(value) {
            this.$emit("updateFilter", value);
        },
    },
};
</script>

<style scoped>
.space {
    height: 25px;
}
.actions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    cursor: pointer;
}
.actions svg {
    margin-top: 30px;
    stroke: var(--main-font-color);
}

#more-options {
    position: absolute;
    width: 150px;
    height: 50px;
    background: var(--main-color);
    border-radius: 10px;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    right: 30px;
    margin-top: 15px;
    z-index: 3;
}
#more-options p {
    color: #db5454;
    font-weight: bold;
    cursor: pointer;
}
.profile_card {
    position: relative;
    width: 93%;
    max-width: 500px;
    min-width: 250px;
    height: auto;
    background-color: var(--general-card);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    margin-bottom: 50px;
    margin-top: 25px;
    border-radius: 20px;
    z-index: 2;
}
.card_container {
    padding-bottom: 30px;
}
.card_name {
    padding-top: 40px;
    font-size: 25px;
    font-weight: bold;
}
.card_desc {
    margin-top: 20px;
    padding: 20px;
    color: var(--soft-text);
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
    margin-left: auto;
    margin-right: auto;
    height: 50px;
}
.personal_btn_container div:first-child {
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
}
.personal_btn_container div:last-child {
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
}
.personal_btn {
    height: 100%;
    width: 50%;
    cursor: pointer;
    border: 1px solid var(--main-accent);
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
.active_section {
    background-color: var(--main-accent);
}
.active_section > p {
    color: #fff;
}
</style>
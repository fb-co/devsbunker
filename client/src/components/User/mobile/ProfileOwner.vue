<template>
    <div class="profileMobile">
        <div class="profile_banner"></div>
        <div class="profile_card">
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
            <div class="personal_btn" :class="{ active_section: activeSection=='analytics' ? true : false }">
                <p class="personal_btn_link" @click="navigateTo('saved')">Saved</p>
            </div>
            <div class="personal_btn" :class="{ active_section: activeSection=='projects' ? true : false }">
                <p class="personal_btn_link" @click="navigateTo('projects')">Projects</p>
            </div>
        </div>

        <div class="dynamic_feed">
            <ProjectSection v-if="activeSection==='projects' && userProjects.posts.length > 0" :projectsToRender="userProjects.posts" />
            <SavedProjects v-if="activeSection==='saved'" />
        </div>
    </div>
</template>

<script>
import ProfileSections from "./ProfileSections/mobile.profile.imports.js";
import ProfilePicture from "@/components/ProfilePicture.vue";

export default {
    data() {
        return {
            activeSection: "projects",
            userObject: this.mainUserObject,
            userProjects: this.mainUserProjects,
        };
    },
    async created() {
        console.log("parent", this.userProjects.posts);

        if (!this.userProjects.posts.length) {
            console.log("fetching again");
            // this may be the cause to the duplicate posts
            await this.$parent.loadNewPersonalPosts();
            console.log("parent", this.userProjects.posts);
        }
    },
    props: {
        mainUserObject: Object,
        mainUserProjects: Object,
    },
    components: {
        ...ProfileSections,
        ProfilePicture,
    },
    methods: {
        navigateTo(elem) {
            this.activeSection = elem;
        },
    },
};
</script>

<style scoped>
.space {
    height: 25px;
}
.profile_banner {
    position: relative;
    width: 100%;
    height: 300px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: transparent; /* Changed this to invisible for now because the red is giving me vision problems */
    z-index: 1;
}
.profile_card {
    position: relative;
    top: -200px; /* Change this to -100px when we put the banner back in */
    width: 90%;
    max-width: 500px;
    min-width: 250px;
    height: auto;
    background-color: var(--general-card);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
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
    margin-top: -100px;
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
.personal_btn:hover {
    background-color: var(--main-accent);
    height: 100%;
    width: 50%;
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
.active_section > p {
    color: #fff;
}
.dynamic_feed {
    width: 80%;
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
.personal_btn {
    height: 100%;
    width: 50%;
    cursor: pointer;
    border: 1px solid var(--main-accent);
}
.personal_btn:hover {
    background-color: var(--main-accent);
    height: 100%;
    width: 50%;
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
.active_section > p {
    color: #fff;
}
.dynamic_feed {
    width: 80%;
    max-width: 500px;
    min-width: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 35px;
}
</style>
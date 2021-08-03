<template>
    <div class="user_card_container" @click="routeToUser()">
        <div class="user_card_info">
            <p class="user_name">{{ authorData.username }}</p>
            <p class="user_desc">{{ authorData.desc }}</p>
            <div class="placeholder"></div>
            <div class="user_details">
                <div v-if="$store.getters.accessToken && authorData.username !== $store.getters.username" class="follow_btn_container">
                    <button v-if="!authorData.isFollowing" @click.stop="followUser(authorData.username)" class="follow_btn">Follow</button>
                    <button v-else @click.stop="unfollowUser(authorData.username)" class="follow_btn">Unfollow</button>
                </div>
                <p class="user_details_followers info">Followers: {{ authorData.followerAmt }}</p>
                <p class="user_details_posts info">Following: {{ authorData.followingAmt }}</p>
            </div>
        </div>
        <div style="flex-grow: 1;"></div>
        <div class="user_card_profile_pic">
            <ProfilePicture class="profile_pic" :username="authorData.username" wrapperSize="20vw" maxWrapper="250px" minWrapper="50px" />
        </div>
    </div>
</template>

<script>
import CardUtilities from "@/mixins/user_card.mixin.js";
import ProfilePicture from "./ProfilePicture.vue";

export default {
    props: {
        authorData: Object,
    },
    mixins: [CardUtilities],
    methods: {
        routeToUser() {
            this.$router.push("/user/" + this.authorData.username);
        },
    },
    components: {
        ProfilePicture,
    },
    created() {
        console.log(this.authorData);
    },
};
</script>

<style scoped>
.user_card_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    background-color: var(--secondary-color);
    border: 2px solid transparent;
    margin-bottom: 15px;
}
.user_card_container:hover {
    border: 2px solid grey;
}
.user_card_info {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 10px;
    max-width: 60%;
}
.user_card_profile_pic {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5px;
    padding-right: 5px;
}
.user_details {
    color: var(--soft-text);
    font-size: 12px;
    display: flex;
    flex-direction: row;
}
.user_details_followers {
    margin-right: 15px;
}

.placeholder {
    flex-grow: 1;
}

.user_name {
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    color: var(--main-font-color);
    margin-bottom: 10px;
}
.user_desc {
    color: var(--soft-text);
    margin-bottom: 20px;
}

.follow_btn {
    border: none;
    text-decoration: none;
    color: #fff;
    background-color: var(--main-accent);
    padding: 5px 20px 5px 20px;
    border-radius: 20px;
    cursor: pointer;
}
.follow_btn:focus {
    outline: none;
}
.follow_btn:hover {
    box-shadow: 0px 4px 40px var(--main-accent);
}
.follow_btn_container {
    margin-right: 20px;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* mobile styles */
@media only screen and (max-width: 620px) {
    .user_details_posts {
        display: none;
    }
}
/* mobile styles */
@media only screen and (max-width: 950px) {
    .user_name {
        font-size: 20px;
    }
    .info {
        font-size: 11px;
    }
}
</style>

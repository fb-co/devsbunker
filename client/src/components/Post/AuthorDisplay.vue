<template>
    <div @click="$router.push('/user/' + username)" class="card_container">
        <ProfilePicture :username="username" wrapperSize="70px" />
        <div class="text_container">
            <h2 class="username">{{ username +  (isYou ? " (You)" : "") }}</h2>
            <p v-if="showFollowerAmt" class="followerAmt">{{ followerAmt + (followerAmt == 1 ? " Follower" : " Followers") }}</p>
        </div>
        <div v-if="showFollowButton" class="follow_btn_container">
            <div style="flex-grow: 1;"></div>
            <!-- Placeholder -->
            <button v-if="!isYou" class="follow_btn" @click.stop="$emit('followAction')">{{ isFollowing ? "Unfollow" : "Follow" }}</button>
            <button v-else class="follow_btn" @click.stop="$router.push('/user/' + username)">Edit</button>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/User/ProfilePicture.vue";

export default {
    data() {
        return {
            isYou: false,
        }
    },
    created() {
        if (this.$store.getters.username === this.username) {
            this.isYou = true;
        }
    },
    props: {
        username: String,
        isFollowing: {
            type: Boolean,
            default: false,
        },
        followerAmt: {
            type: Number,
            default: 0,
        },
        showFollowButton: {
            type: Boolean,
            default: true,
        },
        showFollowerAmt: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        ProfilePicture,
    },
};
</script>

<style scoped>
.card_container {
    max-width: 700px;
    background-color: var(--secondary-color);
    padding: 20px;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px var(--drop-shadow);
    border: 1px solid transparent;
    display: flex;
    flex-direction: row;
}
.card_container:hover {
    border: 1px solid var(--accent);
    cursor: pointer;
}
.text_container {
    flex-grow: 1;
    width: 55%;
    margin-left: 15px;
    padding-top: 7px;
}
.username {
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--main-font-color);
    font-size: 20px;
    padding-right: 20px;
}
.followerAmt {
    color: var(--soft-text);
    margin-top: 10px;
}
.follow_btn_container {
    display: flex;
    flex-direction: column;
    justify-content: bottom;
    margin-left: 10px;
}
.follow_btn {
    background-color: var(--main-accent);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 125px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin: 0px auto 0px auto;
    cursor: pointer;
}
.follow_btn:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}
</style>

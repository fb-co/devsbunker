<template>
    <div class="user_card_container" @click="routeToUser()">
        <div class="user_card_info">
            <p class="user_name">{{ cardData.username }}</p>
            <p class="user_desc">{{ cardData.description }}</p>
            <div class="placeholder"></div>
            <div class="user_details">
                <button v-if="!alreadyFollowed" @click.stop="followUser()" class="follow_btn">Follow</button>
                <button v-else @click.stop="unfollowUser()" class="follow_btn">Unfollow</button>
                <p class="user_details_followers info">Followers: {{ cardData.followerAmt }}</p>
                <p class="user_details_posts info">Following: {{ cardData.followingAmt }}</p>
            </div>
            
        </div>
        <div class="user_card_profile_pic">
            <img src="@/assets/profilePlaceholder.png">
        </div>  
    </div>    
</template>

<script>
export default {
    data() {
        return {
            alreadyFollowed: false
        }
    },
    props: {
        cardData: Object,
    },
    created() {
        console.log(this.cardData);
    },
    methods: {
        routeToUser() {
            this.$router.push('/user/' + this.cardData.username);
        },
        followUser() {
            console.log("follow the user");
        },
        unfollowUser() {
            console.log("Unfollow the user");
        }
    }
}
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
        margin-bottom: 30px;
    }
    .user_card_container:hover {
        border: 2px solid grey;
    }
    .user_card_info {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: 10px;
        width: 60%;
    }
    .user_card_profile_pic {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 40%;
    }
    .user_card_profile_pic > img {
        width: 100%;
    }
    .user_details {
        color: var(--soft-text);
        font-size: 12px;
        display: flex;
        flex-direction: row;
    }
    .user_details_followers {
        margin-right: 20px;
        margin-left: 20px;
    }

    .placeholder {
        flex-grow: 1;
    }

    .user_name {
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
        background-color: var(--main-btn-color);
        padding: 5px 20px 5px 20px;
        border-radius: 20px;
        cursor: pointer;
    }
    .follow_btn:focus {
        outline: none;
    }
    .follow_btn:hover {
        box-shadow: 0px 4px 40px var(--main-btn-color);
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
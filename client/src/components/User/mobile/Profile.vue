<template>
    <div id="otherUserMobile">
        <div class="profileMobile">
            <div class="profile_card">
                <div class="space"></div>
                <ProfilePicture v-if="userObject" :username="userObject.username" wrapperSize="120px" class="profile_pic" />
                <div class="card_container">
                    <p class="card_name">{{ userObject.username }}</p>
                    <p class="card_desc">{{ userObject.desc }}</p>
                    
                    <!-- Not sure if this is nessacary, but I assume you need a form to get data to the server -->
                    <button v-if="userObject.isFollowing" type="submit" @click.prevent="unfollow()" class="follow_button">Unfollow</button>
                    <button v-else type="submit" @click.prevent="follow()" class="follow_button">Follow</button>

                    <div class="follower_container">
                        <div class="follow_count">
                            <p class="follow_label">Followers</p>
                            <p class="follow_amt" id="followerAmt">{{ userObject.followerAmt }}</p>
                        </div>
                        <div class="follow_count">
                            <p class="follow_label">Following</p>
                            <p class="follow_amt" id="followingAmt">{{ userObject.followingAmt }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="projects_tab">
                <div class="projects_tab_item">
                    <p id="projects_title">PROJECTS</p>
                </div>
                <div class="projects_tab_item" style="text-align: right;">
                    <router-link to="/" id="view_all_link">VIEW ALL</router-link>
                </div>
            </div>
            <div class="projects_area">
                <PostFeed :rootComponent="$parent" :desktop="false" />
            </div>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/ProfilePicture.vue";
import PostFeed from "@/components/PostFeed.vue";
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            userObject: this.mainUserObject,
        };
    },
    components: {
        ProfilePicture,
        PostFeed
    },
    props: {
        mainUserObject: Object,
    },
    methods: {
        navigateTo(elem) {
            this.activeSection = elem;
        },
        follow() {
            GraphQLService.followPerson(
                this.$store.getters.accessToken,
                this.userObject.username
            ).then((newFollowers) => {
                if (newFollowers.data.followPerson) {
                    this.userObject.followerAmt = newFollowers.data.followPerson.followerAmt;
                    this.userObject.isFollowing = newFollowers.data.followPerson.isFollowing;
                }
            });
        },
        unfollow() {
            GraphQLService.unfollowPerson(
                this.$store.getters.accessToken,
                this.userObject.username
            ).then((newFollowers) => {
                if (newFollowers.data.unfollowPerson) {
                    this.userObject.followerAmt = newFollowers.data.unfollowPerson.followerAmt;
                    this.userObject.isFollowing = newFollowers.data.unfollowPerson.isFollowing;
                }
            });
        }
    },
};
</script>

<style scoped>
.space {
    height: 25px;
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
    border-radius: 20px;
    z-index: 2;
    margin-bottom: 100px;
    margin-top: 25px;
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

.projects_tab {
    width: 80%;
    max-width: 500px;
    min-width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: -60px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
}
.projects_tab_item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 50%;
}
#projects_title {
    margin-top: 5px;
    font-weight: bold;
    font-size: 20px;
}
#view_all_link {
    display: inline-block;
    width: 100%;
    text-decoration: none;
    background-color: var(--main-accent);
    color: #fff;
    border-radius: 30px;
    width: 70px;
    padding: 10px;
    font-size: 11px;
}

.follow_button {
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

.projects_area {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    margin: auto;
    margin-top: 50px;
}
</style>
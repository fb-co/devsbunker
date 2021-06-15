<template>
    <div>
        <div class="main_container" v-if="userObject">
            <div class="row1_placeholder">
                <div class="row1">
                    <div class="profile_pic_container row_item">
                        <ProfilePicture :username="userObject.username" style="margin: 0 auto;" />

                        <!-- not all users will have the verified tag, this is temp -->
                        <p class="username">
                            {{ userObject.username }}
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-patch-check-fll" fill="#3C93D2" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                                />
                            </svg>
                        </p>

                        <p class="desc_container">{{ userObject.description }}</p>

                        <div class="follow_container">
                            <div class="follow_cont">
                                <p class="follow_label">Followers</p>
                                <p id="follower_amt">{{ userObject.followerAmt }}</p>
                            </div>
                            <div class="follow_cont">
                                <p class="follow_label">Following</p>
                                <p id="following_amt">{{ userObject.followingAmt }}</p>
                            </div>
                        </div>
                        <button v-if="!userObject.isFollowing" @click="followUser()" class="follow_button">Follow</button>
                        <button v-else @click="unfollowUser()" class="follow_button">Unfollow</button>
                    </div>
                    <div class="main_links_container row_item">
                        <!-- Still have to get the subrouting working here -->
                        <div class="option-wrapper link_item" :class="{ active_link: $route.path.includes('information') }">
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

                            <router-link :to="{ name: 'userInformation' }">General</router-link>
                        </div>
                        <div class="option-wrapper link_item" :class="{ active_link: $route.path.includes('projects') }">
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
                    </div>
                </div>
            </div>
            <div class="content_box">
                <router-view :key="path" :userData="userObject" />
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
            userObject: this.mainUserObject,
            path: "",
        };
    },
    props: {
        mainUserObject: Object,
    },
    components: {
        ProfilePicture,
    },
    created() {
        ["information", "projects"].includes(this.$route.path.split("/")[3]) ? (this.path = this.$route.path) : this.$router.push("/404");
    },
    methods: {
        followUser() {
            GraphQLService.followPerson(this.$store.getters.accessToken, this.userObject.username).then((newFollowers) => {
                if (newFollowers.data.followPerson) {
                    this.userObject.followerAmt = newFollowers.data.followPerson.followerAmt;
                    this.userObject.isFollowing = newFollowers.data.followPerson.isFollowing;
                }
            });
        },
        unfollowUser() {
            GraphQLService.unfollowPerson(this.$store.getters.accessToken, this.userObject.username).then((newFollowers) => {
                if (newFollowers.data.unfollowPerson) {
                    this.userObject.followerAmt = newFollowers.data.unfollowPerson.followerAmt;
                    this.userObject.isFollowing = newFollowers.data.unfollowPerson.isFollowing;
                }
            });
        },
        loadNewPersonalPosts() {
            this.$parent.loadNewPersonalPosts();
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

.option-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.desc_container {
    width: 90%;
}

.follow_button {
    background-color: var(--main-accent);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 125px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin: 20px auto 10px auto;
    cursor: pointer;
}
.follow_button:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}

.link_item {
    width: 100%;
    padding-left: 10px;
    border-left: 3px solid transparent;
    height: 5vh;
    min-height: 35px;
}
.link_item a {
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

.link_item:hover a {
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

.profile_pic_container {
    padding: 40px 40px 10px 40px;
}
.profile_pic {
    width: 50px;
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
    margin: 0px auto 20px auto;
}
.follow_cont {
    margin: 0 auto;
}
.follow_label {
    font-weight: bold;
    margin-bottom: 10px;
}
</style>

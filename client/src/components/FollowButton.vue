<template>
    <button @click="interact()" class="follow_btn">{{ state ? "Unfollow" : "follow" }}</button>
</template>

<script>
import GraphQLUserService from "@services/graphql/gql.user.service.js";

export default {
    data() {
        return {
            state: this.initialState || this.getData(),
        };
    },
    props: {
        username: String, // the username of the person that you want this button to follow or unfollow
        initialState: Boolean, // false state equates to the button showing you are not following the user
    },
    methods: {
        getData() {
            GraphQLUserService.fetchUserDetails(this.username, ["isFollowing"], this.$store.getters.username).then((res) => {
                this.initialState = res.data.user.isFollowing;
            });
        },
        interact() {
            if (this.state) {
                GraphQLUserService.unfollowPerson(this.$store.getters.accessToken, this.username).then((res) => {
                    this.state = res.data.unfollowPerson.isFollowing;
                });
            } else {
                GraphQLUserService.followPerson(this.$store.getters.accessToken, this.username).then((res) => {
                    this.state = res.data.followPerson.isFollowing;
                });
            }
        },
    },
};
</script>

<style scoped>
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

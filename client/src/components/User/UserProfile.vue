<template>
    <div>
        <ProfileDesktop v-if="userObject" :userData="userObject" />
    </div> 
</template>

<script>
import GraphQLService from "@/services/graphql.service";
import ProfileDesktop from "./desktop/Profile.vue";

export default {
    data() {
        return {
            username: "",
            userObject: undefined,
        };
    },
    components: {
        ProfileDesktop
    },
    async created() {
        this.username = this.$route.params.username;

        GraphQLService.fetchUserDetails(
            this.username,
            ["tag", "desc", "followerAmt", "followingAmt", "isFollowing"],
            this.$store.getters.username
        ).then((res) => {
            if (res.data.user === null) {
                this.$router.push("/"); // eventully this should route the user to a search area for users with a message sayin he user they requested does not exist
            } else {
                this.userObject = res.data.user;
                this.userObject.username = this.username; // add the username to the object so the child component has it
            }
        });
    },
};
</script>

<style scoped>

</style>


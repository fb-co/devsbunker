<template>
    <div class="profile">
        <NavBar />

        <!-- We pass in the user object so we dont have to re-query it from the server on every child component -->
        <!-- You also need to wait to wait to render the components until you get a response from the server or else they wont lazy load! -->
        <ProfileMobile v-if="mobile && userObject && userProjects" :mainUserObject="userObject" :mainUserProjects="userProjects" />
        <ProfileDesktop v-if="!mobile && userObject && userProjects" :mainUserObject="userObject" :mainUserProjects="userProjects" />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "@/utils/shared";
import ProfileMobile from "./mobile/ProfileOwner.vue";
import ProfileDesktop from "./desktop/ProfileOwner.vue";
import ScreenType from "@/utils/screenType.js";
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            mobile: false,
            userObject: undefined,
            userProjects: undefined,
        };
    },
    created() {
        SharedMethods.loadPage();

        this.mobile = this.isMobile();
        
        // get the user object, will be given to all children to avoid excessive calls to the server
        GraphQLService.fetchUserDetails(this.$store.getters.username, ["desc", "email", "profile_pic", "followers", "following", "liked_posts"]).then((user) => {
            this.userObject = user.data.user;
        });

        // if the user is logged out their token will be undefined anyway
        GraphQLService.fetchPostsByAuthor(this.$store.getters.username, this.$store.getters.accessToken).then((posts) => {
            this.userProjects = posts.data.getPostsByAuthor;
            console.log(this.userProjects);
        });

        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
        });
    },
    components: {
        NavBar,
        ProfileMobile,
        ProfileDesktop,
    },
    methods: {
        isMobile() {
            return ScreenType.isMobile(950);
        },
    },
};
</script>

<style scoped>
</style>
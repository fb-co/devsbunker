<template>
    <div class="profile">
        <NavBar />

        <!-- We pass in the user object so we dont have to re-query it from the server on every child component -->
        <!-- You also need to wait to wait to render the components until you get a response from the server or else they wont lazy load! -->
        <ProfileMobile v-if="mobile && userObject" :mainUserObject="userObject" />
        <ProfileDesktop v-if="!mobile && userObject" :mainUserObject="userObject" />
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
            userObject: undefined
        };
    },
    created() {
        SharedMethods.loadPage();

        this.mobile = this.isMobile();
        
        // get the user object, will be given to all children to avoid excessive calls to the server
        GraphQLService.fetchUserDetails(this.$store.getters.username, ["desc", "email", "profile_pic", "followers", "following"]).then((user) => {
            this.userObject = user.data.user;
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
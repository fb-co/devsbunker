<template>
    <div>
        <component :is="isLoggedInUser"></component>
    </div>
</template>

<script>
import UserProfile from "@/components/User/UserProfile.vue";
import MyUserProfile from "@/components/User/MyUserProfile.vue";
import Loading from "@/components/Loading.vue";

import UserService from "../services/user.service";
import SharedMethods from "../utils/shared";

export default {
    // mapping components to a value
    // Vue throws warnings if you map components to number (even '1')
    components: {
        c_0: Loading,
        c_1: UserProfile,
        c_2: MyUserProfile,
    },
    data() {
        return {
            isLoggedInUser: "c_0", // starts at loading state
        };
    },
    async created() {
        SharedMethods.loadPage();
        // The problem with this is that when you re-fresh from some route it takes you back to /projects, so im not sure if its a plausible fix
        //this.$router.push('/user/' + this.$route.params.username + '/projects'); // Route the user to the projects tab so something shows up in the profile card

        this.profileComponentGateway();
    },

    methods: {
        profileComponentGateway() {
            // we can't use $store.getters.username because if the user vists this URL by manually entering it into the search bar, the username is undefined

            UserService.isLoggedIn().then((result) => {
                if (result.user) {
                    const username = result.user.username;
                    if (username === this.$route.params.username) {
                        this.isLoggedInUser = "c_2"; // the user is visiting his account
                    } else {
                        this.isLoggedInUser = "c_1"; // the user is visiting someone else
                    }
                } else {
                    this.isLoggedInUser = "c_1"; // not logged in and visiting
                }
            });
        },
    },

    // this gets called when we push something to the route (we call the gateway only if we detect a username in the route params)
    // which means that it only gets triggered when we navigate to our profile from another users's profile (or vice versa if we use the back arrow)
    // using vue hot reload and not manual URL changes in the browser bar
    watch: {
        $route(to) {
            if (to.params.username) {
                this.profileComponentGateway();
            }
        },
    },
};
</script>

<style scoped></style>

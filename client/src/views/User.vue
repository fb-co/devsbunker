<template>
    <div>
        <component :is="isLoggedInUser"></component>
    </div>
</template>

<script>
import UserProfile from "@/components/User/UserProfile.vue";
import MyUserProfile from "@/components/User/MyUserProfile.vue";
import Loading from "@/components/Loading.vue";

import UserService from "@/services/user.service";

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

    created() {
        UserService.isLoggedIn().then((result) => {
            if (result.user) {
                const username = result.user.username;

                if (username === this.$route.params.username) {
                    this.isLoggedInUser = "c_2"; // the user is visiting his account
                } else {
                    this.isLoggedInUser = "c_1"; // the user is visiting someone else
                }
            } else {
                this.isLoggedInUser = "c_1"; // the user is not logged in so he/she is visiting someone
            }
        });
    },
};
</script>

<style scoped>
</style>
<template>
    <div>
        <NavBar />
        <p v-if="username">you are visiting <span style="color: red">{{ username }}</span> <br>but you are NOT <span style="color: red">{{ username }}</span> </p>
        <p v-else>This user doesn't exists</p>

        <p v-if="username"> <br> this is for you jak :* <br> {{ userObject }}</p>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "@/utils/shared";
import UserService from "@/services/user.service";

export default {
    data() {
        return {
            username: "",
            userObject: undefined,
        };
    },
    components: {
        NavBar,
    },
    created() {
        SharedMethods.loadPage();
        this.username = this.$route.params.username;

        UserService.getOtherUserData(this.username).then((response) => {
            if (!response.user) {
                this.username = null;
            } else {
                this.userObject = response.user;
            }
        });
    },
};
</script>

<style>
</style>
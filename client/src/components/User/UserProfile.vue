<template>
    <div>
        <NavBar />
        <p v-if="username">
            you are visiting <span style="color: red">{{ username }}</span>
            <br />but you are NOT <span style="color: red">{{ username }}</span>
        </p>
        <p v-else>This user doesn't exists</p>

        <p v-if="username">
            <br />
            this is for you jak :* <br />
            {{ userObject }}
        </p>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "@/utils/shared";
import GraphQLService from "@/services/graphql.service";

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
    async created() {
        SharedMethods.loadPage();
        this.username = this.$route.params.username;

        this.userObject = await GraphQLService.fetchUserDetails(this.username, [
            "username",
            "email",
            "tag",
        ]);
    },
};
</script>

<style></style>

<template>
    <div class="container">
        <p>Redirecting...</p>
    </div>
</template>

<script>
export default {
    async created() {
        // TODO: WHYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY STOOPIDDDDDDD AUTHHH
        // this shite doesnt work ive tried everything

        await this.$store.commit("refreshAccessToken", this.$route.query.token);
        await this.$store.commit("changeLoggedInState", true);
        await this.$store.commit("changeUsername", "Bob");

        console.log("Here we have it!", this.$store.getters.accessToken);
        await this.$store.dispatch("autoRefreshAccessToken");
        await this.$store.dispatch("setLoggedInState");

        setTimeout(() => {
            this.$router.push("/");
        }, 3000);
    },
};
</script>

<style scoped></style>

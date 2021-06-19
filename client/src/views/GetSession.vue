<template>
    <div class="container">
        <p>Redirecting...</p>
    </div>
</template>

<script>
export default {
    async created() {
        this.$store.commit("refreshAccessToken", this.$route.query.token);
        this.$store.dispatch("setLoggedInState");
        this.$store.dispatch("fetchPageLoadData");

        setTimeout(() => {
            this.$router.push("/");
        }, 2000);
    },
};
</script>

<style scoped>
.container p {
    margin-top: 20px;
}
</style>

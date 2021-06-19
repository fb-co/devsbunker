<template>
    <div class="container">
        <p>Redirecting...</p>
    </div>
</template>

<script>
export default {
    async created() {
        // ! OKAY THIS WORKS BUT FOR SOME REASON THE REFRESH TOKEN DOESNT WORK, IT DOESNT AUTOMATICALLY REFRESH THE ACCESS TOKEN
        // ! NVM ITS A GLOBAL ISSUE !!!!!!!
        // ! NVM AGAIN IT AFFECTS ONLY devsbunker.com
        this.$store.commit("refreshAccessToken", this.$route.query.token);
        this.$store.dispatch("setLoggedInState");

        await this.$store.dispatch("autoRefreshAccessToken");

        setTimeout(() => {
            this.$router.push("/");
        }, 3000);
    },
};
</script>

<style scoped></style>

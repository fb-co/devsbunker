<template>
    <div>
        <p>User verification page</p>
        <p>{{ $route.params }}</p>

        <div v-if="success">
            <h1>Verified!</h1>
        </div>
    </div>
</template>

<script>
import GraphQLService from "../services/graphql.service";
export default {
    data() {
        return {
            success: false,
        };
    },
    async created() {
        if (this.$route.params.userId && this.$route.params.token) {
            const res = await GraphQLService.verifyUser(this.$route.params.userId, this.$route.params.token);
            console.log(res);

            if (!res.errors) {
                if (res.data.verifyUser.success) {
                    this.success = true;
                } else {
                    this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: res.data.verifyUser.message });
                }
            } else {
                this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: res.errors[0].message });
            }
        } else {
            this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: "'userId' and 'token' params are missing." });
        }
    },
};
</script>

<style scoped></style>

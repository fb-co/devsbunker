<template>
    <div class="general_container">
        <p v-if="userObject" class="desc">{{ userObject.desc }}</p> <!-- Conditionally render it or else you get errors in console as it tries to return the value before the promise is resolved (it will work fine tho) -->
    </div>
</template>

<script>
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            userObject: undefined
        }
    },
    created() {
        GraphQLService.fetchUserDetails(this.$store.getters.username, ["desc"]).then((user) => { this.userObject = user.data.user; });
    }
}
</script>

<style scoped>
.general_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: inherit;
}
.desc {
    color: var(--soft-text);
    width: 300px;
    margin: 0 auto;
}
</style>
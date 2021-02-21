<template>
    <div class="pageContainer">
        <p>Vuex Logged In State: {{ $store.getters.isLoggedIn }}</p>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";

export default {
    created() {
        SharedMethods.loadPage();
    },
};
</script>

<style scoped>
</style>
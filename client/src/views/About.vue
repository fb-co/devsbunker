<template>
    <div class="pageContainer">
        <NavBar></NavBar>
        <p>Vuex Logged In State: {{ $store.getters.isLoggedIn }}</p>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import NavBar from "@/components/NavBar";

export default {
    created() {
        SharedMethods.loadPage();
    },
    components: {
        NavBar,
    }
};
</script>

<style scoped>
</style>
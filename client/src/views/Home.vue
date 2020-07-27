<template>
    <div class="home">
        <NavBar headerText="" />
        <button v-on:click="changeTheTheme()">Dark Theme</button>
        <button v-on:click="changeTheThemeLight()">Light Theme</button>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";

import SharedMethods from "../shared";

export default {
    created() {
        SharedMethods.loadPage();
    },
    components: {
        NavBar,
    },
    methods: {
        changeTheTheme() {
            SharedMethods.changeTheme("dark-theme");
        },
        changeTheThemeLight() {
            SharedMethods.changeTheme("light-theme");
        },
    },
};
</script>

<style scoped>
</style>
 
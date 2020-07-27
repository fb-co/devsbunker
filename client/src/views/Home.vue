<template>
    <div class="home">
        <div class="content_container">
            <div class="content_subContainer">
                <NavBar headerText="Home" />
                <button v-on:click="changeTheTheme()">Dark Theme</button>
                <button v-on:click="changeTheThemeLight()">Light Theme</button>
            </div>
        </div>

        <Footer class="mainFooter"></Footer>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import SharedMethods from "../shared";

export default {
    created() {
        SharedMethods.loadPage();
    },
    components: {
        NavBar,
        Footer,
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

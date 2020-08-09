<template>
    <div id='settings'>
        <NavBar />
        <SettingsList />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SettingsList from "@/components/SettingsList";
import SharedMethods from "../utils/shared";

export default {
    created() {
        SharedMethods.loadPage();
    },
    components: {
        NavBar,
        SettingsList,
    },
};
</script>

<style scoped>
</style>
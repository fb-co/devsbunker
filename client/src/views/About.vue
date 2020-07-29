<template>
    <div class="pageContainer">
        <NavBar></NavBar>
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
    },
};
</script>

<style scoped>
</style>
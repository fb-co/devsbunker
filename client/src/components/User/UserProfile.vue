<template>
    <div>
        <NavBar />
        <p>you are visiting <span style="color: red">{{ username }}</span> <br>but you are NOT <span style="color: red">{{ username }}</span> </p>
        <br><br>
        <p>Eventually we will have to check if <span style="color: red">{{ username }}</span> actually exists</p>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "@/utils/shared";

export default {
    data() {
        return {
            username: "",
        };
    },
    components: {
        NavBar
    },
    created() {
        SharedMethods.loadPage();

        // check if the username requested even exists
        

        this.username = this.$route.params.username;
    },
};
</script>

<style>
</style>
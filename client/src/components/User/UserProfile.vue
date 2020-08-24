<template>
    <div>
        <p>you are visiting <span style="color: red">{{ username }}</span> <br>but you are NOT <span style="color: red">{{ username }}</span> </p>
        <br><br>
        <p>Eventually we will have to check if <span style="color: red">{{ username }}</span> actually exists</p>
    </div>
</template>

<script>
// DUMMY JS
export default {
    data() {
        return {
            username: "",
        };
    },

    created() {
        this.username = this.$route.params.username;
    },
};
</script>

<style>
</style>
<template>
    <div class="main_post_container">
        <p id="test"></p>
    </div>
</template>

<script>
export default {
    props: {
        oldData: Object
    },
    mounted() {
        document.getElementById("test").innerText = "POST ID: " + this.$route.params.postid;
    }
}
</script>

<style scoped>
    .main_post_container {
        width: 100%;
        height: 200px;
        background-color: red;
    }
</style>
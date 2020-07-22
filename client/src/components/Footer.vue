<template>
    <div class = "footer_container">
        <div class = "content_placeholder">

        </div>
        <footer class = "footer_main"></footer>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .footer_container {
        position: absolute;
        top: 0px;
        width: 100%;
        min-height: 100vh;
    }
    .content_placeholder {
        padding-bottom: 100px;
    }
    .footer_main {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100px;
        background-color: red;
    }
    
</style>
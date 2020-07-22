<template>
    <div class="home">
        <div class = "content_container">
            <div class = "content_subContainer">
                <NavBar headerText="Home" />
            </div>
        </div>
        <Footer class = "mainFooter"></Footer>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";

import Footer from "@/components/Footer";

export default {
    components: {
        NavBar,
        Footer
    }
};
</script>

<style scoped>
</style>

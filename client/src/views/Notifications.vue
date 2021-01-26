<template>
    <div class='main_container'>
        <NavBar />
        <p>Notifications</p>
    </div>
</template>

<script>
// The notification target key, is what the notification is refering to, for example, the post title that was liked, or the username of the person being followed

import NavBar from "@/components/NavBar";

export default {
    components: {
        NavBar
    }
}
</script>

<style scoped>
    
</style>
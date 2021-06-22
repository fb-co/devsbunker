<template>
    <div class="alert_feed_container">
        <Alert v-for="(alert, index) in alerts" :key="index" :alertData="alert" />
    </div>
</template>

<script>
import Alert from "@/components/Popups/Alert";

export default {
    data() {
        return {
            alerts: this.$store.getters.getAlerts,
        }
    },
    components: {
        Alert
    },
}
</script>

<style scoped>
.alert_feed_container {
    position: fixed;
    z-index: 12;
    right: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    width: 450px;
    padding: 10px;
    overflow: hidden;
} 
.alert_feed_container > * {
    margin-top: 2px;
    margin-bottom: 2px;
}
</style>
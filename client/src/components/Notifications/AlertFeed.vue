<template>
    <div class="alert_feed_container" :class="{mobileFeed: this.$store.getters.mobile, desktopFeed: !this.$store.getters.mobile}">
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
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 450px;
    padding: 10px;
    overflow: hidden;
} 
.alert_feed_container > * {
    margin-top: 2px;
    margin-bottom: 2px;
}

.mobileFeed {
    top: 0px;
    left: 50%;
    max-height: 160px;
    transform: translateX(-50%);
}
.desktopFeed {
    right: 0px;
    bottom: var(--footer-height);
}
</style>
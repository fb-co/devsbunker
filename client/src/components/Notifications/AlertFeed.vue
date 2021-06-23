<template>
    <div
        ref="alert_feed" 
        class="alert_feed_container" 
        :class="{mobileFeed: this.$store.getters.mobile, desktopFeed: !this.$store.getters.mobile}"
    >
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
    watch: {
        alerts: function() {
            setTimeout(() => { this.$refs.alert_feed.scrollTop = this.$refs.alert_feed.scrollHeight; }, 20);
        }
    }
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
    bottom: calc(10px + var(--footer-height));
    max-height: 380px;
    overflow-y: scroll;
}
</style>
<template>
    <div class="main_container">
        <p class="notifications_header">Notifications</p>
        <div class="notification_card_container">
            <!-- Made the key account for many variables to avoid any duplicate key errors -->
            <LargeNotificationCard
                v-for="(notification, index) in notifications"
                :key="index"
                :data="notification"
                width="100%"
            />
        </div>
    </div>
</template>

<script>
// The notification target key, is what the notification is refering to, for example, the post title that was liked, or the username of the person being followed

import LargeNotificationCard from "@/components/Notifications/LargeNotificationCard.vue";
import GraphQLService from "@/services/graphql.service.js";
import SharedMethods from "@/utils/shared.js";

export default {
    data() {
        return {
            notifications: undefined,
        };
    },
    components: {
        LargeNotificationCard,
    },
    created() {
        SharedMethods.loadPage();

        GraphQLService.getAndReadNotifications(
            this.$store.getters.accessToken
        ).then((res) => {
            this.notifications = res.data.getAndReadNotifications;

            // make any like or follow notifications read
            this.notifications.forEach((item) => {
                if (item.type == "like" || item.type == "follow") {
                    item.read = true;
                }
            });
        });
    },
};
</script>

<style scoped>
.main_container {
    margin-bottom: 30px;
}
.notification_card_container {
    margin: 40px auto 0px auto;
    width: 90%;
    max-width: 650px;
}
.notifications_header {
    color: var(--main-font-color);
    font-size: 20px;
    font-weight: bold;
    margin: 30px auto 0px auto;
}
</style>
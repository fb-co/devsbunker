<template>
    <div class="main_container" :class="{ calculated_height: !$store.getters.mobile }">
        <p class="notifications_header">Notifications</p>
        <LoadingGif v-if="awaitingNotifications" :show="true" />
        <div v-else-if="notifications" class="notification_card_container">
            <div v-if="notifications.length > 0">
                <!-- Made the key account for many variables to avoid any duplicate key errors -->
                <LargeNotificationCard v-for="(notification, index) in notifications" :key="index" :data="notification" width="100%" />
            </div>
            <div v-else>
                <p style="padding-top: 30px">No notifications found</p>
            </div>
        </div>
    </div>
</template>

<script>
// The notification target key, is what the notification is refering to, for example, the post title that was liked, or the username of the person being followed

import LargeNotificationCard from "@/components/Notifications/LargeNotificationCard.vue";
import GraphQLNotificationsService from "@/services/graphql/gql.notifications.service.js";
import SharedMethods from "@/utils/shared.js";
import LoadingGif from "@/components/global/LoadingGif.vue";

export default {
    data() {
        return {
            notifications: undefined,
            awaitingNotifications: false,
        };
    },
    components: {
        LargeNotificationCard,
        LoadingGif,
    },
    created() {
        if (this.$store.getters.isLoggedIn) {
            SharedMethods.loadPage();

            GraphQLNotificationsService.getAndReadNotifications(this.$store.getters.accessToken).then((res) => {
                if (!res.errors) {
                    this.notifications = res.data.getAndReadNotifications;

                    // make any like or follow notifications read
                    this.notifications.forEach((item) => {
                        if (item.type == "like" || item.type == "follow") {
                            item.read = true;
                        }
                    });
                    this.$store.commit("readNotifications");
                } else {
                    this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: res.errors[0].message });
                }
            });
        } else {
            this.$store.dispatch("alertUser", { title: "Alert", type: "neutral", msg: "Login to see your notifications" });
            this.$router.push("/login");
        }
    },
};
</script>

<style scoped>
.main_container {
    padding-bottom: 30px;
    overflow: auto;
}
.notification_card_container {
    margin: 40px auto 0px auto;
    width: 90%;
    max-width: 650px;
}
.notifications_header {
    color: var(--main-font-color);
    font-size: 28px;
    font-weight: bold;
    margin: 0 auto;
    padding-top: 30px;
}
</style>

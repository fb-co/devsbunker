<template>
    <div class="main_container">
        <NavBar />
        <p class="notifications_header">Notifications</p>
        <div class="notification_card_container">
            <!-- Made the key account for many variables to avoid any duplicate key errors -->
            <LargeNotificationCard
                v-for="notification in notifications"
                :key="
                    notification.sender +
                    notification.target +
                    notification.message
                "
                :data="notification"
                width="100%"
            />
        </div>
        <BottomNavBar v-if="mobile" />
    </div>
</template>

<script>
// The notification target key, is what the notification is refering to, for example, the post title that was liked, or the username of the person being followed

import LargeNotificationCard from "@/components/Notifications/LargeNotificationCard.vue";
import NavBar from "@/components/NavBar";
import GraphQLService from "@/services/graphql.service.js";
import SharedMethods from "@/utils/shared.js";
import BottomNavBar from "@/components/BottomNavBar";
import ScreenType from "../utils/screenType.js";

export default {
    data() {
        return {
            notifications: undefined,
            mobile: false,
        };
    },
    components: {
        NavBar,
        LargeNotificationCard,
        BottomNavBar,
    },
    created() {
        SharedMethods.loadPage();
        this.mobile = this.isMobile();

        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
        });

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

    methods: {
        isMobile() {
            return ScreenType.isMobile(950);
        },
    },
};
</script>

<style scoped>
.notification_card_container {
    margin: 40px auto 0px auto;
    width: 50%;
    max-width: 650px;
    min-width: 300px;
}
.notifications_header {
    color: var(--main-font-color);
    font-size: 20px;
    font-weight: bold;
    margin: 30px auto 0px auto;
}
</style>
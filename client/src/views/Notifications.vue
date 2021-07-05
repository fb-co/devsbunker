<template>
    <div class="main_container" :class="{ calculated_height: !$store.getters.mobile }">
        <p class="notifications_header">Notifications</p>
        <div v-if="notifications" class="notification_card_container">
            <!-- Made the key account for many variables to avoid any duplicate key errors -->
            <LargeNotificationCard
                v-for="(notification, index) in notifications"
                :key="index"
                :data="notification"
                width="100%"
            />
        </div>
        <div v-else>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="margin:auto;background:none;display:block;"
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <g transform="rotate(0 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(30 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(60 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(90 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(120 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(150 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(180 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(210 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(240 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(270 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(300 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite" />
                    </rect>
                </g>
                <g transform="rotate(330 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
                    </rect>
                </g>
            </svg>
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
            this.$store.commit("readNotifications");
            console.log(this.$store.getters.unread_notifications);
        });
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
    font-size: 20px;
    font-weight: bold;
    margin: 0 auto;
    padding-top: 30px;
}
</style>
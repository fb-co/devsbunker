<template>
    <div v-if="notifications" class="right_content">
        <!-- The person who wrote this comment is so dumb (prolly a win user) -- Set the key to the sender and message because or else you get a bunch of duplicate key issues -- WHAT IF A USER LIKES 2 OF YOUR POSTS? SAME SHIT :D -->
        <!-- concatenated an index to the key, this way we dont have duplicate key errors -->
        <SmallNotificationCard
            v-for="(notification, index) in notifications"
            :key="notification.sender + notification.message + index"
            :notificationData="notification"
            class="home_page_notification"
        />
        <p class="no_notification_label" v-if="notifications.length == 0">No new notifications</p>
    </div>
    <div v-else class="right_cont_placeholder">
    </div>
</template>

<script>
import SmallNotificationCard from "@/components/SmallNotificationCard.vue";

export default {
    props: {
        notifications: Array,
    },
    components: {
        SmallNotificationCard,
    },
};
</script>

<style scoped>
/* RIGHT CONTENT */
.right_cont_placeholder {
    width: 35%;
    max-width: 250px;;
}

.right_content {
    max-width: 250px;
    width: 35%;
    height: calc(100vh - var(--header-height));
    overflow-y: scroll;
    padding-top: 15px;
}
.discover_label {
    font-size: 25px;
    margin-top: 50px;
    margin-bottom: 40px;
}
.home_page_notification {
    width: 80%;
    margin: 20px auto 20px auto;
}

/*Scrollbar stuff*/
.right_content::-webkit-scrollbar {
    width: 4px;
}
.right_content::-webkit-scrollbar-thumb {
    background: var(--soft-text);
    border-radius: 10px;
}

.no_notification_label {
    padding-top: 20px;
}

/* RESIZING FUNCTIONALITY */

/* mobile styles */
@media only screen and (max-width: 1060px) {
    .home_page_notification {
        width: 100%;
    }
}

/* Other Styles */
@media only screen and (min-width: 1500px) {
    .right_content {
        margin-right: 100px;
    }
}
</style>

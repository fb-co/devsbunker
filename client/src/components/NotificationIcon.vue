<template>
    <div class="notification_icon_container">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-bell bell_icon"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="var(--main-font-color)"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
        <p v-if="unread_notifications!=0" class="unread_icon">{{ unread_notifications }}</p>
    </div>
</template>

<script>
import GraphQLService from "../services/graphql.service.js";

export default {
    data() {
        return {
            unread_notifications: this.unread_prop || 0
        }
    },
    props: {
        unread_prop: Number
    },
    created() {
        if (this.unread_prop == undefined) {
            this.getUnreadNotifications();
        }
    },
    methods: {
        getUnreadNotifications() {
            GraphQLService.getUnreadNotifications(this.$store.getters.accessToken).then((res) => {
                this.unread_notifications = res.data.getUnreadNotifications.amount;
            });
        }
    }
}
</script>

<style scoped>
    .notification_icon_container {
        display: flex;
        flex-direction: row;
        position: relative;
    }
    .bell_icon {
        margin: 0 auto;
        width: 25px;
        height: 25px;
    }
    .unread_icon {
        position: absolute;
        top: 60%;
        left: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 10px;
        padding: 3px;
        color: #fff;
        border-radius: 30px;
        background-color: red;
        font-weight: bold !important;
    }
</style>
<template>
    <div class="notification_icon_container">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-bell bell_icon"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            :stroke="bellColor"
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
export default {
    data() {
        return {
            unread_notifications: this.$store.getters.unread_notifications || 0,
        }
    },
    props: {
        bellColor: {
            type: String,
            default: "var(--main-font-color)"
        },
    },
    computed: {
        unread() {
            return this.$store.getters.unread_notifications;
        }
    },
    watch: {
        unread(newUnread) {
            this.unread_notifications = newUnread;
        }
    }
}
</script>

<style scoped>
    .notification_icon_container {
        width: 25px;
        height: 25px;
        margin: 0 auto;
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
        bottom: -10px;
        right: -5px;
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
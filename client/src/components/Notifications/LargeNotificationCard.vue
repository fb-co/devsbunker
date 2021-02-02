<template>
    <div class="large_notification_container" :style="cssProps">
        <NotificationPopup :data="data" />

        <div class="text_container">
            <p class="sender">{{ data.sender }}</p>
            <p class="message">{{ messageToDisplay }}</p>
            <p v-if="data.timestamp" class="timestamp">{{ data.timestamp }}</p>
        </div> 
        <div class="icon_container">
            <svg v-if="data.type=='like'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F44336" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
        </div>
    </div>
</template>

<script>
import NotificationPopup from "@/components/Notifications/NotificationPopup.vue";

export default {
    data() {
        return {
            messageToDisplay: this.processMessage(this.data.message)
        }
    },
    props: {
        data: Object,
        width: {
            type: String,
            default: "70%"
        }
    },
    methods: {
        processMessage(msg) {
            let finalMsg = msg;
            
            if (this.data.type == "like") {
                finalMsg = finalMsg.slice(0, -1); // remove exclamation point
                finalMsg += " titled: " + this.data.target;
            }

            return finalMsg;
        }
    },
    components: {
        NotificationPopup
    },  
    computed: {
        cssProps() {
            return {
                "--container-width": this.width
            };
        }
    }
}
</script>

<style scoped>
    .large_notification_container {
        display: flex;
        flex-direction: row;
        width: var(--container-width);
        margin-top: 10px;
        background-color: var(--secondary-color);
        border-radius: 10px;
        cursor: pointer;
    }
    .sender {
        font-size: 17px;
        font-weight: bold;
        color: var(--main-font-color);
        margin-bottom: 10px;
    }
    .message {
        color: var(--soft-text);
    }
    .timestamp {
        padding-top: 10px;
        color: var(--soft-text);
        font-size: 12px;
    }
    .read_container {
        width: 25px;
        background-color: pink;
    }
    .text_container {
        padding: 20px;
        text-align: left;
        width: 70%;
    }
    .icon_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
    }

    .icon {
        width: 100%;
    }
</style>
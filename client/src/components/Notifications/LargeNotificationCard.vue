<template>
    <div class="large_notification_container" :style="cssProps">
        <!--<NotificationPopup :data="data" />-->

        <div class="text_container">
            <p class="sender">{{ data.sender }}</p>
            <p class="message">{{ messageToDisplay }}</p>
            <p v-if="data.timestamp" class="timestamp">{{ usableTimestamp }}</p>
        </div> 
        <div class="icon_container">
            <svg v-if="data.type=='like'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F44336" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            <svg v-else-if="data.type=='follow'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="9" cy="7" r="4" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 11h6m-3 -3v6" />
            </svg>
            <svg v-else-if="data.type=='comment'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                <line x1="8" y1="9" x2="16" y2="9" />
                <line x1="8" y1="13" x2="14" y2="13" />
            </svg>
        </div>
    </div>
</template>

<script>
//import NotificationPopup from "@/components/Notifications/NotificationPopup.vue";
import TimeStampService from "@/services/timestamp.service.js";

export default {
    data() {
        return {
            messageToDisplay: this.processMessage(this.data.message),
            usableTimestamp: this.data.timestamp, 
        }
    },
    created() {
        this.usableTimestamp = TimeStampService.convertToDate(this.data.timestamp, true, true, true);       
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
            } else if (this.data.type == "comment") {
                finalMsg = finalMsg.slice(0, -1); // remove exclamation point
                finalMsg += " titled: " + this.data.target;
            }

            return finalMsg;
        }
    },
    components: {
        //NotificationPopup
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
        overflow: hidden;
        text-overflow: ellipsis;
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
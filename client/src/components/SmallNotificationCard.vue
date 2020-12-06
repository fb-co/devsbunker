<template>
    <div v-if="!notificationData.read" class="main_container" :style="style"> <!-- Only show the notification if its unread -->
        <div class="text_container">
            <p v-if="largeScreen" class="title">{{ senderText }}</p>
            <p v-else class="title">{{ notificationData.sender }}</p>
            <p class="subtext">{{ notificationData.message }}</p>
        </div>
        <div class="icon_container">
            <svg v-if="notificationData.type=='like'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F44336" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
        </div>
    </div>
</template>

<script>
import ScreenType from "../utils/screenType.js";

export default {
    data() {
        return {
            largeScreen: false,
            senderText: this.notificationData.sender
        }
    },
    props: {
        notificationData: Object,
        width: {
            type: String,
            default: "100%"
        }
    },
    created() {
        this.largeScreen = this.isLargeScreen();

        window.addEventListener("resize", () => {
            this.largeScreen = this.isLargeScreen();
        });

        console.log(this.notificationData.sender.length);
        if (this.notificationData.sender.length > 10) {
            this.senderText = this.notificationData.sender.slice(0, 9) + "...";
        }
    },
    computed: {
        style() {
            return "width: " + this.width;
        }
    },
    methods: {
        isLargeScreen() {
            return ScreenType.isMobile(1500);
        },
    }
}
</script>

<style scoped>
    .main_container {
        display: flex;
        flex-direction: row;
        margin-bottom: 25px;
        cursor: pointer;
        padding: 5px;
    }
    .main_container:hover {
        text-decoration: underline;
    }
    .text_container {
        display: flex;
        flex-direction: column;
        width: 60%;
        padding-left: 15px;
        text-align: left;
    }
    .title {
        font-weight: bold;
        margin-bottom: 5px;
    }
    .subtext {
        margin-bottom: 5px;
    }
    .icon_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
    }
    .icon_container > SVG {
        margin: 0 auto;
    }
</style>
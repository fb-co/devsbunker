<template>
    <div class="notification_popup_container">
        <p class="popup_sender">{{ data.sender }}</p>
        <p class="popup_message">{{ messageToDisplay }}</p>

        <button class="noti_popup_close">Ok</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messageToDisplay: this.processMessage(this.data.message),
        };
    },
    props: {
        data: Object,
    },
    methods: {
        processMessage(msg) {
            let finalMsg = msg;

            if (this.data.type == "like") {
                finalMsg = finalMsg.slice(0, -1); // remove exclamation point
                finalMsg += " titled: " + this.data.target;
            }

            return finalMsg;
        },
    },
};
</script>

<style scoped>
.notification_popup_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-60%);

    width: 25%;
    min-width: 300px;
    max-width: 400px;

    background-color: var(--secondary-color);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    max-height: 500px;
    padding-top: 20px;

    border-radius: 10px;
}

.noti_popup_close {
    margin-top: 20px;
    border: none;
    width: 100%;
    padding: 10px;
    background-color: var(--main-accent);
    color: #fff;
    font-size: 16px;
    cursor: pointer;

    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.noti_popup_close:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}
.noti_popup_close:focus {
    outline: none;
}

.popup_sender {
    font-weight: bold;
    margin-bottom: 20px;
}
</style>
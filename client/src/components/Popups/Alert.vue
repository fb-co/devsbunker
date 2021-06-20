<template>
    <div v-if="active" ref="popup_container" class="alert" :class="{ alert_success: alertData.type==='success', alert_error: alertData.type==='error' }">
        <svg
            v-if="alertData.type === 'success'"
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-circle-check"
            width="35"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#42b983"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2l4 -4" />
        </svg>
        <svg
            v-else-if="alertData.type === 'error'"
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-circle-x"
            width="35"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#c50000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
            <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>

        <div class="alert-msg">
            <p>
                <span
                    style="font-weight: bold; font-size: 18px; color: var(--main-font-color)"
                    >{{ alertData.title || 'Alert' }}</span
                >
                <br />
                {{ alertData.msg }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: true
        }
    },
    props: {
        alertData: Object,
    },
    created() {
        /*
        setTimeout(() => {
            this.active = false;
        }, 3000);
        */
    }
    /*
    destroyed() {
        // maybe figure out a way to do a fade out animation at some point (optional)
    }
    */
};
</script>

<style scoped>
@keyframes slide {
    from {
        right: -400px;
    }
    to {
        right: 0px;
    }
}

.alert {
    height: 70px;
    min-height: 70px;

    animation: slide 0.3s;

    background: var(--secondary-color);
    box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.25);

    border-radius: 10px;
    /* border-left: 10px solid var(--vue-green); */

    display: flex;
    flex-direction: row;
    align-content: center;

    position: relative;
    right: 0px;
}

.alert_success {
    border-left: 10px solid var(--vue-green); 
}
.alert_error {
    border-left: 10px solid var(--error-red);
}

.alert svg {
    height: 100%;
    margin-left: 10px;
}

.alert-msg {
    height: 100%;
    margin-left: 15px;
    text-align: left;
}

.alert-msg p {
    margin: 0;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 14px;
    color: var(--soft-text);
}

.pauseAnimation {
    animation-play-state: paused;
}
</style>
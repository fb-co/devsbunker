<template>
    <div ref="popup_container" id="success" v-if="display">
        <svg
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

        <div class="success-msg">
            <p>
                <span
                    style="font-weight: bold; font-size: 18px; color: var(--main-font-color)"
                    >Success</span
                >
                <br />
                {{ message }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            display: false,
        };
    },

    methods: {
        show() {
            this.display = true;

            // pause animation after first iteration
            setTimeout(() => {
                this.$refs.popup_container.style.animationPlayState = 'paused';
            }, 300);

            setTimeout(() => {
                this.$refs.popup_container.style.animationPlayState = 'running';
                this.$refs.popup_container.style.right="-400px";

                // hide popup after 2nd iteration
                setTimeout(() => {
                    this.display = false;
                }, 300);
            }, this.duration);
        }
    },

    props: {
        message: String,
        duration: {
            type: Number,
            default: 3000
        },
    },
};
</script>

<style scoped>
@keyframes slide {
    from {
        right: -400px;
    }
    to {
        right: 20px;
    }
}

#success {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    height: 70px;

    animation: slide 0.3s;
    animation-iteration-count: 2;
    animation-direction: alternate;

    background: var(--main-color);
    box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.25);

    border-radius: 10px;
    border-left: 10px solid var(--vue-green);

    display: flex;
    flex-direction: row;
    align-content: center;
}

#success svg {
    height: 100%;
    margin-left: 10px;
}

.success-msg {
    height: 100%;
    margin-left: 15px;
    text-align: left;
}

.success-msg p {
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

<template>
    <div ref="error_popup_container" :class="{ error_popup: false }" id="err" v-if="display">
        <svg
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

        <div class="err-msg">
            <p>
                <span style="font-weight: bold; font-size: 18px; color: var(--main-font-color)">Error</span>
                <br />
                {{ msg }}
            </p>
        </div>

        <!-- blank space -->
        <div id="void"></div>

        <div id="close" @click="display=false">
            <p>CLOSE</p>
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
    props: {
        msg: String,
        duration: {
            type: Number,
            default: 3000
        },
        // this is really just here for backwards compatibility to the older error popup
        showOnCreation: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        if (this.showOnCreation) {
            this.show();
        }
    },
    methods: {
        show() {
            this.display = true;

            // pause animation after first iteration
            setTimeout(() => {
                if (this.display) { // in case its forcefully closed
                    this.$refs.error_popup_container.style.animationPlayState = 'paused';
                }
            }, 300);

            setTimeout(() => {
                if (this.display) { // in case its forcefully closed
                    this.$refs.error_popup_container.style.animationPlayState = 'running';
                    this.$refs.error_popup_container.style.right="-400px";

                    // hide popup after 2nd iteration
                    setTimeout(() => {
                        this.display = false;
                    }, 300);
                }
            }, this.duration);
        }
    }
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

.error_popup {
    right: 20px;
}

#err {
    position: fixed;
    bottom: 20px;
    right: 20px;
    height: 70px;
    animation: slide 0.3s;
    animation-iteration-count: 2;
    animation-direction: alternate;
    width: 90%;
    max-width: 350px;
    background: var(--main-color);
    box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.25);

    border-radius: 10px;
    border-left: 10px solid var(--error-red);

    display: flex;
    flex-direction: row;
    align-content: center;
}

#err svg {
    height: 100%;
    margin-left: 10px;
}

.err-msg {
    flex-grow: 1;
    height: 100%;
    margin-left: 15px;
    text-align: left;
}

.err-msg p {
    margin: 0;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 14px;
    color: var(--soft-text);
}

#void {
    width: 60px;
}
#close {
    right: 0;
    border-left: 1px solid rgb(204, 204, 204);
    width: 65px;
    cursor: pointer;
}

#close p {
    margin: 0;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 11px;
    letter-spacing: 1px;
    color: var(--soft-text);
}
</style>

<!-- This is basically just the informative popup, except whithought the question mark so you can control it from some other click binding -->
<template>
    <div @mousedown.stop="">
        <div @click.stop="close()" v-if="informationOpen" class="backdrop" />
        <div
            @click.stop=""
            v-if="informationOpen"
            class="information_container"
            :class="{ information_container_desktop: !this.$store.getters.mobile, information_container_mobile: this.$store.getters.mobile }"
        >
            <div class="cont_header">
                <div class="close_btn_container vertical_flex_center">
                    <svg
                        @click="close()"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-x"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="var(--main-font-color)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <h4 class="vertical_flex_center">{{ title }}</h4>
                <div style="width: 50px;" />
                <!-- Placeholder -->
            </div>
            <div class="main_cont">
                <slot>
                    <!-- Add the information you want to add here (wherever your adding the component, not literally here) -->
                </slot>
                <div class="placeholder" style="flex-grow: 1;" />
                <div class="horizontal_flex_center">
                    <button @click="close()" class="general_button" style="margin: 30px auto 0px auto;">Ok</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            informationOpen: false,
        };
    },
    props: {
        title: {
            type: String,
            default: "Information",
        },
    },
    methods: {
        close() {
            this.informationOpen = false;
        },
        open() {
            this.informationOpen = true;
        },
    },
};
</script>

<style scoped>
@keyframes slideAnimation {
    from {
        top: -100%;
    }
    to {
        top: 50%;
    }
}

.information_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 13;
    overflow-y: auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
    box-shadow: 0px 0px 15px var(--drop-shadow);
    animation: slideAnimation 0.4s;
    display: flex;
    flex-direction: column;
}
.information_container_mobile {
    width: 95%;
    max-width: 400px;
    max-height: 95vh;
    min-height: 300px;
}
.information_container_desktop {
    width: 40%;
    min-width: 600px;
    max-width: 600px;
    max-height: 80vh;
    min-height: 300px;
}

.cont_header {
    display: flex;
    flex-direction: row;
}
.cont_header h4 {
    font-size: 23px;
    flex-grow: 1;
}
.close_btn_container {
    padding: 10px;
    width: 50px;
}
.close_btn_container svg:hover {
    stroke-width: 2px;
}
.main_cont {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 20px auto 20px auto;
    text-align: justify;
    flex-grow: 1;
}
.main_cont p {
    color: var(--soft-text);
}
</style>

<template>
    <div @mousedown.stop="">
        <div @click.stop="close()" v-if="display" class="backdrop" />
        <div
            @click.stop=""
            v-if="display"
            class="information_container"
            :class="{ information_container_desktop: !this.$store.getters.mobile, information_container_mobile: this.$store.getters.mobile }"
        >
            <div class="cont_header">
                <div class="title">
                    <slot name="title"></slot>
                </div>
                <div class="illustration">
                    <slot name="illustration"></slot>
                </div>
            </div>
            <div class="main_cont">
                <slot name="message"> </slot>
            </div>
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
        close() {
            this.display = false;
        },
        open() {
            this.display = true;
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
    max-width: 400px;
    max-height: 80vh;
    min-height: 450px;
}

.cont_header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.cont_header h1 {
    font-size: 25px;
    margin-top: 20px;
}
.illustration {
    width: 150px;
    height: 150px;

    margin-top: 35px;
}
.main_cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    text-align: justify;

    margin: auto;
}
.main_cont p {
    color: var(--soft-text);
    font-size: 16px;
}
</style>

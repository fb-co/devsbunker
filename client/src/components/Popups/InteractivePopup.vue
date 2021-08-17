<template>
    <div @mousedown.stop="">
        <div v-if="display" class="backdrop" />
        <div
            @click.stop=""
            v-if="display"
            class="information_container"
            :class="{ information_container_desktop: !this.$store.getters.mobile, information_container_mobile: this.$store.getters.mobile }"
        >
            <div class="cont_header">
                <div class="illustration">
                    <slot name="illustration"></slot>
                </div>
                <div class="title">
                    <slot name="title"></slot>
                </div>
            </div>
            <div class="main_cont">
                <slot name="message"> </slot>
            </div>
            <div class="btns">
                <div class="btn" @click="routeToPolicy()">
                    <p>Privacy policy</p>
                </div>
                <div class="btn" style="background-color: var(--main-accent); color: var(--main-color)" @click="agree()">
                    <p>OK</p>
                </div>
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
        routeToPolicy() {
            this.$router.push("/policy");

            // hacky, fix me
            setTimeout(() => {
                this.display = false;
            }, 100);
        },
        agree() {
            localStorage.setItem("agreedToPolicy", true);
            this.display = false;
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
    margin-top: 30px;
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
    text-align: center;

    margin: auto;
}
.main_cont p {
    color: var(--soft-text);
    font-size: 16px;
    line-height: 22px;
}
.btns {
    width: 100%;
    height: 70px;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.btn {
    flex: 0.5;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
}

.btn p {
    font-size: 18px;
    font-weight: 400;
}
</style>

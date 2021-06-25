<template>
    <div v-if="isOpen" @click.stop="close()" class="backdrop">
        <div @click.stop="" class="popup_container" :class="{ container_mobile: $store.getters.mobile, container_desktop: !$store.getters.mobile }">
            <div class="popup_header">
                <div class="close_btn_container" @click="close()">
                    <svg @click="close()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <p class="vertical_flex_center">{{ title }}</p>
                <div style="width: 50px;" />
            </div>
            <p>{{ msg }}</p>
            <div class="actions_container">
                <button class="cancel" @click="close()">{{ cancelButton }}</button>
                <button class="confirm" @click="$emit('confirm')">{{ confirmButton }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        }
    },
    props: {
        title: {
            type: String,
            default: "Confirm"
        },
        msg: {
            type: String,
            default: "Are you sure?"
        },
        confirmButton: {
            type: String,
            default: "Confirm"
        },
        cancelButton: {
            type: String,
            default: "Cancel"
        }
    }
}
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

.popup_container {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 13;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0px 0px 20px var(--drop-shadow);
    background-color: var(--main-color);
    height: 200px;
    animation: slideAnimation 0.4s;
}
.popup_container > p {
    flex-grow: 1;
    padding-top: 30px;
}
.container_mobile {
    width: 95%;
    max-width: 400px;
}
.container_desktop {
    width: 450px;
}
.popup_header {
    display: flex;
}
.popup_header > p {
    flex-grow: 1;
    font-weight: bold;
    font-size: 18px;
}
.close_btn_container {
    width: 50px;
}
.close_btn_container:hover > svg {
    stroke-width: 2px;
}

.confirm {
    background-color: var(--main-accent);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 125px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin: 0px auto 10px auto;
    cursor: pointer;
}
.confirm:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}

.cancel {
    background-color: var(--error-red);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 125px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin: 0px 20px 10px auto;
    cursor: pointer;
}
.cancel:hover {
    box-shadow: 0px 4px 20px var(--error-red);
}
</style>
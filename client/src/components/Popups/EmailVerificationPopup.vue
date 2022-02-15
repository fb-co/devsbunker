<template>
    <div v-if="isOpen" @click.stop="close()" class="backdrop">
        <div @click.stop="" class="popup_container">

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
}
</script>

<style scoped>
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
    animation: slideAnimation 0.4s;
    padding: 10px;
    text-align: center;
    max-height: 95vh;
    overflow: auto;
}
</style>
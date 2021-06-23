<template>
    <div v-if="open" class="backdrop" @click.stop="closeMenu()">
        <div class="more_options_mobile" @click.stop="">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: false
        }
    },
    methods: {
        closeMenu() {
            this.open = false;
        },
        openMenu() {
            this.open = true;
        }
    }
}
</script>

<style scoped>
    @keyframes moreOptionsSlider {
        from {
            transform: translate(50%) translateY(100%);
        }
        to {
            transform: translate(50%) translateY(0%);
        }
    }


    .more_options_mobile {
        position: absolute;
        width: 100vw;
        bottom: 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: var(--burger-menu-bg);
        animation: moreOptionsSlider 0.5s;
        display: flex;
        flex-direction: column;
        color: var(--main-color);
        right: 50%;
        transform: translateX(50%);
        padding-bottom: 30px;
        padding-top: 10px;
    }
    .more_options_mobile > div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .more_options_mobile > div:active {
        background-color: var(--main-font-color);
    }

    .more_options_mobile p {
        width: 125px;
        cursor: pointer;
        padding-top: 13px;
        padding-bottom: 13px;
        color: var(--main-color);
    }
</style>
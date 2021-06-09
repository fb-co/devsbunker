<template>
    <p v-if="(unread_amount!=0 && hideOnZero)" class="unread_icon">0</p>
</template>

<script>
export default {
    data() {
        return {
            unread_amount: 0,
        }
    },
    props: {
        unread_prop: Number,
        hideOnZero: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    .unread_icon {
        position: absolute;
        bottom: -10px;
        right: -5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 10px;
        padding: 3px;
        color: #fff;
        border-radius: 30px;
        background-color: red;
        font-weight: bold !important;
    }
</style>
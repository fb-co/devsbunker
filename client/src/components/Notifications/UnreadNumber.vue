<template>
    <p v-if="(unread_amount!=0 && hideOnZero)" class="unread_icon">{{ unread_amount }}</p>
</template>

<script>
export default {
    data() {
        return {
            unread_amount: this.$store.getters.unread_notifications || 0,
        }
    },
    props: {
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
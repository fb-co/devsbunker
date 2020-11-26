<template>
    <!-- You need to provide the entire file path -->
    <!--<img v-if="image_link" :src="require(image_link)" :alt="alternate">-->
    <img v-if="image_link" src="" :alt="alternate">
</template>

<script>
export default {
    props: {
        image_link: {
            type: String,
            required: true,
        },
        alternate: {
            type: String,
            default: "image"
        }
    }
}
</script>

<style lang="less" scoped>

</style>
<template>
    <PostFeed :rootComponent="$parent.$parent" :desktop="false" />
</template>

<script>
import PostFeed from "@/components/PostFeed.vue";

export default {
    components: {
        PostFeed
    },
}
</script>

<style scoped>

</style>
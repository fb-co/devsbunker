<template>
    <PostFeed :rootComponent="$parent.$parent" :desktop="false" />
</template>

<script>
import PostFeed from "@/components/PostFeed.vue";

export default {
    created() {
        // change which posts the parent is handling since it can only have the same mixin applied once
        this.$parent.$parent.changeTab("saved");
    },
    components: {
        PostFeed
    },
}
</script>

<style scoped>

</style>
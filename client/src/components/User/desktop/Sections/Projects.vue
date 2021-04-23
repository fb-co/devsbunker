<template>
    <PostFeed :rootComponent="$parent.$parent" />
</template>

<script>
import PostFeed from "@/components/PostFeed.vue";

export default {
    created() {
        // change which posts the parent is handling since it can only have the same mixin applied once
        this.$parent.$parent.changeTab("projects");
    },
    components: {
        PostFeed
    },
};
</script>

<style scoped>

</style>
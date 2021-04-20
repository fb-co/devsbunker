<template>
    <PostFeed :rootComponent="$parent.$parent" :desktop="false" />
</template>

<script>
import PostFeed from "@/components/PostFeed.vue";

export default {
    created() {
        this.$parent.$parent.changeTab("projects");
    },
    components: {
        PostFeed
    },
};
</script>

<style scoped>

</style>
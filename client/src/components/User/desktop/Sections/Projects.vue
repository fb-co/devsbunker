<template>
    <div class="general_container">
        <PostFeed :rootComponent="$parent.$parent" />
    </div>
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
.general_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: auto;
}
</style>
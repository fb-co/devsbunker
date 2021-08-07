<template>
    <div class="explore_desktop">
        <LeftContent class="left_content" />
        <PostFeed :rootComponent="$parent" title="All Projects" class="feed" />
        <RightContent class="right_content" />
    </div>
</template>

<script>
import PostFeed from "@/components/PostFeed.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";
import LeftContent from "@/components/Home/desktop/LeftContent.vue";

export default {
    components: {
        PostFeed,
        RightContent,
        LeftContent,
    }
}
</script>

<style scoped>
.explore_desktop {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.left_content {
    width: 20%;
    min-width: 150px;
    max-width: 250px;
}
.feed {
    overflow-y: auto;
    flex-grow: 1;
    width: 60%;
    height: calc(100vh - var(--header-height));
}
.right_content {
    min-width: 150px;
    max-width: 250px;
    width: 20%;
}
</style>
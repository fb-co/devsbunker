<template>
    <div class="explore_mobile">
        <PostFeed 
            :rootComponent="$parent"
            :desktop="false"  
            title="All Projects" 
            class="feed" 
        />
    </div>
</template>

<script>
import PostFeed from "@/components/PostFeed.vue";

export default {
    components: {
        PostFeed,
    }
}
</script>

<style scoped>

</style>
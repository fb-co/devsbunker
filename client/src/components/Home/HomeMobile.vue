<template>
    <PostFeed :rootComponent="$parent" :desktop="false" />
</template>
<script>
import PostFeed from "@/components/PostFeed.vue";

export default {
    data() {
        return {
            
        };
    },
    props: {
        projects: Array,
        fetchedAll: Boolean,
        postFeedFilter: String,
    },
    methods: {
        makeNewPost() {
            this.$parent.openPostMenu();
        },
    },
    components: {
        PostFeed
    },
};
</script>

<style scoped>

</style>

<template>
    <PostFeed 
        :rootComponent="$parent" 
        :desktop="false" 
        v-if="loaded" 
        title="Discover Projects" 
    />
</template>
<script>
import PostFeed from "@/components/PostFeed.vue";

export default {
    props: {
        projects: Array,
        fetchedAll: Boolean,
        postFeedFilter: String,
        loaded: Boolean,
    },
    methods: {
        makeNewPost() {
            this.$parent.openPostMenu();
        },
    },
    components: {
        PostFeed,
    },
};
</script>

<style scoped></style>

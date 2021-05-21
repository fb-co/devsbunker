<template>
    <PostFeed :rootComponent="$parent" :desktop="false" v-if="loaded" />
</template>
<script>
import PostFeed from "@/components/PostFeed.vue";

export default {
    data() {
        return {};
    },
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

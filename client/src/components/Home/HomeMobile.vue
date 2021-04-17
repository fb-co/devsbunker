<template>
    <PostFeedMobile :rootComponent="$parent" />
</template>
<script>
import PostFeedMobile from "@/components/PostFeedMobile.vue";

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
        PostFeedMobile
    },
};
</script>

<style scoped>

</style>

<template>
    <div class="main_container">
        <LeftContent class="left_content" />
        <PostFeed :rootComponent="$parent" title="Discover Projects" class="post_feed" v-if="loaded" />
        <RightContent class="right_content" />
    </div>
</template>

<script>
import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";
import PostFeed from "@/components/PostFeed.vue";


export default {
    data() {
        return {
            username: "",
            searchResults: [],
            showSearchResults: false,
            fetchedAllSearchResults: true,
        };
    },

    props: {
        loaded: Boolean,
    },
    methods: {
        makeNewPost() {
            this.$parent.openPostMenu();
        },
    },
    components: {
        LeftContent,
        RightContent,
        PostFeed,
    },
};
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.left_content {
    width: 20%;
    min-width: 150px;
    max-width: 250px;
}
.right_content {
    min-width: 150px;
    max-width: 250px;
    width: 20%;
}
.post_feed {
    overflow-y: auto;
    flex-grow: 1;
    width: 60%;
    height: calc(100vh - var(--header-height));
}
</style>

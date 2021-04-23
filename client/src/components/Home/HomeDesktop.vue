<template>
    <div class="main_container">
        <LeftContent />
        <PostFeed :rootComponent="$parent" class="post_feed" v-if="loaded" />
        <RightContent :notifications="notifications" />
    </div>
</template>

<script>
/*
import DesktopProjectCard from "@/components/DesktopProjectCard.vue";
import PostSearch from "@/components/PostSearch.vue";
import Dropdown from "@/components/global/Dropdown.vue";
import Loading from "@/components/Loading.vue";
*/
import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";
import PostFeed from "@/components/PostFeed.vue";

// tmp
// import DeletedPost from "@/components/Post/DeletedPost.vue";

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
        projects: Array,
        postFeedFilter: String,
        notifications: Array,
        fetchedAll: Boolean,
        loaded: Boolean,
    },
    methods: {
        makeNewPost() {
            this.$parent.openPostMenu();
        },
        // emit the data again to get it to the parent component where the localstorage can be updated
        updateFilterDropdown(value) {
            // only ask for new general posts if you dont want to change it for the search results
            if (!this.showSearchResults) {
                this.$emit("updateFilterDropdown", value);
            } else {
                this.$emit("updateFilterDropdown", value);
                this.$refs.post_search.updateFilter(value); // give it what the filter will be so it wont need to wait for the normal posts to load in the background
            }
        },
        updateSearchComponent(documents, fetchedAllSearched, closeResults) {
            this.fetchedAllSearchResults = fetchedAllSearched;
            this.searchResults = documents;

            if (closeResults) {
                this.showSearchResults = false;
            } else {
                this.showSearchResults = true;
            }
        },
        loadNew() {
            if (!this.showSearchResults) {
                this.$parent.loadNew();
            } else {
                this.$refs.post_search.loadMoreResults();
            }
        },
    },
    components: {
        /*
        DesktopProjectCard,
        Dropdown,
        PostSearch,
        Loading,
        */
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
.post_feed {
    overflow-y: auto;
    flex-grow: 1;
    height: calc(100vh - var(--header-height));

    -ms-overflow-style: none; /* IE and Edge (scrollbar hide)*/
    scrollbar-width: none; /* Firefox (scrollbar hide)*/
}
.post_feed::-webkit-scrollbar {
    display: none;
}
</style>

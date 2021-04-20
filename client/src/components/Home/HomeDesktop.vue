<template>
    <div class="main_container">
        <LeftContent />
        <PostFeed :rootComponent="$parent" class="post_feed" />
        <!--
        <div class="center_content">
            <div class="scrollable_center">
                <p class="discover_label no_select">Discover Projects</p>

                <PostSearch :sortingType="this.postFeedFilter" width="50%" class="post_search_bar" ref="post_search" />

                <div class="filter_dropdown">
                    <Dropdown :label="postFeedFilter" linkHeight="40px" height="40px" width="200px" @itemSelected="updateFilterDropdown">
                        <button>Newest</button>
                        <button>Most Popular</button>
                    </Dropdown>
                </div>
                <div v-if="loaded">
                    <div v-if="!showSearchResults" class="projects_area">
                        <DesktopProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="70%" class="project_card" />
                    </div>
                    <div v-else>
                        <DesktopProjectCard v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" width="70%" class="project_card" :highlight_phrase="$refs.post_search.getSearchedPhrase()" />
                    </div>
                </div>
                <div id="loading-gif" v-else>
                    <Loading />
                </div>
        
                <p v-if="(!showSearchResults && !fetchedAll) || (!fetchedAllSearchResults && showSearchResults)" @click="loadNew()" class="load_more_btn">Load More</p>
            </div>
        </div>
        -->
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
            fetchedAllSearchResults: true
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
        PostFeed
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

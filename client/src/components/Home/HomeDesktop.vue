<template>
    <div class="main_container">
        <LeftContent class="left_content" />
        <PostFeed :rootComponent="$parent" title="Discover Projects" class="post_feed" v-if="loaded" />
        <RightContent :notifications="notifications" class="right_content" />
    </div>
</template>

<script>
/*
import DesktopProjectCard from "@/components/ProjectCard/DesktopProjectCard.vue";
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
    created() {
        setTimeout(() => console.log("*** CREATED HOME DESKTOP ***", this.projects), 1000);

        
        // delete these eventully xD

        this.$store.dispatch("alertUser", { msg: "Hey", type: "error", title: "You smell" });

        setTimeout(() => { this.$store.dispatch("alertUser", { msg: "Leo", type: "error" }); }, 1000);
        setTimeout(() => { this.$store.dispatch("alertUser", { msg: "What", type: "error" }); }, 2000);
        setTimeout(() => { this.$store.dispatch("alertUser", { msg: "Is", type: "success" }); }, 3000);
        setTimeout(() => { this.$store.dispatch("alertUser", { msg: "Up?", type: "success" }); }, 4000);
    },
    updated() {
        setTimeout(() => console.log("*** UPDATED HOME DESKTOP ***", this.projects), 1000);
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

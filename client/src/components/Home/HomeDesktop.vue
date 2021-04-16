<template>
    <div class="main_container">
        <LeftContent />
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
                <!-- includes all logic of whether or not to show the loadMorebutton, including search results -->
                <p v-if="(!showSearchResults && !fetchedAll) || (!fetchedAllSearchResults && showSearchResults)" @click="loadNew()" class="load_more_btn">Load More</p>
            </div>
        </div>
        <RightContent :notifications="notifications" />
    </div>
</template>

<script>
import DesktopProjectCard from "@/components/DesktopProjectCard.vue";
import PostSearch from "@/components/PostSearch.vue";
import Dropdown from "@/components/global/Dropdown.vue";
import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";
import Loading from "@/components/Loading.vue";

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
        DesktopProjectCard,
        Dropdown,
        PostSearch,
        LeftContent,
        RightContent,
        Loading,
        //DeletedPost
    },
};
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.post_search_bar {
    margin: 0px auto 20px auto;
}

/* CENTER CONTENT */

.center_content {
    -ms-overflow-style: none; /* IE and Edge (scrollbar hide)*/
    scrollbar-width: none; /* Firefox (scrollbar hide)*/

    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.scrollable_center {
    overflow-y: scroll;
    height: calc(100vh - var(--header-height));
}
.language_cycler_container {
    display: flex;
    flex-direction: row;
    width: 75%;
    height: 50px;
    margin: 0 auto;
}
.lan_cycler_arrow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: var(--carosel-height);
    height: 100%;
}
.lan_cycler_arrow > svg {
    margin: 0 auto;
}
.lan_cycler_arrow > svg:hover {
    stroke-width: 2.5;
}
.lan_cycler_cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
}
.lan_cycler_cont > p {
    font-size: 20px;
}
.projects_area {
    padding: 10px;
    width: 100%;
    flex-grow: 1;
}
.project_card {
    margin: 0px auto 40px auto;
    max-width: 750px;
    min-width: 400px;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 10px;
}
.project_card:hover {
    cursor: pointer;
    border: 1px solid var(--main-accent);
}

.add_button {
    margin-top: 5px;
}
.add_button:hover {
    stroke-width: 0.7;
    cursor: pointer;
}
.projects_footer {
    width: 100%;
}

.language_car {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.language_car p {
    margin-left: 20px;
    margin-right: 20px;
    padding: 5px;
}
.discover_label {
    font-size: 25px;
    margin-top: 50px;
    margin-bottom: 40px;
}
.filter_dropdown {
    width: 200px;
    margin: 30px auto 40px auto;
}
.filter_dropdown > div {
    width: 200px;
}

.load_more_btn {
    margin: 0 auto 40px auto;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    width: 200px;
}

/* (center content scrollbar)
.scrollable_center::-webkit-scrollbar {
    width: 4px;
}
.scrollable_center::-webkit-scrollbar-thumb {
    background: var(--soft-text);
    border-radius: 10px;
}
*/

.scrollable_center::-webkit-scrollbar {
    display: none;
}

/* #loading-gif {
    margin-top: 200px;
} */
</style>

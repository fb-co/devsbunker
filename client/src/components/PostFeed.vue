<template>
    <div id="main_container" ref="scrollable_container">
        <p v-if="title" class="title">{{ title }}</p>
        <div class="filter_dropdown_container">
            <PostSearch
                ref="post_search"
                @highlightPhrases="highlightCards"
                @loading="loading = true"
                @doneLoading="loading = false"
                :sortingType="rootComponent.sortingType"
                :otherData="rootComponent.otherData"
                :filter="rootComponent.queryType"
                :moreOptions="true"
                width="50%"
                class="posts_search_bar"
            />

            <Dropdown
                v-if="showFilter"
                :label="rootComponent.sortingType"
                fontSize="12px"
                linkHeight="40px"
                height="40px"
                class="filter_dropdown"
                @itemSelected="updateSearchFilter"
            >
                <button>Newest</button>
                <button>Most Popular</button>
            </Dropdown>
        </div>
        <LoadingGif v-if="loading || rootComponent.awaitingPosts" :show="true" />
        <div v-else>
            <div v-if="!showSearchResults" class="project_list" ref="test">
                <div v-if="rootComponent.posts.length > 0" class="post_wrapper">
                    <div v-if="!desktop" class="mobile_post_feed">
                        <!-- <MobileProjectCard class="mobile_project_card" v-for="project in rootComponent.posts" :key="project.id" :projectData="project" /> -->
                        <LargeMobileProjectCard v-for="project in rootComponent.posts" :key="project.id" :projectData="project" />
                    </div>
                    <div v-if="desktop && feedTheme === 'Simple'" class="desktop_post_feed">
                        <!-- <DesktopProjectCard class="desktop_project_card" v-for="project in rootComponent.posts" :key="project.id" :projectData="project" width="70%" /> -->
                        <LargeDesktopProjectCard 
                            v-for="project in rootComponent.posts" 
                            :key="project.id" :projectData="project" 
                        />

                        <!--These placeholders basically make the last row of a grid layout appear to be centered left -->
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <!-- <DetailedDesktopProjCard v-for="project in rootComponent.posts" :key="project.id" :projectData="project" /> -->
                    </div>
                    <div v-if="desktop && feedTheme === 'Descriptive'" class="desktop_post_feed">
                        <DetailedDesktopProjCard v-for="project in rootComponent.posts" :key="project.id" :projectData="project" />
                    </div>
                    <p v-if="!rootComponent.fetchedAll && !awaitingResults" @click="loadNew()" class="load_more_btn">Load More</p>
                </div>
                <div v-else class="no_projects">
                    <p>No projects found</p>
                    
                    <!-- If the user never interacted with anything, nothing will be suggested because it does not know what to suggest -->
                    <p v-if="$route.name == 'Home'" class="no_suggestions">
                        Start browsing and finding new projects 
                        <router-link to="/explore">here</router-link>
                    </p>
                </div>
            </div>
            <div v-else class="project_list">
                <div v-if="searchResults.length > 0" class="post_wrapper">
                    <div v-if="!desktop" class="mobile_post_feed">
                        <!-- <MobileProjectCard class="mobile_project_card" v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" :highlight_phrase="$refs.post_search.getSearchedPhrase()" /> -->
                        <LargeMobileProjectCard
                            v-for="searchResult in searchResults"
                            :key="searchResult.id"
                            :projectData="searchResult"
                            :highlight_phrase="searchPhrase"
                            :search_phrase="searchPhrase"
                        />
                    </div>
                    <div v-if="desktop && feedTheme === 'Simple'" class="desktop_post_feed">
                        <!-- <DesktopProjectCard class="desktop_project_card" v-for="project in searchResults" :key="project.id" :projectData="project" width="70%" :highlight_phrase="$refs.post_search.getSearchedPhrase()" /> -->
                        <LargeDesktopProjectCard
                            v-for="searchResult in searchResults"
                            :key="searchResult.id"
                            :projectData="searchResult"
                            :highlight_phrase="searchPhrase"
                            :search_phrase="searchPhrase"
                        />
                        <!--These placeholders basically make the last row of a grid layout appear to be centered left -->
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                        <div class="dummy_placeholder" />
                    </div>
                    <div v-if="desktop && feedTheme === 'Descriptive'" class="desktop_post_feed">
                        <!-- <DesktopProjectCard class="desktop_project_card" v-for="project in searchResults" :key="project.id" :projectData="project" width="70%" :highlight_phrase="$refs.post_search.getSearchedPhrase()" /> -->
                        <DetailedDesktopProjCard
                            v-for="searchResult in searchResults"
                            :key="searchResult.id"
                            :projectData="searchResult"
                            :highlight_phrase="searchPhrase"
                        />
                    </div>
                    <p v-if="!fetchedAllSearchResults && !awaitingResults" @click="loadNew()" class="load_more_btn">Load More</p>
                </div>
                <div v-else class="no_projects">
                    <p>No projects found</p>
                </div>
            </div>
        </div>
        <LoadingGif v-if="awaitingResults" :show="true" />
        <!-- Just a placeholder to add some space beneath the results even after the load more button is gone -->
        <div v-if="(showSearchResults && fetchedAllSearchResults) || (!fetchedAllSearchResults && rootComponent.fetchedAll)" style="height: 60px;" />
    </div>
</template>

<script>
import PostSearch from "@/components/SearchLogic/PostSearch.vue";
import Dropdown from "@/components/global/Dropdown.vue";
import LoadingGif from "@/components/global/LoadingGif.vue";
import LargeDesktopProjectCard from "@/components/ProjectCard/LargeDesktopProjectCard.vue";
import LargeMobileProjectCard from "@/components/ProjectCard/LargeMobileProjectCard.vue";
import DetailedDesktopProjCard from "@/components/ProjectCard/DetailedDesktopProjCard.vue";
import GeneralProperties from "@/mixins/general.mixin";

export default {
    data() {
        return {
            showSearchResults: false,
            searchResults: [],
            fetchedAllSearchResults: false,
            loading: false,
            awaitingResults: false,
            searchPhrase: undefined,
            residingPath: this.$route.path,
            mostRecentScrollAmt: 0, // save the scroll position so you can return to it after viewing a post
        };
    },
    mixins: [GeneralProperties],
    props: {
        rootComponent: Object,

        // specifies whether to use desktop project cards, or mobile
        desktop: {
            type: Boolean,
            default: true,
        },

        title: String,
        
        showFilter: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        PostSearch,
        Dropdown,
        LoadingGif,
        LargeDesktopProjectCard,
        LargeMobileProjectCard,
        DetailedDesktopProjCard,
    },
    mounted() {
        // update with any data in the cache
        const cachedPostFeedData = this.$store.getters.getCachedPostFeedData;

        // scroll to point wherever the user was (since the main page itself is not scrolling this does not get saved on desktop)
        this.$refs.scrollable_container.scrollTop = cachedPostFeedData.scrollAmt;
        
        if (cachedPostFeedData.searchPhrase) {
            this.$refs.post_search.forceSearchTerm(cachedPostFeedData.searchPhrase);
            this.$store.dispatch("clearPostFeedData");
        }

        // don't need to destroy on destroyed() because its attached to an element and will get removed anyway
        this.$refs.scrollable_container.addEventListener("scroll", () => {
            this.mostRecentScrollAmt = this.$refs.scrollable_container.scrollTop;
            this.$refs.post_search.closeMoreMenu();
        });
    },
    // make sure any methods fetching posts show and hide the proper loading gifs
    methods: {
        // can fire loading gif
        loadNew() {
            this.awaitingResults = true;

            if (!this.showSearchResults) {
                this.rootComponent.loadNewPosts().then(() => {
                    this.awaitingResults = false;
                });
            } else {
                this.$refs.post_search.loadMoreResults().then(() => {
                    this.awaitingResults = false;
                });
            }
        },
        // can fire loading gif
        updateSearchFilter(value) {
            this.loading = true;

            if (!this.showSearchResults) {
                this.rootComponent.updateFilterDropdown(value).then(() => {
                    this.loading = false;
                });
            } else {
                this.rootComponent.updateFilterDropdown(value).then(() => {
                    this.loading = false;
                });
                this.$refs.post_search.updateFilter(value);
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
        highlightCards(phrase) {
            this.searchPhrase = phrase;
        },
    },

    beforeDestroy() {
        this.$store.dispatch("cachePostFeedData", {
            path: this.residingPath,
            searchPhrase: this.$refs.post_search.getSearchedPhrase(),
            scrollAmt: this.mostRecentScrollAmt,
        });
    }
};
</script>

<style scoped>
.title {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
}

.project_list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    
}
.post_wrapper {
    width: 100%;
}

.mobile_post_feed {
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 500px;
}
.desktop_post_feed {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.filter_dropdown_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    margin-top: 50px;
    margin-bottom: 60px;
}
.filter_dropdown {
    font-size: 12px;
    width: 150px;
    margin: 20px auto 0px auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
}

.desktop_project_card {
    margin: 0px auto 25px auto;
    max-width: 750px;
    min-width: 400px;
    width: 100%;
}
.mobile_project_card {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
}

.no_projects {
    margin-top: 20px;
}
.no_suggestions {
    font-size: 13px;
    margin-top: 20px;
}

.posts_search_bar {
    margin: 0 auto 10px auto;
    max-width: 400px;
}

.load_more_btn {
    margin: 30px auto 30px auto;
    border-radius: 5px;
    padding: 10px;
    background-color: var(--main-accent);
    cursor: pointer;
    width: 200px;
    color: #fff;
}
.load_more_btn:hover {
    font-weight: bold;
    box-shadow: 0px 4px 20px var(--main-accent);
}
.dummy_placeholder {
    min-width: 300px;
    max-width: 500px;
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
}
</style>

<template>
    <div id="main_container">
        <p v-if="title" class="title">{{ title }}</p>
        <div class="filter_dropdown_container">
            <PostSearch 
                ref="post_search" 
                :sortingType="rootComponent.sortingType" 
                :moreOptions="true"
                width="50%" 
                class="posts_search_bar" 
            />
            
            <Dropdown :label="rootComponent.sortingType" fontSize="12px" linkHeight="40px" height="40px" class="filter_dropdown" @itemSelected="updateSearchFilter">
                <button>Newest</button>
                <button>Most Popular</button>
            </Dropdown>          
        </div>
        <div v-if="!showSearchResults" class="project_list">
            <div v-if="rootComponent.posts.length > 0" class="post_wrapper">
                <div class="posts_only_wrapper">
                    <div v-if="!desktop" class="running_out_of_wrapper_names">
                        <MobileProjectCard class="mobile_project_card" v-for="project in rootComponent.posts" :key="project.id" :projectData="project" width="85%" />
                    </div>
                    <div v-else class="running_out_of_wrapper_names">
                        <DesktopProjectCard class="desktop_project_card" v-for="project in rootComponent.posts" :key="project.id" :projectData="project" width="70%" />
                    </div>
                </div>
                <p v-if="!rootComponent.fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
            </div>
            <div v-else class="no_projects">
                <p>No projects found</p>
            </div>
        </div>
        <div v-else class="project_list">
            <div v-if="searchResults.length > 0">
                <div class="posts_only_wrapper">
                    <div v-if="!desktop" class="running_out_of_wrapper_names">
                        <MobileProjectCard class="mobile_project_card" v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" width="85%" :highlight_phrase="$refs.post_search.getSearchedPhrase()" />
                    </div>
                    <div v-else class="running_out_of_wrapper_names">
                        <DesktopProjectCard class="desktop_project_card" v-for="project in searchResults" :key="project.id" :projectData="project" width="70%" :highlight_phrase="$refs.post_search.getSearchedPhrase()" />
                    </div>
                </div>
                <p v-if="!fetchedAllSearchResults" @click="loadNew()" class="load_more_btn">Load More</p>
            </div>
            <div v-else class="no_projects">
                <p>No projects found</p>
            </div>
        </div>
    </div>
</template>

<script>
import PostSearch from "@/components/PostSearch.vue";
import Dropdown from "@/components/global/Dropdown.vue";
import MobileProjectCard from "@/components/MobileProjectCard.vue";
import DesktopProjectCard from "@/components/DesktopProjectCard.vue";

export default {
    data() {
        return {
            showSearchResults: false,
            searchResults: [],
            fetchedAllSearchResults: false,
        }
    },
    props: {
        rootComponent: Object,
        
        // specifies whether to use desktop project cards, or mobile
        desktop: {
            type: Boolean,
            default: true
        },

        title: String
    },
    components: {
        PostSearch,
        Dropdown,
        MobileProjectCard,
        DesktopProjectCard
    },
    methods: {
        loadNew() {
            if (!this.showSearchResults) {
                this.rootComponent.getPosts();
            } else {
                this.$refs.post_search.loadMoreResults();
            }
        },
        updateSearchFilter(value) {
            if (!this.showSearchResults) {
                this.rootComponent.updateFilterDropdown(value);
            } else {
                this.rootComponent.updateFilterDropdown(value);
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
    },
}
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
.posts_only_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.running_out_of_wrapper_names {
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
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
}

.no_projects {
    margin-top: 20px;
}

.posts_search_bar {
    margin: 0 auto 10px auto;
    max-width: 400px;
}

.load_more_btn {
    margin: 20px auto 40px auto;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    width: 200px;
}
</style>
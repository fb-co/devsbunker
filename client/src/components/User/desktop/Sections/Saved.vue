<template>
    <div v-if="savedUserProjects" id="main_container">
        <div class="filter_dropdown_container">
            <PostSearch :sortingType="sortingFilter" ref="post_search" width="40%" filter="saved" class="search_bar" />

            <Dropdown :label="sortingFilter" fontSize="12px" linkHeight="40px" height="40px" class="filter_dropdown" @itemSelected="updateFilter">
                <button>Newest</button>
                <button>Most Popular</button>
            </Dropdown>
        </div>
        <div v-if="!showSearchResults" class="project_list">
            <MobileProjectCard v-for="(userProject, index) in savedUserProjects.posts" :key="index" :projectData="userProject" width="85%" />
            <p v-if="!savedUserProjects.fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
        </div>
        <div v-else class='project_list'>
            <MobileProjectCard v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" width="85%" />
            <p v-if="!fetchedAllSearchResults" @click="loadNew()" class="load_more_btn">Load More</p>
        </div>
    </div>
    <div v-else class="no_saved">
        <p>You have no saved projects</p>
    </div>
</template>

<script>
import MobileProjectCard from '@/components/MobileProjectCard.vue';
import PostSearch from '@/components/PostSearch.vue';
import Dropdown from "@/components/global/Dropdown.vue";

export default {
    data() {
        return {
            searchResults: [],
            showSearchResults: false,
            fetchedAllSearchResults: false,
        }
    },
    props: {
        sortingFilter: String,
        savedUserProjects: Object
    },
    components: {
        MobileProjectCard,
        PostSearch,
        Dropdown
    },
    methods: {
        updateSearchComponent(documents, fetchedAllSearched, closeResults) {
            this.fetchedAllSearchResults = fetchedAllSearched;
            this.searchResults = documents;

            if (closeResults) {
                this.showSearchResults = false;
            } else {
                this.showSearchResults = true;
            }
        },
        // see the home page desktop updateFilter function for explanations
        updateFilter(value) {
            if (!this.showSearchResults) {
                this.$emit("updateFilter", value);
            } else {
                this.$emit("updateFilter", value);
                this.$refs.post_search.updateFilter(value);
            }
        },
        loadNew() {
            if (!this.showSearchResults) {
                this.$parent.loadNewSavedPosts();
            } else {
                this.$refs.post_search.loadMoreResults();
            }   
        }
    }
}
</script>

<style scoped>
.project_list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
}
.project_list > * {
    margin: 10px;
}
.filter_dropdown_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    margin-top: 50px;
}
.filter_dropdown {
    font-size: 12px;
    width: 150px;
    margin: 20px auto 40px auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
}
.search_bar{
    margin: 0 auto;
}
.no_saved {
    margin-top: 20px;
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
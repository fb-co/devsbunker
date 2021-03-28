<template>
    <div v-if="projectsToRender.posts.length>0">
        <PostSearch width="70%" filter="saved" class="posts_search_bar" />
        
        <div class="filter_dropdown_container">
            <Dropdown :label="filter" fontSize="12px" linkHeight="40px" height="40px" class="filter_dropdown" @itemSelected="updateFilter">
                <button>Newest</button>
                <button>Most Popular</button>
            </Dropdown>
        </div>

        <div v-if="!showSearchResults">
            <MobileProjectCard v-for="userProject in projectsToRender.posts" :key="userProject.id" :projectData="userProject" />
            <p v-if="!projectsToRender.fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
        </div>
        <div v-else>
            <MobileProjectCard v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" />
        </div>
    </div>
    <div v-else class="no_saved">
        <p>You have no saved projects</p>
    </div>
</template>

<script>
import MobileProjectCard from "@/components/MobileProjectCard.vue";
import PostSearch from "@/components/PostSearch.vue";
import SearchUtilities from "@/utils/search_utilities.js";
import Dropdown from "@/components/global/Dropdown.vue";

export default {
    data() {
        return {
            userProjects: {
                posts: [],
                fetchedAll: false
            },
            searchResults: [],
            showSearchResults: false,
            filter: SearchUtilities.getSavedPostFilter(),
        };
    },
    props: {
        projectsToRender: Object
    },
    components: {
        MobileProjectCard,
        PostSearch,
        Dropdown
    },
    methods: {
        updateSearchComponent(documents, closeResults) {
            this.searchResults = documents;

            if (closeResults) {
                this.showSearchResults = false;
            } else {
                this.showSearchResults = true;
            }
        },
        loadNew() {
            this.$parent.$parent.loadNewSavedPosts();
        },
        updateFilter(value) {
            this.$emit("updateFilter", value);
        }
    },
};
</script>

<style scoped>
.posts_search_bar {
    margin: 50px auto 30px auto;
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

.filter_dropdown_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.filter_dropdown {
    font-size: 12px;
    width: 150px;
    margin: 0 auto 40px auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
}
</style>
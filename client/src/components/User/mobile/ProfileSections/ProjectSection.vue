<template>
    <div v-if="projectsToRender.posts.length > 0" id="component_container">
        <PostSearch width="70%" filter="myProjects" :userToFilterProp="$store.getters.username" class="posts_search_bar" />

        <div class="filter_dropdown_container">
            <Dropdown :label="filter" fontSize="12px" linkHeight="40px" height="40px" class="filter_dropdown" @itemSelected="updateFilter">
                <button>Newest</button>
                <button>Most Popular</button>
            </Dropdown>
        </div>

        <div v-if="!showSearchResults">
            <MobileProjectCard v-for="(project, index) in projectsToRender.posts" :key="index" :projectData="project" width="100%" />
        </div>
        <div v-else>
            <MobileProjectCard v-for="(project, index) in searchResults" :key="index" :projectData="project" width="100%" />
        </div>

        <p v-if="!projectsToRender.fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
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
            searchResults: [],
            showSearchResults: false,
            filter: SearchUtilities.getSavedPostFilter(),
        };
    },
    props: {
        projectsToRender: Object,
    },
    methods: {
        loadNew() {
            // this may be the cause to the duplicate posts
            this.$parent.$parent.loadNewPersonalPosts();
        },
        updateSearchComponent(documents, closeResults) {
            this.searchResults = documents;

            if (closeResults) {
                this.showSearchResults = false;
            } else {
                this.showSearchResults = true;
            }
        },
        updateFilter(value) {
            this.$emit("updateFilter", value);
        }
    },
    components: {
        MobileProjectCard,
        PostSearch,
        Dropdown
    },
};
</script>

<style scoped>
#component_container {
    width: 100%;
}

.posts_search_bar {
    margin: 50px auto 30px auto;
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
    margin: 0px auto 40px auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
}
</style>
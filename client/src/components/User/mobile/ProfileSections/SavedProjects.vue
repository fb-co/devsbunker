<template>
    <div v-if="projectsToRender.posts.length>0">
        <PostSearch width="70%" filter="saved" class="posts_search_bar" />
        
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
        }
    },
};
</script>

<style scoped>
.posts_search_bar {
    margin: 50px auto 50px auto;
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
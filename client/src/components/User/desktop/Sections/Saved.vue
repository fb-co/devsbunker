<template>
    <div v-if="userProjects && userProjects.length>0" id="main_container">
        <div class="filter_dropdown_container">
            <PostSearch width="30%" class="search_bar" />
        </div>
        <div v-if="!showSearchResults" class="project_list">
            <MobileProjectCard v-for="userProject in userProjects" :key="userProject.id" :projectData="userProject" width="85%" />
        </div>
        <div v-else class='project_list'>
            <MobileProjectCard v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" width="85%" />
        </div>
    </div>
    <div v-else class="no_saved">
        <p>You have no saved projects</p>
    </div>
</template>

<script>
import MobileProjectCard from '@/components/MobileProjectCard.vue';
import PostSearch from '@/components/PostSearch.vue';
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            userProjects: undefined,
            searchResults: [],
            showSearchResults: false
        }
    },
    created() {
        // WE SHOULD CACHE THIS FOR A RELATIVELY SHORT AMOUNT OF TIME
        GraphQLService.fetchSavedPosts(this.$store.getters.accessToken).then((posts) => {
            this.userProjects = posts.data.getSavedPosts;
        });
    },
    components: {
        MobileProjectCard,
        PostSearch
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
}
.search_bar{
    margin: 0 auto;
}
.no_saved {
    margin-top: 20px;
}
</style>
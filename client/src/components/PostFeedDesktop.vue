<template>
    <div v-if="rootComponent.posts.length > 0" id="main_container">
        <div class="filter_dropdown_container">
            <PostSearch 
                ref="post_search" 
                :sortingType="rootComponent.sortingFilter" 
                width="40%" 
                filter="myProjects" 
                class="posts_search_bar" 
            />
            
            <Dropdown :label="rootComponent.sortingFilter" fontSize="12px" linkHeight="40px" height="40px" class="filter_dropdown" @itemSelected="updateFilter">
                <button>Newest</button>
                <button>Most Popular</button>
            </Dropdown>
            
        </div>
        <div v-if="!showSearchResults" class="project_list">
            <MobileProjectCard v-for="project in userProjects.posts" :key="project.id" :projectData="project" width="85%" />
            <p v-if="!userProjects.fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
        </div>
        <div v-else class="project_list">
            <MobileProjectCard v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" width="85%" :highlight_phrase="$refs.post_search.getSearchedPhrase()" />
            <p v-if="!fetchedAllSearchResults" @click="loadNew()" class="load_more_btn">Load More</p>
        </div>
    </div>
    <div v-else class="no_projects">
        <p>You have no projects</p>
    </div>
</template>

<script>
import PostSearch from "@/components/PostSearch.vue";
import Dropdown from "@/components/global/Dropdown.vue";

export default {
    props: {
        rootComponent: Object,
    },
    components: {
        PostSearch,
        Dropdown
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

.no_projects {
    margin-top: 20px;
}

.posts_search_bar {
    margin: 0 auto;
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
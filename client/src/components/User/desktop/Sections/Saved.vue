<template>
    <div v-if="userProjects && userProjects.length>0" id="main_container">
        <div class="filter_dropdown_container">
            <PostSearch width="30%" filter="saved" class="search_bar" />
        </div>
        <div v-if="!showSearchResults" class="project_list">
            <MobileProjectCard v-for="userProject in userProjects" :key="userProject.id" :projectData="userProject" width="85%" />
            <p v-if="!fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
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
            showSearchResults: false,
            fetchedAll: false,
            lastPostId: 0
        }
    },
    created() {
        // WE SHOULD CACHE THIS FOR A RELATIVELY SHORT AMOUNT OF TIME
        GraphQLService.fetchSavedPosts(this.$store.getters.accessToken, this.lastPostId).then((posts) => {
            console.log(posts);
            this.userProjects = posts.data.getSavedPosts.posts;
            this.lastPostId = posts.data.getSavedPosts.lastPostId;
            this.fetchedAll = posts.data.getSavedPosts.fetchedAll;
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
        loadNew() {
            // WE SHOULD CACHE THIS FOR A RELATIVELY SHORT AMOUNT OF TIME
            GraphQLService.fetchSavedPosts(this.$store.getters.accessToken, this.lastPostId).then((posts) => {
                console.log(posts);
                this.userProjects = this.userProjects.concat(posts.data.getSavedPosts.posts);
                this.lastPostId = posts.data.getSavedPosts.lastPostId;
                this.fetchedAll = posts.data.getSavedPosts.fetchedAll;
            });    
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
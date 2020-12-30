<template>
    <div v-if="this.userProjects.length > 0" id="main_container">
        <div class="filter_dropdown_container">
            <PostSearch width="30%" class="posts_search_bar" />
            <!--
            <Dropdown label="Newest" fontSize="12px" linkHeight="40px" height="40px" class="filter_dropdown">
                <button>Newest</button>
                <button>Most Popular</button>
                <button>Alphabetical</button>
            </Dropdown>
            -->
        </div>
        <div v-if="!showSearchResults" class="project_list">
            <MobileProjectCard v-for="project in userProjects" :key="project.id" :projectData="project" width="85%" />
            <p v-if="!fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
        </div>
        <div v-else class="project_list">
            <MobileProjectCard v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" width="85%" />
        </div>
    </div>
    <div v-else class="no_projects">
        <p>You have no projects</p>
    </div>
</template>

<script>
import MobileProjectCard from "@/components/MobileProjectCard.vue";
//import Dropdown from "@/components/global/Dropdown.vue";
import PostSearch from '@/components/PostSearch.vue';
import GraphQLService from '@/services/graphql.service.js';

export default {
    data() {
        return {
            userProjects: this.$parent.userProjects,
            searchResults: [],
            showSearchResults: false,
            fetchedAll: false
        };
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
            GraphQLService.fetchPostsByAuthor(this.$store.getters.username, this.$store.getters.accessToken, this.userProjects.length).then((posts) => {
                this.userProjects = this.userProjects.concat(posts.data.getPostsByAuthor.posts);
                this.fetchedAll = posts.data.getPostsByAuthor.fetchedAll;
            });
        }
    }
};
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
/*
.filter_dropdown_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    margin-top: 25px;
}
.filter_dropdown {
    font-size: 12px;
    width: 150px;
    margin: 20px auto 40px auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
}
*/
.no_projects {
    margin-top: 20px;
}

.posts_search_bar {
    margin: 30px auto 20px auto;
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
<template>
    <div v-if="projectsToRender.length > 0" id="component_container">
        <p v-if="projectsToRender.length > 0">posts: {{ projectsToRender.length }}</p>
        <PostSearch width="70%" filter="myProjects" :userToFilterProp="$store.getters.username" class="posts_search_bar" />
        <div v-if="!showSearchResults">
            <MobileProjectCard v-for="(project, index) in projectsToRender" :key="index" :projectData="project" width="100%" />
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

export default {
    data() {
        return {
            searchResults: [],
            showSearchResults: false,
        };
    },
    created() {
        console.log("child", this.projectsToRender);
    },
    props: {
        projectsToRender: Array,
    },
    methods: {
        loadNew() {
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
    },
    components: {
        MobileProjectCard,
        PostSearch,
    },
};
</script>

<style scoped>
#component_container {
    width: 100%;
}
.filter_dropdown {
    background-color: var(--secondary-color);
    width: 48%;
    margin: 0px auto 40px auto;
    display: inline-block;
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
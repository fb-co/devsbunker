<template>
    <div id="main_container">
        <div class="filter_dropdown_container">
            <SearchBar placeholder="Search..." class="search_bar" />
        </div>
        <div class="project_list">
            <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="60%" />
        </div>
    </div>
</template>

<script>
import MobileProjectCard from '@/components/MobileProjectCard.vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
    data() {
        return {
            projects: undefined,
        }
    },
    created() {
        /*
        GraphQLService.fetchPostsByAuthor(this.$store.getters.username).then((posts) => {
            this.userProjects = posts.data.getPostsByAuthor;
        });
        */
    },
    components: {
        MobileProjectCard,
        SearchBar
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
    width: 225px;
    margin: 0 auto;
}
</style>
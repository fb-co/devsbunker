<template>
    <div id="main_container">
        <div class="filter_dropdown_container">
            <SearchBar placeholder="Search..." class="search_bar" />
        </div>
        <div v-if="userProjects" class="project_list">
            <MobileProjectCard v-for="userProject in userProjects" :key="userProject.name" :projectData="userProject" width="85%" />
        </div>
    </div>
</template>

<script>
import MobileProjectCard from '@/components/MobileProjectCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            userProjects: undefined,
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
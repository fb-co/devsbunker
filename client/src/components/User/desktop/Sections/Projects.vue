<template>
    <div id="main_container">
        <div class="filter_dropdown_container">
            <SearchBar placeholder="Search..." class="search_bar" />
            <Dropdown label="Newest" fontSize="12px" linkHeight="40px" height="40px" class="filter_dropdown">
                <button>Newest</button>
                <button>Most Popular</button>
                <button>Alphabetical</button>
            </Dropdown>
        </div>
        <div class="project_list">
            <MobileProjectCard v-for="project in userProjects" :key="project.name" :projectData="project" width="85%" />
        </div>
    </div>
</template>

<script>
import MobileProjectCard from "@/components/MobileProjectCard.vue";
import Dropdown from "@/components/global/Dropdown.vue";
import SearchBar from '@/components/SearchBar.vue';

export default {
    data() {
        return {
            userProjects: this.$parent.userProjects,
        };
    },
    created() {
        console.log(this.userProjects);
    },
    components: {
        MobileProjectCard,
        Dropdown,
        SearchBar
    },
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
.search_bar{
    width: 225px;
    margin: 0 auto;
}
</style>
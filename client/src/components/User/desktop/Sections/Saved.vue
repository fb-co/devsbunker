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
            projects: [
                {
                    name: "Why Windowz is Stoopid",
                    author: "f0lg0",
                    desc: "Make sure you read this entire post in a bizza accent",
                    price:  0,
                    likes: 69
                },
                {
                    name: "The Hungry Wolf",
                    author: "The_Jak",
                    desc: "Make sure you have at least a Geforce RTX 2080 Ti graphics card before launching this game.",
                    price: 0,
                    likes: 420
                },
                {
                    name: "Spotify Ad Blocker Python",
                    author: "John",
                    desc: "Will block all spotify ads with an ad blocker",
                    price: 0,
                    likes: 1093
                },
                {
                    name: "Website Design Templates",
                    author: "Phil",
                    desc: "For less then a dollar you could have some professional website design templates",
                    price: 0.99,
                    likes: 792
                },
            ]
        }
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
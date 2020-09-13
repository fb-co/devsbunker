<template>
    <div id="main_container">
        <div class="filter_dropdown_container">
            <input class="search_projects" placeholder="Search...">
            <Dropdown spacing="40px" class="filter_dropdown">
                <button>Newest</button>
                <button>Most Popular</button>
                <button>Alphabetical</button>
            </Dropdown>
        </div>
        <div class="project_list">
            <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="60%" />
        </div>
    </div>
</template>

<script>
import MobileProjectCard from "@/components/MobileProjectCard.vue";
import Dropdown from "@/components/global/Dropdown.vue";

export default {
    data() {
        return {
            projects: [
                {
                    name: "The Hungry Wolf",
                    author: "The_Jak",
                    desc:
                        "Make sure you have at least a Geforce RTX 2080 Ti graphics card before launching this game.",
                    price: 0,
                    likes: 420,
                },
                {
                    name: "Why Windowz is Stoopid",
                    author: "f0lg0",
                    desc:
                        "Make sure you read this entire post in a bizza accent",
                    price: 0,
                    likes: 69,
                },
                {
                    name: "Website Design Templates",
                    author: "Phil",
                    desc:
                        "For less then a dollar you could have some professional website design templates",
                    price: 0.99,
                    likes: 792,
                },
                {
                    name: "Spotify Ad Blocker Python",
                    author: "John",
                    desc: "Will block all spotify ads with an ad blocker",
                    price: 0,
                    likes: 1093,
                },
            ],
        };
    },
    components: {
        MobileProjectCard,
        Dropdown,
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
}
.filter_dropdown {
    height: 40px;
    width: 200px;
    margin: 20px auto 20px auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
}
.search_projects {
    border: none;
    background-color: var(--secondary-color);
    color: #8d8d8d;
    border-radius: 5px;
    padding-right: 10px;
    height: 30px;
    width: 250px;
    margin: 0 auto;
    padding: 5px;
    font-family: rubik;
}
.search_projects:focus {
    outline: none;
}
</style>
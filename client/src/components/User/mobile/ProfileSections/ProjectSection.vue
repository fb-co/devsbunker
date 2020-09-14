<template>
    <div id="component_container">
        <div class="dropdown_placeholder">
            <div class="filter_dropdown_container">
                <Dropdown label="My Projects" fontSize="12px" spacing="40px" class="filter_dropdown">
                    <button>My Projects</button>
                    <button>Purchases</button>
                    <button>Downloaded</button>
                </Dropdown>
                <Dropdown label="Newest" fontSize="12px" spacing="40px" class="filter_dropdown">
                    <button>Newest</button>
                    <button>Most Popular</button>
                    <button>Alphabetical</button>
                </Dropdown>
            </div>
        </div>
        
        <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="100%" />
    </div>
</template>

<script>
import MobileProjectCard from '@/components/MobileProjectCard.vue';
import Dropdown from "@/components/global/Dropdown.vue";

export default {
    data() {
        return {
            projects: [
                {
                    name: "The Hungry Wolf",
                    author: "The_Jak",
                    desc: "Make sure you have at least a Geforce RTX 2080 Ti graphics card before launching this game.",
                    price: 0,
                    likes: 420
                },
                {
                    name: "Why Windowz is Stoopid",
                    author: "f0lg0",
                    desc: "Make sure you read this entire post in a bizza accent",
                    price:  0,
                    likes: 69
                },
                {
                    name: "Website Design Templates",
                    author: "Phil",
                    desc: "For less then a dollar you could have some professional website design templates",
                    price: 0.99,
                    likes: 792
                },
                {
                    name: "Spotify Ad Blocker Python",
                    author: "John",
                    desc: "Will block all spotify ads with an ad blocker",
                    price: 0,
                    likes: 1093
                },
            ]
        }
    },
    components: {
        MobileProjectCard,
        Dropdown
    }
}
</script>

<style scoped>
    #component_container {
        width: 100%;
    }
    .filter_dropdown_container {
        display: flex;
        flex-direction: row;
        position: absolute;
        left: 50%;
        width: 80%;
        max-width: 400px;
        margin: 0 auto;
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .filter_dropdown_container div:first-child {
        margin-right: 10px;
    }
    .filter_dropdown{
        height: 35px;
        width: 50%;
        background-color: var(--secondary-color);
        border-radius: 5px;
        font-size: 12px;
    }
    .dropdown_placeholder{
        height: 60px;
    }
</style>
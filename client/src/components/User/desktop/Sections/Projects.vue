<template>
    <div id="main_container">
        <div class="project_list">
            <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="45%" />
        </div>
    </div>
</template>

<script>
import MobileProjectCard from '@/components/MobileProjectCard.vue';

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
                {
                    name: "Spotify Ad Blocker Python",
                    author: "John",
                    desc: "Will block all spotify ads with an ad blocker",
                    price: 0,
                    likes: 1093
                }
            ]
        }
    },
    components: {
        MobileProjectCard
    }
}
</script>

<style scoped>
    .project_list{
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
    }
    .project_list>*{
        margin: 10px;
    }
</style>
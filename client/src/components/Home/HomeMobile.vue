<template>
    <div class="main_container">
        <div class="header_container">
            <p class="username_welcome">Hello The_Jak!</p>
            <Dropdown label="New" fontSize="12px" spacing="40px" :dynamicSwitch="false" justify="left" border_radius="0px" class="filter_dropdown">
                <button>Project</button>
                <button>Post</button>
                <button>Review</button>
            </Dropdown>
        </div>
        <div class="main_content_container">
            <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="100%" />
        </div>
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
        }
    },
    components: {
        MobileProjectCard,
        Dropdown
    }
}
</script>

<style scoped>
    .main_container {
        width: 100%;
        height: 200px;
    }
    .main_content_container {
        width: 80%;
        max-width: 500px;
        min-width: 250px;
        margin-left: auto;
        margin-right: auto;
        height: auto;
    }
    .header_container {
        width: 90%;
        max-width: 550px;
        min-width: 250px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 35px;
        text-align: left;
        font-weight: bold;
    }
    .filter_dropdown {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100px;
        color: var(--soft-text);
        font-weight: normal;
    }
    .username_welcome {
        font-size: 18px;
    }
</style>
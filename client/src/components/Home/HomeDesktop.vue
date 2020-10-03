<template>
    <div class="main_container">
        <div class="left_content">

        </div>
        <div class="center_content">
            <div class="language_cycler_container">
                <div class="lan_cycler_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="5" y1="12" x2="9" y2="16" />
                        <line x1="5" y1="12" x2="9" y2="8" />
                    </svg>
                </div>
                <div class="lan_cycler_cont">
                    <p class="no_select">Javascript * Python * C/C++ * Ruby * All * Javascript * Python * C/C++ * Ruby * All</p>
                </div>
                <div class="lan_cycler_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="15" y1="16" x2="19" y2="12" />
                        <line x1="15" y1="8" x2="19" y2="12" />
                    </svg>
                </div>
            </div>
            <p class="discover_label no_select">Discover Projects</p>
            <div class="projects_area">
                <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="70%" class="project_card" />
            </div>
            <div class="projects_footer">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus add_button" width="70" height="70" viewBox="0 0 24 24" stroke-width="0.4" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
            </div>
        </div>
        <div class="right_content">
            
        </div>
    </div>
</template>

<script>
import MobileProjectCard from "@/components/MobileProjectCard.vue";

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
        MobileProjectCard
    }
}
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.left_content {
    width: 300px;
}
.center_content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: calc(100vh - var(--header-height));
}
.language_cycler_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
}
.lan_cycler_arrow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50px;
    height: 100%;
}
.lan_cycler_arrow > SVG {
    margin: 0 auto;
}
.lan_cycler_arrow > SVG:hover {
    stroke-width: 2.5;
}
.lan_cycler_cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
}
.lan_cycler_cont > p {
    font-size: 20px;
}
.projects_area {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 200px;
    flex-grow: 1;
    overflow-y: scroll;
}
.project_card {
    margin: 0 auto;
    max-width: 650px;
    min-width: 500px;
}

/* SCROLL BAR */

.projects_area::-webkit-scrollbar {
  width: 4px;
}

 
/* Handle */
.projects_area::-webkit-scrollbar-thumb {
  background: var(--soft-text); 
  border-radius: 10px;
}


.add_button {
    margin-top: 5px;
}
.add_button:hover {
    stroke-width: 0.7;
    cursor: pointer;
}
.projects_footer {
    width: 100%;
}
.right_content {
    width: 450px;
}
.discover_label {
    font-size: 25px;
    margin-top: 50px;
    margin-bottom: 40px;
}
</style>
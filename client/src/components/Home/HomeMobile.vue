<template>
    <div class="main_container">
        <div class="main_content_container">
            <div class="header_container">
                <p class="username_welcome">Hello The_Jak!</p>
                <Dropdown label="New" fontSize="12px" spacing="40px" :dynamicSwitch="false" justify="left" border_radius="0px" class="filter_dropdown">
                    <button>Project</button>
                    <button>Post</button>
                    <button>Review</button>
                </Dropdown>

                <CustomInput class="main_search">
                    <input type="text" name="search" id="setting_search" placeholder="Search for a project...">
                    <div class="submit_search">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </div>
                </CustomInput>
            </div>

            <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="100%" />
        </div>
    </div>
</template>

<script>
import MobileProjectCard from '@/components/MobileProjectCard.vue';
import Dropdown from "@/components/global/Dropdown.vue";
import CustomInput from "@/components/global/CustomInput.vue"


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
        Dropdown,
        CustomInput
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
    .filter_dropdown {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100px;
        color: var(--soft-text);
        font-weight: normal;
    }
    .username_welcome {
        font-weight: bold;
        text-align: left;
        font-size: 20px;
    }
    .header_container {
        margin-top: 35px;
        margin-bottom: 40px;
    }


    .main_search {
        border-radius: 15px;
        height: 35px;
        margin-top: 40px;
        margin-bottom: 30px;
    }
    .main_search > input {
        margin-left: 15px;
        border-radius: 15px;
        font-size: 14px;
    }
    .submit_search {
        margin-right: 15px;
        width: 40px;
    }
    .submit_search:hover > SVG {
        stroke-width: 2.5;
    }
</style>
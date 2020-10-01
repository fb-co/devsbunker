<template>
    <div class="main_container">
        <div class="main_content_container">
            <div class="header_container">
                <div class="horizontal_flex_center">
                    <img src="../../assets/profilePlaceholder.png" alt="profile_pic" class="profile-pic">
                    <div class="header_right_cont">
                        <p class="username_welcome">Hello The_Jak!</p>

                        <Dropdown label="Filter" fontSize="12px" spacing="40px" :dynamicSwitch="true" justify="left" border_radius="0px" class="filter_dropdown">
                            <button>Javascript</button>
                            <button>Python</button>
                            <button>Java</button>
                            <button>C/C++</button>
                        </Dropdown>
                    </div>
                </div>

                <div class="switcher_container">
                    <p id="prev_filter" class="prev_filter_class"></p>
                    <p id="current_filter" class="current_filter_class">All</p>
                    <p id="next_filter" class="next_filter_class"></p>
                </div>

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
            bunkers: [
                "All",
                "Python",
                "Javascript",
                "Java",
                "C/C++"
            ],
            filter: "All"
        }
    },
    mounted() {
        console.log(document.getElementById("prev_filter").innerText);
        document.getElementById("prev_filter").innerText = this.getFilterScrollMenuData(this.filter).prev;
        document.getElementById("next_filter").innerText = this.getFilterScrollMenuData(this.filter).next;
    },
    methods: {
        // Returns the data for the current target: I HAVE NO IDEA WHAT IM DOING :')
        getFilterScrollMenuData(target) {
            const index = this.bunkers.indexOf(target || "All");

            return {
                prev: this.bunkers[index-1] || this.bunkers[this.bunkers.length-1], // tage the previous of the first index if you already at the start
                next: this.bunkers[index+1] || this.bunkers[0] // take the next index of the first if you at the end
            }
        },
        prevScrollMenuItem() {

        },
        nextScrollMenuItem() {
            
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
        margin-top: 60px;
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

    .profile-pic {
        width: 100px;
        height: auto;
    }
    .header_right_cont {
        width: 75%;
        margin-left: 10px;
        margin-top: 5px;
    }
    .switcher_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 50px;
        margin-top: 50px;
        margin-bottom: 50px;
        text-align: center;
        background-color: blue;
    }


    /*
    .next_filter_class {
        position: absolute;
        right: 0;
        -ms-transform: translateX(25%);
        transform: translateX(25%);
        color: var(--soft-text);
    }
    */

    .prev_filter_class:hover {
        font-weight: bold;
    }
    .next_filter_class:hover {
        font-weight: bold;
        cursor: pointer;
    }
    .current_filter_class {
        cursor: normal;
    }

    /* mobile styles */
    @media only screen and (max-width: 350px) {
        .profile-pic {
            display: none;
        }
    }
    /* desktop styles 
    @media only screen and (min-width: 500px) {
        .burger_menu_cont {
            width: 300px;
            animation: burger_animation 0.5s;
        }
    }
    */
</style>
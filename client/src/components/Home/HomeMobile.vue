<template>
    <div class="main_container">
        <div class="main_content_container">
            <CustomInput class="main_search">
                    <input type="text" name="search" id="setting_search" placeholder="Search...">
                    <div class="submit_search">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </div>
                </CustomInput>
            <div class="header_container">
                <div class="horizontal_flex_center">
                    <img src="../../assets/profilePlaceholder.png" alt="profile_pic" class="profile-pic">
                    <div class="header_right_cont">
                        <p class="username_welcome">Hello The_Jak!</p>

                        <Dropdown label="Newest" fontSize="12px" linkHeight="40px" height="30px" justifyLabel="left" class="filter_dropdown">
                            <button>Newest</button>
                            <button>Most Popular</button>
                            <button>Alphabetical</button>
                        </Dropdown>
                    </div>
                </div>

                <div class="switcher_container">
                    <div class="filter_container"><p @click="prevScrollMenuItem()" id="prev_filter" class="prev_filter_class no_select"></p></div>
                    <div class="current_filter_subcontainer">
                        <p id="current_filter" class="current_filter_class no_select"></p>
                        <div class="underline"></div>
                    </div>
                    <div class="filter_container"><p @click="nextScrollMenuItem()" id="next_filter" class="next_filter_class no_select"></p></div>
                </div>
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
        this.setScrollMenuData();
    },
    methods: {
        // Returns the data for the current target: I HAVE NO IDEA WHAT IM DOING :')
        getFilterScrollMenuData(target) {
            const index = this.bunkers.indexOf(target || "All");

            return {
                current: this.bunkers[index],
                prev: this.bunkers[index-1] || this.bunkers[this.bunkers.length-1], // tage the previous of the first index if you already at the start
                next: this.bunkers[index+1] || this.bunkers[0] // take the next index of the first if you at the end
            }
        },
        prevScrollMenuItem() {
            this.filter = this.getFilterScrollMenuData(this.filter).prev;
            this.setScrollMenuData();    
        },
        nextScrollMenuItem() {
            this.filter = this.getFilterScrollMenuData(this.filter).next;
            this.setScrollMenuData(); 
        },
        setScrollMenuData() {
            document.getElementById("current_filter").innerText = this.getFilterScrollMenuData(this.filter).current;
            document.getElementById("prev_filter").innerText = this.getFilterScrollMenuData(this.filter).prev;
            document.getElementById("next_filter").innerText = this.getFilterScrollMenuData(this.filter).next;
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
        overflow-x: hidden;
    }
    .main_content_container {
        width: 90%;
        max-width: 500px;
        min-width: 250px;
        margin-left: auto;
        margin-right: auto;
        height: auto;
    }
    .filter_dropdown {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 125px;
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
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .filter_container {
        width: 33.33%;
    }
    .underline {
        width: 25px;
        height: 4px;
        background-color: var(--accent);
        margin: 0 auto;
    }
    .switcher_container > div > p {
        height: 40px;
    }
    .switcher_container > p {
        height: 40px;
    }

    .prev_filter_class {
        color: var(--soft-text);
        text-align: left;
        position: relative;
        left: -40%;
    }
    .next_filter_class {
        color: var(--soft-text);
        text-align: right;
        position: relative;
        left: 40%;
    }
    .prev_filter_class:hover {
        font-weight: bold;
        cursor: pointer;
    }
    .next_filter_class:hover {
        font-weight: bold;
        cursor: pointer;
    }
    .current_filter_class {
        font-size: 21px;
        cursor: default;
        font-weight: bold;
        text-align: center;
    }
    .current_filter_subcontainer {
        flex-grow: 1;
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
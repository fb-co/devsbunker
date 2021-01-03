<template>
    <div class="user_search_container">
        <NavBar />

        <UserSearch class="user_search_input" />

        <div class="users_search_results">
            <UserCard :cardData="dummyData" />
        </div>

        <div v-if="mobile">
            <BottomNavBar />
        </div>
    </div>    
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BottomNavBar from "@/components/BottomNavBar.vue"
import SharedMethods from "@/utils/shared";
import ScreenType from "@/utils/screenType.js";

import UserSearch from "@/components/UserSearch.vue";
import UserCard from "@/components/UserCard.vue";

export default {
    data() {
        return {
            mobile: false,
            dummyData: {
                username: "Bruh",
                description: "Stoopid Linux User",
                followers: 10,
                posts: 23
            }
        }
    },
    created() {
        SharedMethods.loadPage();
        this.mobile = this.isMobile();

        // we also check when the user resizes the window
        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
        });

    },
    destroyed() {
        window.removeEventListener("resize", () => {
            this.mobile = this.isMobile();
        });
    },
    methods: {
        isMobile() {
            return ScreenType.isMobile(950);
        },
        updateSearchComponent() {
            console.log("BRUH");
        }
    },
    components: {
        NavBar,
        BottomNavBar,
        UserSearch,
        UserCard
    }
}
</script>

<style scoped>
    .user_search_input {
        width: 30%;
        min-width: 300px;
        max-width: 450px;
        margin: 30px auto 30px auto;
    }
    .users_search_results {
        margin: 0 auto;
        width: 80%;
        min-width: 350px;
        max-width: 700px;
        height: 200px; 
    }
</style>
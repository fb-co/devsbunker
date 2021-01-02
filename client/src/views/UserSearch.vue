<template>
    <div class="user_search_container">
        <NavBar />

        <input placeholder="search..."> <!-- Ill have to make a UserInput component to search for users -->

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

export default {
    data() {
        return {
            mobile: false,
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
    },
    components: {
        NavBar,
        BottomNavBar
    }
}
</script>

<style scoped>

</style>
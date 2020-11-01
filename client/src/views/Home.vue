<template>
    <div class="home">
        <NavBar />
        <HomeMobile v-if="mobile" />
        <HomeDesktop v-if="!mobile" />
        <NewPost ref="newPostMenu" />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "../utils/shared";
import GeneralProperties from "../mixins/general.mixin";
import ScreenType from "../utils/screenType.js";
import GraphQLService from "@/services/graphql.service";

import HomeMobile from "@/components/Home/HomeMobile.vue";
import HomeDesktop from "@/components/Home/HomeDesktop.vue";
import NewPost from "@/components/NewPost/NewPost.vue";

export default {
    data() {
        return {
            mobile: false,
        }
    },
    async created() {
        SharedMethods.loadPage();
        this.mobile = this.isMobile();

        // Get the posts
        GraphQLService.fetchPosts("newest").then((res) => { 
            // pass in the new post data to the home page main components
            console.log(res);
         });


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
    mixins: [GeneralProperties],
    components: {
        NavBar,
        HomeMobile,
        HomeDesktop,
        NewPost
    },
    methods: {
        isMobile() {
            return ScreenType.isMobile(950);
        },
        openPostMenu() {
            this.$refs.newPostMenu.open();
        },
        closePostMenu() {
            this.$refs.newPostMenu.close();
        }
    },
};
</script>

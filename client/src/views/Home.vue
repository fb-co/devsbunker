<template>
    <div class="home">
        <NavBar />
        <HomeMobile :projects="posts" v-if="mobile" />
        <HomeDesktop :projects="posts" v-if="!mobile" />
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
            posts: undefined,
        };
    },
    async created() {
        SharedMethods.loadPage();
        this.mobile = this.isMobile();

        this.queryPosts();

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
        NewPost,
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
        },
        queryPosts() {
            // CACHE TEST!!!
            let isCacheSupported = "caches" in window;
            console.log("is cache supported:", isCacheSupported);
            if (isCacheSupported) {
                let cacheName = "devsCache";
                // just caching a google req
                fetch("https://google.com").then(async (res) => {
                    const cache = await caches.open(cacheName);
                    cache.put(URL, res);
                    cache.match(URL).then((result) => {
                        console.log("[CACHE] ", result);
                    });
                });
            }
            // Get the posts
            GraphQLService.fetchPosts("newest", this.$store.getters.accessToken).then((res) => {
                // pass in the new post data to the home page main components
                this.posts = res.data.getPosts;
            });
        },
    },
};
</script>

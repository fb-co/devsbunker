<template>
    <div>
        <NavBar />
        <button @click="reloadHome()">Reload Home</button>
        <div class="home" :key="homeKey">
            <HomeMobile :projects="posts" v-if="mobile" />
            <HomeDesktop :projects="posts" v-if="!mobile" />
            <NewPost ref="newPostMenu" />
        </div>
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
            homeKey: 0,
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

        /*
        const cache = await caches.open("devsCache");
        cache.match("http://localhost:5000/graphql").then((result) => {
                        console.log("[CACHE] ", result.json());
                    });
                    */
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
            /*
            // CACHE TEST!!!
            let isCacheSupported = "caches" in window;
            console.log("is cache supported:", isCacheSupported);
            if (isCacheSupported) {
                //let cacheName = "devsCache";
                // just caching a google req

                const query = `
                    query {
                        user(username: "TheJak") {
                            email
                            liked_posts
                        }
                    }
                `;

                fetch("http://localhost:5000/graphql", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query }),
                }).then(async (res) => {
                    const cache = await caches.open("devsCache");
                    cache.put("http://localhost:5000/graphql", res);
                    cache.match("http://localhost:5000/graphql").then((result) => {
                        console.log("[CACHE] ", result.json());
                    });
                });
            }
            */
            // Get the posts
            GraphQLService.fetchPosts("newest", this.$store.getters.accessToken).then((res) => {
                // pass in the new post data to the home page main components
                this.posts = res.data.getPosts;
                console.log(this.posts);
            });
        },
        reloadHome() {
            this.queryPosts(); // i thought I could avoid calling this here but otherwise it doesnt work...
            this.homeKey += 1;
        },
    },
};
</script>

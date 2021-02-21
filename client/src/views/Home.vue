<template>
    <div>
        <div class="home">
            <HomeMobile :projects="posts" v-if="$store.getters.mobile" :fetchedAll="fetchedAll" />
            <HomeDesktop :projects="posts" :notifications="notifications" v-if="!$store.getters.mobile" :fetchedAll="fetchedAll" />
            <NewPost ref="newPostMenu" />
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import GeneralProperties from "../mixins/general.mixin";
import GraphQLService from "@/services/graphql.service";

import HomeMobile from "@/components/Home/HomeMobile.vue";
import HomeDesktop from "@/components/Home/HomeDesktop.vue";
import NewPost from "@/components/NewPost/NewPost.vue";

import LoadMorePosts from "@/mixins/load_more_posts.mixin";

export default {
    data() {
        return {
            posts: undefined,
            notifications: undefined,
            fetchedAll: false,
        };
    },
    async created() {
        SharedMethods.loadPage();

        this.queryPosts();

        /*
        const cache = await caches.open("devsCache");
        cache.match("http://localhost:5000/graphql").then((result) => {
                        console.log("[CACHE] ", result.json());
                    });
                    */
    },

    mixins: [GeneralProperties, LoadMorePosts],
    components: {
        HomeMobile,
        HomeDesktop,
        NewPost,
    },
    methods: {
        openPostMenu() {
            this.$refs.newPostMenu.open();
        },
        closePostMenu() {
            this.$refs.newPostMenu.close();
        },
        async loadNew() {
            const newProjects = await this.load(
                this.posts.length,
                this.$store.getters.accessToken
            );
            this.fetchedAll = newProjects.data.loadMorePosts.fetchedAll;
            this.posts = this.posts.concat(
                newProjects.data.loadMorePosts.posts
            );
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
            GraphQLService.fetchPosts(
                "newest",
                this.$store.getters.accessToken
            ).then((res) => {
                // pass in the new post data to the home page main components
                this.posts = res.data.getPosts;
            });

            // if the user is logged in then ask for their notifications
            if (this.$store.getters.accessToken) {
                GraphQLService.fetchPersonalDetails(
                    this.$store.getters.accessToken,
                    ["notifications {sender message read type }"]
                ).then((res) => {
                    this.notifications =
                        res.data.getPersonalDetails.notifications;
                });
            }
        },
    },
};
</script>

<template>
    <div>
        <div class="home">
            <HomeMobile :projects="posts" v-if="$store.getters.mobile" :fetchedAll="fetchedAll" :postFeedFilter="filter" @updateFilterDropdown="updateFilterDropdown" />
            <HomeDesktop :projects="posts" :notifications="notifications" v-if="!$store.getters.mobile" :fetchedAll="fetchedAll" :postFeedFilter="filter" @updateFilterDropdown="updateFilterDropdown" />
            <NewPost ref="newPostMenu" v-on:postFlag="reloadPosts($event)" />
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import SearchUtilities from "../utils/search_utilities.js";
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
            loadedPosts: [], // this contains posts loaded with other filters, to avoid continously loading them when you switch filters

            notifications: undefined,
            fetchedAll: false,
            reload: 0,
            filter: SearchUtilities.getHomePostFilter(),
        };
    },
    async created() {
        SharedMethods.loadPage();

        this.queryPosts(this.filter);

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
        updateFilterDropdown(value) {
            SearchUtilities.setHomePostFilter(value);
            this.filter = SearchUtilities.getHomePostFilter();

            this.queryPosts(this.filter); //try and avoid the get notifications server call
        },
        // returns whether a post filter type is already loaded in memory (so it doesnt have to re-ask the server)
        postsInMemory(filter) {
            for (let i = 0; i < this.loadedPosts.length; i++) {
                if (this.loadedPosts[i].filter == filter) {
                    return this.loadedPosts[i].posts;
                }
            }
            return null;
        },

        queryPosts(filter, forceReload = false) {
            const alreadyLoadedPosts = this.postsInMemory(filter);

            if (alreadyLoadedPosts && !forceReload) {
                this.posts = alreadyLoadedPosts;
            } else {
                // Get the posts
                GraphQLService.fetchPosts(
                    filter,
                    this.$store.getters.accessToken
                ).then((res) => {
                    // pass in the new post data to the home page main components
                    this.posts = res.data.getPosts;
                    // keep old loaded posts in memory
                    this.loadedPosts.push({
                        filter: filter,
                        posts: res.data.getPosts,
                    });
                });
            }
            // if the user is logged in then ask for their notifications
            if (this.$store.getters.accessToken && !this.notifications) {
                GraphQLService.fetchPersonalDetails(
                    this.$store.getters.accessToken,
                    ["notifications {sender message read type }"]
                ).then((res) => {
                    this.notifications =
                        res.data.getPersonalDetails.notifications;
                });
            }
        },
        reloadPosts(flag) {
            // leaving this even tho right now flag is always true, maybe in the future we'll need to propagate a failed attempt
            if (flag) this.queryPosts(this.filter, true);
        },
    },
};
</script>

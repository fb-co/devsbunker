<template>
    <div>
        <div class="home">
            <HomeMobile :projects="posts" v-if="$store.getters.mobile" :fetchedAll="fetchedAll" :postFeedFilter="filter" @updateFilterDropdown="updateFilterDropdown" />
            <HomeDesktop
                :projects="posts"
                :notifications="notifications"
                v-if="!$store.getters.mobile"
                :fetchedAll="fetchedAll[filter]"
                :postFeedFilter="filter"
                @updateFilterDropdown="updateFilterDropdown"
                :loaded="loaded"
            />
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
            posts: [],
            loadedPosts: [], // this contains posts loaded with other filters, to avoid continously loading them when you switch filters

            notifications: undefined,

            // needs to account for which filters have 'fetched all' which is why this is an object
            fetchedAll: {
                "Newest": false,
                "Most Popular": false,    
            },
            reload: 0,
            filter: SearchUtilities.getHomePostFilter(),
            loaded: false,
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
                this.filter,
                this.posts[this.posts.length-1] ? this.posts[this.posts.length-1].id : 0,
                this.posts[this.posts.length-1] ? this.posts[this.posts.length-1].likeAmt : -1, // last unique field (ex: likeAmt)
                this.$store.getters.accessToken
            );
            
            // set fetched all value only for the current filter
            this.fetchedAll[this.filter] = newProjects.data.getPosts.fetchedAll;

            this.posts = this.posts.concat(newProjects.data.getPosts.posts);

            this.updatePostsInMemory(this.filter);
        },
        updateFilterDropdown(value) {
            SearchUtilities.setHomePostFilter(value);
            this.filter = SearchUtilities.getHomePostFilter();

            this.queryPosts(this.filter); //try and avoid the get notifications server call
        },
        // returns whether a post filter type is already loaded in memory (so it doesnt have to re-ask the server)
        postsInMemory(filter) {
            for (let i = 0; i < this.loadedPosts.length; i++) {
                if (this.loadedPosts[i].filter === filter) {
                    return this.loadedPosts[i].posts;
                }
            }
            return null;
        },

        // this will update an old saved post filter with new posts
        updatePostsInMemory(filter) {
            for (let i = 0; i < this.loadedPosts.length; i++) {
                if (this.loadedPosts[i].filter === filter) {
                    this.loadedPosts[i].posts = this.posts;
                    return; // break out of the function
                }
            }
        },

        async queryPosts(filter, forceReload = false) {
            const alreadyLoadedPosts = this.postsInMemory(filter);
            let res = undefined;

            if (alreadyLoadedPosts && !forceReload) {
                // check if the posts were already fetched
                this.posts = alreadyLoadedPosts;
            } else {
                // reset the posts if none for the filter have been fetched (prevents graph from receiving post related values for the other filter)
                this.posts = [];

                // Get the posts
                res = await GraphQLService.fetchPosts(
                    filter,
                    this.posts[this.posts.length-1] ? this.posts[this.posts.length-1].id : 0, // last post id
                    this.posts[this.posts.length-1] ? this.posts[this.posts.length-1].likeAmt : -1, // last unique field (ex: likeAmt)
                    this.$store.getters.accessToken
                );
                // set fetched all value only for the current filter
                this.fetchedAll[this.filter] = res.data.getPosts.fetchedAll;
                
                // pass in the new post data to the home page main components
                this.posts = res.data.getPosts.posts;

                // keep old loaded posts in memory
                this.loadedPosts.push({
                    filter: filter,
                    posts: res.data.getPosts.posts,
                });

                this.loaded = true;
            }
            // if the user is logged in then ask for their notifications
            if (this.$store.getters.accessToken && !this.notifications) {
                res = await GraphQLService.fetchPersonalDetails(
                    this.$store.getters.accessToken,
                    ["notifications {sender message read type }"]
                );
                this.notifications = res.data.getPersonalDetails.notifications;
            }
        },
        async updatePosts() {
            const res = await GraphQLService.fetchPosts(
                this.filter,
                0,
                this.$store.getters.accessToken
            );
            this.posts = res.data.getPosts.posts;
            
            // set fetched all value only for the current filter
            this.fetchedAll[this.filter] = res.data.getPosts.fetchedAll;


            this.loadedPosts.push({
                filter: this.filter,
                posts: res.data.getPosts.posts,
            });
            this.loaded = true;
        },
        async reloadPosts(flag) {
            this.loaded = false;
            // leaving this even tho right now flag is always true, maybe in the future we'll need to propagate a failed attempt
            if (flag) await this.updatePosts();
        },
    },
};
</script>

<style scoped>
.home {
    margin-bottom: 0;
}
</style>

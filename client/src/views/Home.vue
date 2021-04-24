<template>
    <div>
        <div class="home">
            <HomeMobile :projects="posts" v-if="$store.getters.mobile" :fetchedAll="fetchedAll" :postFeedFilter="sortingType" @updateFilterDropdown="updateFilterDropdown" />
            <HomeDesktop
                :projects="posts"
                :notifications="notifications"
                v-if="!$store.getters.mobile"
                :fetchedAll="fetchedAll"
                :postFeedFilter="sortingType"
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
import LoadMoreMixin from "@/mixins/load_more.mixin";

export default {
    data() {
        return {
            loaded: true,
            notifications: undefined,
        };
    },
    async created() {
        this.queryType = "all";
        this.sortingType = SearchUtilities.getHomePostFilter();
        this.getPosts(); // this is from the LoadMore mixin

        SharedMethods.loadPage();

        // get the notifications
        if (this.$store.getters.accessToken) {
            const res = await GraphQLService.getUnreadNotificationsData(this.$store.getters.accessToken);
            this.notifications = res.data.getUnreadNotificationsData;
        } else {
            this.notifications = [];
        }

        /*
        const cache = await caches.open("devsCache");
        cache.match("http://localhost:5000/graphql").then((result) => {
            console.log("[CACHE] ", result.json());
        });
        */
    },

    mixins: [GeneralProperties, LoadMorePosts, LoadMoreMixin],
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

        async reloadPosts(flag) {
            // TODO: this still doesnt work

            this.loaded = false;
            // leaving this even tho right now flag is always true, maybe in the future we'll need to propagate a failed attempt
            if (flag) {
                await this.getPosts();
            }
            this.loaded = true;
        },
    },
};
</script>

<style scoped>
.home {
    margin-bottom: 0;
}
</style>

<template>
    <div>
        <div class="home">
            <HomeMobile
                v-if="$store.getters.mobile"
                @updateFilterDropdown="updateFilterDropdown"
                :loaded="loaded"
            />
            <HomeDesktop
                v-if="!$store.getters.mobile"
                @updateFilterDropdown="updateFilterDropdown"
                :loaded="loaded"
            />
            <NewPost ref="newPostMenu" @updateFeed="updateFeed($event)" />

            <EmailVerificationPopup ref="email_verification" />
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import GeneralProperties from "../mixins/general.mixin";

import HomeMobile from "@/components/Home/HomeMobile.vue";
import HomeDesktop from "@/components/Home/HomeDesktop.vue";
import NewPost from "@/components/NewPost/NewPost.vue";

import LoadMorePosts from "@/mixins/load_more_posts.mixin";
import LoadMoreMixin from "@/mixins/load_more.mixin";

import EmailVerificationPopup from "@/components/Popups/EmailVerificationPopup.vue";

export default {
    data() {
        return {
            loaded: true,
        };
    },
    computed: {
        loggedInState() {
            return !this.$store.getters.isLoggedIn;
        }
    },
    watch: {
        loggedInState: function() {
            this.changeFeedType("all", "Newest");
        }
    },
    mounted() {
        // if the redirect came from the signup page and contains a user_id, bring the email verification popup
        if (this.$route.params.user_id) {

        } else {
            this.$refs.email_verification.open();
        }
    },
    async created() {
        // show a regular post feed if your not logged in
        if (this.$store.getters.isLoggedIn) {
            this.queryType = "targeted";
            this.sortingType = "Newest";
        } else {
            this.queryType = "all";
            this.sortingType = "Newest";
        }
            
        this.getPosts();

        SharedMethods.loadPage();
        
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
        EmailVerificationPopup,
    },
    
    methods: {
        openPostMenu() {
            this.$refs.newPostMenu.open();
        },
        closePostMenu() {
            this.$refs.newPostMenu.close();
        },

        updateFeed(post) {
            /**
             * After creating a new post, we don't want to grab the lastPostId and start fetching from there, we instead want to fetch the latest 3 posts.
             * If we grab the lastPostId this happens:
             *
             * Feed before making a post
             *      post #0
             *      post #1
             *      post #2
             *
             *  POST MADE
             *
             *  Feed after making a post
             *
             *      post #0
             *      post #1
             *      post #2
             *      post #3
             *      post #4
             *      post #5
             *
             *  so, calling this.getPosts is not enough. We can then do:
             *      option 1 --> (CURRENT) clear the already fetched posts (easy but not efficient)
             *      option 2 --> (WHAT I WANT TO DO) create an updateFeedAfterNewPost function in the load_more_mixin and handle everything there by quickly caching the new post (the mutation returns the newly made post) and appending that to this.posts (shift() so it is at index 0)
             *
             */

            this.loaded = false;

            this.updateFeedAfterNewPost(post);

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

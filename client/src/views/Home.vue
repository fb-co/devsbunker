<template>
    <div>
        <div class="home">
            <HomeMobile v-if="$store.getters.mobile" @updateFilterDropdown="updateFilterDropdown" :loaded="loaded" />
            <HomeDesktop v-if="!$store.getters.mobile" @updateFilterDropdown="updateFilterDropdown" :loaded="loaded" />

            <EmailVerificationPopup ref="email_verification" />
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import GeneralProperties from "../mixins/general.mixin";

import HomeMobile from "@/components/Home/HomeMobile.vue";
import HomeDesktop from "@/components/Home/HomeDesktop.vue";

import LoadMorePosts from "@/mixins/load_more_posts.mixin";
import LoadMoreMixin from "@/mixins/load_more.mixin";

import EmailVerificationPopup from "@/components/Popups/EmailVerificationPopup.vue";

export default {
    data() {
        return {
            loaded: true,
        };
    },
    mounted() {
        // if the redirect came from the signup page and contains a user_id, bring the email verification popup
        if (this.$route.params.user_id) {
            let message;

            if (this.$route.params.type === "verify_account") {
                message = "We have sent you an email with a link to verify your account. Please do so to begin using DevsBunker.";
            } else if (this.$route.params.type === "reset_pwd") {
                message = "We have sent you an email with a link to reset your password.";
            }

            this.$refs.email_verification.open(this.$route.params.user_id, message, this.$route.params.type);
        }
    },
    created() {  
        SharedMethods.loadPage();

        // show a regular post feed if your not logged in
        if (this.$store.getters.accessToken) {
            this.queryType = "targeted";
            this.sortingType = "Newest";
        } else {
            this.queryType = "all";
            this.sortingType = "Newest";
        }

        this.getPosts();  
    },

    mixins: [GeneralProperties, LoadMorePosts, LoadMoreMixin],
    components: {
        HomeMobile,
        HomeDesktop,
        EmailVerificationPopup,
    },

    methods: {
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

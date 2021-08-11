<template>
    <div class="profile">
        <!-- We pass in the user object so we dont have to re-query it from the server on every child component -->
        <!-- You also need to wait to wait to render the components until you get a response from the server or else they wont lazy load! -->
        <!-- Weirdly this doesn't work, data here is fetched correctly but the props are undefined -->
        <ProfileMobile v-if="$store.getters.mobile && userObject" :mainUserObject="userObject" />
        <ProfileDesktop v-if="!$store.getters.mobile && userObject" :mainUserObject="userObject" />
        <GeneralError v-if="userObject === false" :error="error" />
    </div>
</template>

<script>
import ProfileMobile from "./mobile/ProfileOwner.vue";
import ProfileDesktop from "./desktop/ProfileOwner.vue";
import GraphQLService from "@/services/graphql.service";
import PostFeedMixin from "@/mixins/load_more.mixin.js";
import SearchUtilities from "@/utils/search_utilities.js";

import GeneralError from "../global/GeneralError.vue";

export default {
    data() {
        return {
            userObject: undefined,
            error: null,
        };
    },
    async created() {
        // get the user object, will be given to all children to avoid excessive calls to the server
        const res = await GraphQLService.fetchPersonalDetails(this.$store.getters.accessToken, [
            "desc",
            "email",
            "profile_pic",
            "followers",
            "following",
            "liked_posts",
            "tag",
            "username",
        ]);
        if (!res.errors) {
            this.userObject = res.data.getPersonalDetails;
        } else {
            this.error = res.errors[0].message;
            this.userObject = false;
        }
    },
    methods: {
        changeTab(value) {
            // this stuff is from the LoadMore mixin
            // setup for the post feed component depending on which tab your in (projects or saved or maybe more in future)
            this.clearPosts();
            this.queryType = value;
            this.sortingType = SearchUtilities.getSavedPostFilter();
            this.getPosts();
        },
    },
    mixins: [PostFeedMixin],
    components: {
        ProfileMobile,
        ProfileDesktop,
        GeneralError,
    },
};
</script>

<style scoped>
.error_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.error {
    margin-top: 10px;
    color: var(--error-red);
    text-align: center;
}
</style>

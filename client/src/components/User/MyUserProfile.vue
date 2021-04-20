<template>
    <div class="profile">
        <!-- We pass in the user object so we dont have to re-query it from the server on every child component -->
        <!-- You also need to wait to wait to render the components until you get a response from the server or else they wont lazy load! -->
        <!-- Weirdly this doesn't work, data here is fetched correctly but the props are undefined -->
        <ProfileMobile 
            v-if="$store.getters.mobile && userObject && userProjects.posts" 
            :mainUserObject="userObject"
        />
        <ProfileDesktop 
            v-if="!$store.getters.mobile && userObject" 
            :mainUserObject="userObject" 
        />
    </div>
</template>

<script>
import ProfileMobile from "./mobile/ProfileOwner.vue";
import ProfileDesktop from "./desktop/ProfileOwner.vue";
import GraphQLService from "@/services/graphql.service";
import PostFeedMixin from "@/mixins/load_more.mixin.js";
import SearchUtilities from "@/utils/search_utilities.js";

export default {
    data() {
        return {
            userObject: undefined,
        };
    },
    async created() {
        // setup for the post feed component
        this.queryType = 'saved';
        this.sortingType = SearchUtilities.getSavedPostFilter();
        this.getPosts(); // this is from the LoadMore mixin 

        // get the user object, will be given to all children to avoid excessive calls to the server
        const res = await GraphQLService.fetchPersonalDetails(
            this.$store.getters.accessToken,
            [
                "desc",
                "email",
                "profile_pic",
                "followers",
                "following",
                "liked_posts",
                "tag",
                "username",
            ]
        );
        this.userObject = res.data.getPersonalDetails;
    },
    mixins: [PostFeedMixin],
    components: {
        ProfileMobile,
        ProfileDesktop,
    },
};
</script>

<style scoped></style>

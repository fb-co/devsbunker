<template>
    <div>
        <ProfileDesktop v-if="userObject && !$store.getters.mobile" :mainUserObject="userObject" />
        <ProfileMobile v-if="userObject && $store.getters.mobile" :mainUserObject="userObject" />
    </div>
</template>

<script>
import GraphQLService from "@/services/graphql.service";
import ProfileDesktop from "./desktop/Profile.vue";
import ProfileMobile from "./mobile/Profile.vue";
import LoadMoreMixin from "@/mixins/load_more.mixin.js";
import SearchUtilities from "@/utils/search_utilities.js";

export default {
    data() {
        return {
            username: "",
            userObject: undefined,
        };
    },
    components: {
        ProfileDesktop,
        ProfileMobile,
    },
    mixins: [LoadMoreMixin],
    async created() {
        this.username = this.$route.params.username;

        // setup for post feed component
        this.otherData.foreignUserToFilter = this.username;
        this.queryType = "projects";
        this.sortingType = SearchUtilities.getSavedPostFilter();
        this.getPosts();

        GraphQLService.fetchUserDetails(this.username, ["tag", "desc", "followerAmt", "followingAmt", "isFollowing"], this.$store.getters.username).then((res) => {
            if (res.data.user === null) {
                this.$router.push("/404"); // eventully this should route the user to a search area for users with a message sayin he user they requested does not exist
            } else {
                this.userObject = res.data.user;
                this.userObject.username = this.username; // add the username to the object so the child component has is
            }
        });
    },
    methods: {
        // have this ready for future uses
        changeTab(value) {
            this.queryType = value;
        },
    },
};
</script>

<style scoped></style>

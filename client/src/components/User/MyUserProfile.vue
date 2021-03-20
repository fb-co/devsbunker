<template>
    <div class="profile">
        <!-- We pass in the user object so we dont have to re-query it from the server on every child component -->
        <!-- You also need to wait to wait to render the components until you get a response from the server or else they wont lazy load! -->
        <!-- Weirdly this doesn't work, data here is fetched correctly but the props are undefined -->
        <ProfileMobile v-if="$store.getters.mobile && userObject && userProjects.posts" :mainUserObject="userObject" :mainUserProjects="userProjects" />
        <ProfileDesktop v-if="!$store.getters.mobile && userObject" :mainUserObject="userObject" :mainUserProjects="userProjects" />
    </div>
</template>

<script>
import ProfileMobile from "./mobile/ProfileOwner.vue";
import ProfileDesktop from "./desktop/ProfileOwner.vue";
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            userObject: undefined,
            userProjects: {
                posts: [],
                fetchedAll: false,
            },
        };
    },
    async created() {
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

        // if the user is logged out their token will be undefined anyway
        const posts = await GraphQLService.fetchPostsByAuthor(
            this.$store.getters.username,
            this.userProjects.posts.length > 0
                ? this.userProjects.posts[this.userProjects.posts.length - 1].id
                : 0,
            this.$store.getters.accessToken
        );
        this.userProjects.posts = posts.data.getPostsByAuthor.posts;
        this.userProjects.lastPostId = posts.data.getPostsByAuthor.lastPostId;
        this.userProjects.fetchedAll = posts.data.getPostsByAuthor.fetchedAll;
        console.log("parent-parent", this.userProjects);
    },
    methods: {
        async loadNewPersonalPosts() {
            // if the user is logged out their token will be undefined anyway
            const posts = await GraphQLService.fetchPostsByAuthor(
                this.$store.getters.username,
                this.userProjects.posts.length > 0
                    ? this.userProjects.posts[
                          this.userProjects.posts.length - 1
                      ].id
                    : 0,
                this.$store.getters.accessToken
            );
            this.userProjects.posts = this.userProjects.posts.concat(
                posts.data.getPostsByAuthor.posts
            );
            this.userProjects.lastPostId =
                posts.data.getPostsByAuthor.lastPostId;
            this.userProjects.fetchedAll =
                posts.data.getPostsByAuthor.fetchedAll;
        },
    },
    components: {
        ProfileMobile,
        ProfileDesktop,
    },
};
</script>

<style scoped></style>

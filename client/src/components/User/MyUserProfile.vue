<template>
    <div class="profile">
        <!-- We pass in the user object so we dont have to re-query it from the server on every child component -->
        <!-- You also need to wait to wait to render the components until you get a response from the server or else they wont lazy load! -->
        <ProfileMobile v-if="$store.getters.mobile && userObject && userProjects" :mainUserObject="userObject" :mainUserProjects="userProjects" />
        <ProfileDesktop v-if="!$store.getters.mobile && userObject && userProjects" :mainUserObject="userObject" :mainUserProjects="userProjects" />
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
                lastPostId: 0,
                fetchedAll: false
            },
        };
    },
    created() {
        // get the user object, will be given to all children to avoid excessive calls to the server
        GraphQLService.fetchPersonalDetails(this.$store.getters.accessToken, [
            "desc",
            "email",
            "profile_pic",
            "followers",
            "following",
            "liked_posts",
            "tag",
            "username"
        ]).then((res) => {
            if (res.errors) {
                console.error("Error while fetching user details.");
            } else {
                this.userObject = res.data.getPersonalDetails;
            }
        });

        // if the user is logged out their token will be undefined anyway
        GraphQLService.fetchPostsByAuthor(
            this.$store.getters.username,
            this.userProjects.lastPostId,
            this.$store.getters.accessToken,
        ).then((posts) => {
            this.userProjects.posts = posts.data.getPostsByAuthor.posts;
            this.userProjects.lastPostId = posts.data.getPostsByAuthor.lastPostId;
            this.userProjects.fetchedAll = posts.data.getPostsByAuthor.fetchedAll;
        });
    },
    methods: {
        loadNewPersonalPosts() {
            // if the user is logged out their token will be undefined anyway
            GraphQLService.fetchPostsByAuthor(
                this.$store.getters.username,
                this.userProjects.lastPostId,
                this.$store.getters.accessToken,
            ).then((posts) => {
                this.userProjects.posts = this.userProjects.posts.concat(posts.data.getPostsByAuthor.posts);
                this.userProjects.lastPostId = posts.data.getPostsByAuthor.lastPostId;
                this.userProjects.fetchedAll = posts.data.getPostsByAuthor.fetchedAll;
            });
        }
    },
    components: {
        ProfileMobile,
        ProfileDesktop,
    },
};
</script>

<style scoped></style>

<template>
    <div>
        <ProfileDesktop v-if="userObject && !$store.getters.mobile" :mainUserObject="userObject" :mainUserProjects="userProjects" />
        <ProfileMobile v-if="userObject && $store.getters.mobile" :mainUserObject="userObject" :mainUserProjects="userProjects" />
    </div>
</template>

<script>
import GraphQLService from "@/services/graphql.service";
import ProfileDesktop from "./desktop/Profile.vue";
import ProfileMobile from "./mobile/Profile.vue";
import SearchUtilities from "@/utils/search_utilities.js";

export default {
    data() {
        return {
            username: "",
            userObject: undefined,
            userProjects: {
                posts: [],
                lastPostId: 0,
                fetchedAll: false,
            },
        };
    },
    components: {
        ProfileDesktop,
        ProfileMobile,
    },
    async created() {
        this.username = this.$route.params.username;

        GraphQLService.fetchUserDetails(
            this.username,
            ["tag", "desc", "followerAmt", "followingAmt", "isFollowing"],
            this.$store.getters.username
        ).then((res) => {
            if (res.data.user === null) {
                this.$router.push("/"); // eventully this should route the user to a search area for users with a message sayin he user they requested does not exist
            } else {
                this.userObject = res.data.user;
                this.userObject.username = this.username; // add the username to the object so the child component has is
            }
        });

        // get the users projects
        GraphQLService.fetchPostsByAuthor(
            this.username,
            this.userProjects.lastPostId,
            SearchUtilities.getSavedPostFilter(),
            -1,
            this.$store.getters.accessToken
        )
            .then((posts) => {
                if (posts) {
                    this.userProjects.posts = posts.data.getPostsByAuthor.posts;
                    this.userProjects.lastPostId =
                        posts.data.getPostsByAuthor.lastPostId;
                    this.userProjects.fetchedAll =
                        posts.data.getPostsByAuthor.fetchedAll;
                } else {
                    console.error("Can't get posts!");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    },
    methods: {
        loadNewPersonalPosts() {
            // if the user is logged out their token will be undefined anyway
            GraphQLService.fetchPostsByAuthor(
                this.username,
                this.userProjects.posts.length > 0
                    ? this.userProjects.posts[
                          this.userProjects.posts.length - 1
                      ].id
                    : 0,
                SearchUtilities.getSavedPostFilter(),
                this.userProjects.posts.length > 0
                    ? this.userProjects.posts[
                          this.userProjects.posts.length - 1
                      ].likeAmt
                    : -1,

                this.$store.getters.accessToken
            ).then((posts) => {
                if (posts) {
                    this.userProjects.posts = this.userProjects.posts.concat(
                        posts.data.getPostsByAuthor.posts
                    );
                    this.userProjects.lastPostId =
                        posts.data.getPostsByAuthor.lastPostId;
                    this.userProjects.fetchedAll =
                        posts.data.getPostsByAuthor.fetchedAll;
                } else {
                    console.error("Can't get posts!");
                }
            });
        },
    },
};
</script>

<style scoped>
</style>


<template>
    <div class="profile">
        <!-- We pass in the user object so we dont have to re-query it from the server on every child component -->
        <!-- You also need to wait to wait to render the components until you get a response from the server or else they wont lazy load! -->
        <!-- Weirdly this doesn't work, data here is fetched correctly but the props are undefined -->
        <ProfileMobile 
            v-if="$store.getters.mobile && userObject && userProjects.posts" 
            :mainUserObject="userObject" 
            :mainUserProjects="userProjects" 
        />
        <ProfileDesktop 
            @updateFilter="updateFilter" 
            v-if="!$store.getters.mobile && userObject" 
            :mainUserObject="userObject" 
            :mainUserProjects="userProjects" 
        />
    </div>
</template>

<script>
import ProfileMobile from "./mobile/ProfileOwner.vue";
import ProfileDesktop from "./desktop/ProfileOwner.vue";
import GraphQLService from "@/services/graphql.service";
import SearchUtilities from "@/utils/search_utilities.js";

export default {
    data() {
        return {
            userObject: undefined,
            userProjects: {
                posts: [],
                fetchedAll: false,
            },
            loadedUserProjects: [],
            filter: SearchUtilities.getSavedPostFilter()
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

        // get the posts
        await this.getInitialPosts();
    },
    methods: {
        // use this to query a post filter for the first time, NOT for if you want to load more with the preexisting filter
        async getInitialPosts() {
            const potentialPosts = this.postsInMemory(this.filter);
            if (potentialPosts) {
                this.userProjects.posts = potentialPosts.posts;
                this.userProjects.fetchedAll = potentialPosts.fetchedAll;
            } else {
                // if the user is logged out their token will be undefined anyway
                const posts = await GraphQLService.fetchPostsByAuthor(
                    this.$store.getters.username,
                    0, // zero since your fetching the initial posts
                    this.filter,
                    -1, // last unique field is negative one since this is for initial posts
                    this.$store.getters.accessToken
                );

                // update the user posts to render
                this.userProjects.posts = posts.data.getPostsByAuthor.posts;
                this.userProjects.fetchedAll = posts.data.getPostsByAuthor.fetchedAll;

                // add the posts and filter to memory for filter changes
                this.addOrUpdateSearchResultsInMemory(posts.data.getPostsByAuthor);
            }
        },
        async loadNewPersonalPosts() {
            // if the user is logged out their token will be undefined anyway
            const posts = await GraphQLService.fetchPostsByAuthor(
                this.$store.getters.username,
                this.userProjects.posts.length > 0 ? this.userProjects.posts[this.userProjects.posts.length - 1].id : 0,
                this.filter,
                this.userProjects.posts.length > 0 ? this.userProjects.posts[this.userProjects.posts.length - 1].likeAmt : -1, // last unique field
                this.$store.getters.accessToken
            );
            this.userProjects.posts = this.userProjects.posts.concat(posts.data.getPostsByAuthor.posts);
            this.userProjects.fetchedAll = posts.data.getPostsByAuthor.fetchedAll;

            // update the posts in memory to have the new ones
            this.addOrUpdateSearchResultsInMemory(this.userProjects);
        },
        async updateFilter(value) {
            this.filter = value;
            SearchUtilities.setSavedPostFilter(value);

            await this.getInitialPosts();
        },
        addOrUpdateSearchResultsInMemory(projectsObj) {
            // stores the filter and the PROJECTS OBJECT, not the projects list
            const objToAdd = {
                projectsObj: projectsObj,
                filter: this.filter
            };

            for (let i = 0; i < this.loadedUserProjects.length; i++) {
                if (this.loadedUserProjects[i].filter == this.filter) {
                    // if the filter is already registered than update it
                    this.loadedUserProjects[i].projectsObj.posts = objToAdd.projectsObj.posts;
                    this.loadedUserProjects[i].projectsObj.fetchedAll = objToAdd.projectsObj.fetchedAll;
                    return; // break aout to avoid adding the same filter entry
                }
            }
            this.loadedUserProjects.push(objToAdd);
        },

        // checks and returns if a certain filter is already in memory (returns the userObj withought the wrapper)
        postsInMemory(filter) {
            for (let i = 0; i < this.loadedUserProjects.length; i++) {
                if (this.loadedUserProjects[i].filter == filter) {
                    return this.loadedUserProjects[i].projectsObj;
                }
            }
        }
    },
    components: {
        ProfileMobile,
        ProfileDesktop,
    },
};
</script>

<style scoped></style>

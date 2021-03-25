<template>
    <div class="profile">
        <!-- We pass in the user object so we dont have to re-query it from the server on every child component -->
        <!-- You also need to wait to wait to render the components until you get a response from the server or else they wont lazy load! -->
        <!-- Weirdly this doesn't work, data here is fetched correctly but the props are undefined -->
        <ProfileMobile 
            @updateFilter="updateFilter"
            v-if="$store.getters.mobile && userObject && userProjects.posts" 
            :mainUserObject="userObject"
            :savedUserProjects="savedProjects" 
            :mainUserProjects="userProjects" 
        />
        <ProfileDesktop 
            @updateFilter="updateFilter" 
            v-if="!$store.getters.mobile && userObject" 
            :mainUserObject="userObject" 
            :savedUserProjects="savedProjects" 
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
            savedProjects: {
                posts: [],
                fetchedAll: false
            },
            loadedSavedProjects: [],
            loadedUserProjects: [],
            filter: SearchUtilities.getSavedPostFilter(),
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

        await this.getInitialSavedPosts();
    },
    methods: {
        // use this to query a post filter for the first time, NOT for if you want to load more with the preexisting filter
        // GETS THE CURRENT USERS POSTS
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
        async getInitialSavedPosts() {
            const potentialPosts = this.savedPostsInMemory(this.filter);
            if (potentialPosts) {
                this.savedProjects.posts = potentialPosts.posts;
                this.savedProjects.fetchedAll = potentialPosts.fetchedAll;
            } else {
                const posts = await GraphQLService.fetchSavedPosts(
                    0, // zero as last post id since its the initialy posts
                    this.filter, 
                    -1, // -1 as lastUniquefield since its the initialy posts
                    this.$store.getters.accessToken
                );

                this.savedProjects.posts = posts.data.getSavedPosts.posts;
                this.savedProjects.fetchedAll = posts.data.getSavedPosts.fetchedAll;

                // add the fetched posts and filter to memory
                this.addOrUpdateSavedPostsInMemory(posts.data.getSavedPosts);
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
        async loadNewSavedPosts() {
            const posts = await GraphQLService.fetchSavedPosts(
                this.savedProjects.posts.length > 0 ? this.savedProjects.posts[this.savedProjects.posts.length-1].id : 0, 
                this.filter,
                this.savedProjects.posts.length > 0 ? this.savedProjects.posts[this.savedProjects.posts.length-1].likeAmt : -1,
                this.$store.getters.accessToken
            );

            this.savedProjects.posts = this.savedProjects.posts.concat(posts.data.getSavedPosts.posts);
            this.savedProjects.fetchedAll = posts.data.getSavedPosts.fetchedAll;

            // update the filter and posts already in memory
            this.addOrUpdateSavedPostsInMemory(this.savedProjects);
        },
        async updateFilter(value) {
            this.filter = value;
            SearchUtilities.setSavedPostFilter(value);

            await this.getInitialPosts();
            await this.getInitialSavedPosts();
        },
        // I know this is a really long function name, shuddup
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

        addOrUpdateSavedPostsInMemory(projectsObj) {
            const objToAdd = {
                projectsObj: projectsObj,
                filter: this.filter
            };

            for (let i = 0; i < this.loadedSavedProjects.length; i++) {
                if (this.loadedSavedProjects[i].filter == this.filter) {
                    this.loadedSavedProjects[i].projectsObj.posts = objToAdd.projectsObj.posts;
                    this.loadedSavedProjects[i].projectsObj.fetchedAll = objToAdd.projectsObj.fetchedAll;
                    return;
                }
            }
            this.loadedSavedProjects.push(objToAdd);
        },

        // checks and returns if a certain filter is already in memory (returns the userObj withought the wrapper)
        postsInMemory(filter) {
            for (let i = 0; i < this.loadedUserProjects.length; i++) {
                if (this.loadedUserProjects[i].filter == filter) {
                    return this.loadedUserProjects[i].projectsObj;
                }
            }
        },
        // get saved posts and the corresponding filter in memory
        savedPostsInMemory(filter) {
            for (let i = 0; i < this.loadedSavedProjects.length; i++) {
                if (this.loadedSavedProjects[i].filter == filter) {
                    return this.loadedSavedProjects[i].projectsObj;
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

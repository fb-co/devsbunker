// THIS MIXIN GOES TO ANY ROOT COMPONENT WHICH HAS SOME CHILD REFERENCING IT FROM A LOADMORE COMPONENT
// This mixin also goes hand and hand with the LoadMorePosts component

// the only thing you need to do in the root component is set the queryType to what type you want:
// 'all' -> gets all posts
// 'saved' -> gets your saved posts
// 'myProjects' -> gets your projects, or projects of someone else

import GraphQLService from "@/services/graphql.service";
import SearchUtilities from "../utils/search_utilities.js";

const LoadMore = {
    data() {
        return {
            // variables
            posts: [], // array of all posts meant to be currently shown
            postsInMemory: [], // array of objects not posts
            sortingType: null,
            fetchedAll: false,
            otherData: {}, // add any other data the mixing might need for a specific case here
            
            // queryType is what we talked about about queryTypes ('all' -> gets all posts, 'saved' -> gets only saved, etc)
            queryType: undefined
        }
    },  
    methods: {
        /*
            * you can also specify a filter to force it query with the given filter instead of the local data
            * clearCurrent if given as true will clear the current post feed, usually used for things like switching filters (NOT FOR LOADING MORE OBV)
        */
        async getPosts(filter) {
            if (this.queryType === 'all') {
                const res = await GraphQLService.fetchPosts(
                    filter || this.sortingType, 
                    this.getLastPostId(), 
                    this.getLastPostUniqueField(), 
                    this.$store.getters.accessToken
                );
                this.posts = this.posts.concat(res.data.getPosts.posts);
                this.fetchedAll = res.data.getPosts.fetchedAll;
            } else if (this.queryType === "projects") {
                const res = await GraphQLService.fetchPostsByAuthor(
                    this.otherData.foreignUserToFilter || this.$store.getters.username,
                    this.getLastPostId(),
                    this.getLastPostUniqueField(),
                    this.filter || this.sortingType,
                    this.$store.getters.accessToken
                );
                this.posts = this.posts.concat(res.data.getPostsByAuthor.posts);
                this.fetchedAll = res.data.getPostsByAuthor.fetchedAll;
            } else if (this.queryType === "saved") {
                const res = await GraphQLService.fetchSavedPosts(
                    this.getLastPostId(), 
                    this.getLastPostUniqueField(), 
                    filter || this.sortingType, 
                    this.$store.getters.accessToken
                );
                this.posts = this.posts.concat(res.data.getSavedPosts.posts);
                this.fetchedAll = res.data.getSavedPosts.fetchedAll;
            }
        },
        updateFilterDropdown(value) {
            this.posts = [];
            
            // update and get the approprate filter in localstorage
            // also, for now were going to use the same localStorage variable as saved for the projects tab
            switch (this.queryType) {
                case "all": 
                    SearchUtilities.setHomePostFilter(value);
                    this.sortingType = SearchUtilities.getHomePostFilter();
                    break;
                case "saved":
                    SearchUtilities.setSavedPostFilter(value);
                    this.sortingType = SearchUtilities.getSavedPostFilter();
                    break;
                case "projects":
                    SearchUtilities.setSavedPostFilter(value);
                    this.sortingType = SearchUtilities.getSavedPostFilter();
            }
            
            this.getPosts(value);
        },

        // misc functions
        getLastPostId() {
            return this.posts.length > 0 ? this.posts[this.posts.length - 1].id : 0;
        },
        getLastPostUniqueField() {
            return this.posts.length > 0 ? this.posts[this.posts.length - 1].likeAmt : -1;
        },
        clearPosts() {
            this.posts = [];
        }
    }
};

export default LoadMore;
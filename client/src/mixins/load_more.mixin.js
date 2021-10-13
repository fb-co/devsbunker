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
            awaitingPosts: false,
            sortingType: null,
            fetchedAll: false,
            otherData: {}, // add any other data the mixing might need for a specific case here

            // queryType is what we talked about about queryTypes ('all' -> gets all posts, 'saved' -> gets only saved, etc)
            queryType: undefined,
        };
    },
    methods: {
        /*
         * you can also specify a filter to force it query with the given filter instead of the local data
         * clearCurrent if given as true will clear the current post feed, usually used for things like switching filters (NOT FOR LOADING MORE OBV)
         * Force new will ignore cache and get new from server (mainly used for the load more option) 
        */
        async getPosts(filter) {
            this.awaitingPosts = true; // set loading flag to true
            const alreadyLoadedPosts = this.$store.getters.getPosts(
                filter || this.sortingType, 
                this.queryType, 
                this.otherData,
            );
            
            if (alreadyLoadedPosts) {
                this.posts = alreadyLoadedPosts.posts;
                this.fetchedAll = alreadyLoadedPosts.fetchedAll;

                // set loading flag to false 
                this.awaitingPosts = false;
            } else {
                if (this.queryType === "all") {
                    const res = await GraphQLService.fetchPosts(
                        filter || this.sortingType,
                        this.getLastPostId(),
                        this.getLastPostUniqueField(),
                        this.$store.getters.accessToken
                    );
            
                    if (!res.errors) {
                        this.posts = this.posts.concat(res.data.getPosts.posts);
                        this.fetchedAll = res.data.getPosts.fetchedAll;
                        
                        this.$store.dispatch("addPosts", {
                            filter: filter || this.sortingType,
                            queryType: this.queryType,
                            fetchedAll: this.fetchedAll,
                            otherData: this.otherData,
                            posts: this.posts,
                        });
                    } else {
                        this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: res.errors[0].message });
                    }
                } else if (this.queryType === "projects") {
                    const res = await GraphQLService.fetchPostsByAuthor(
                        this.otherData.foreignUserToFilter || this.$store.getters.username,
                        this.getLastPostId(),
                        this.getLastPostUniqueField(),
                        this.filter || this.sortingType,
                        this.$store.getters.accessToken
                    );

                    if (!res.errors) {
                        this.posts = this.posts.concat(res.data.getPostsByAuthor.posts);
                        this.fetchedAll = res.data.getPostsByAuthor.fetchedAll;

                        this.$store.dispatch("addPosts", {
                            filter: filter || this.sortingType,
                            queryType: this.queryType,
                            fetchedAll: this.fetchedAll,
                            otherData: this.otherData,
                            posts: this.posts,
                        });
                    } else {
                        this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: res.errors[0].message });
                    }
                } else if (this.queryType === "saved") {
                    const res = await GraphQLService.fetchSavedPosts(
                        this.getLastPostId(),
                        this.getLastPostUniqueField(),
                        filter || this.sortingType,
                        this.$store.getters.accessToken
                    );
                    if (!res.errors) {
                        this.posts = this.posts.concat(res.data.getSavedPosts.posts);
                        this.fetchedAll = res.data.getSavedPosts.fetchedAll;

                        this.$store.dispatch("addPosts", {
                            filter: filter || this.sortingType,
                            queryType: this.queryType,
                            fetchedAll: this.fetchedAll,
                            otherData: this.otherData,
                            posts: this.posts,
                        });
                    } else {
                        this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: res.errors[0].message });
                    }
                } else if (this.queryType === "targeted") {
                    const res = await GraphQLService.fetchTargetedPosts(
                        this.getLastPostId(),
                        this.getLastPostUniqueField(),
                        this.$store.getters.accessToken
                    );
                    
                    if (!res.errors) {
                        this.posts = this.posts.concat(res.data.getTargetedPosts.posts);
                        this.fetchedAll = res.data.getTargetedPosts.fetchedAll;
                        
                        this.$store.dispatch("addPosts", {
                            filter: "Newest",
                            queryType: this.queryType,
                            fetchedAll: this.fetchedAll,
                            otherData: this.otherData,
                            posts: this.posts,
                        });
                    } else {
                        this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: res.errors[0].message });
                    }
                }
                // set loading flag to false 
                this.awaitingPosts = false;
            }
        },
        async loadNewPosts(filter) {
            if (this.queryType === "all") {
                const res = await GraphQLService.fetchPosts(
                    filter || this.sortingType,
                    this.getLastPostId(),
                    this.getLastPostUniqueField(),
                    this.$store.getters.accessToken
                );
                if (!res.errors) {
                    this.posts = this.posts.concat(res.data.getPosts.posts);
                    this.fetchedAll = res.data.getPosts.fetchedAll;

                    this.$store.dispatch("addPosts", {
                        filter: filter || this.sortingType,
                        queryType: this.queryType,
                        fetchedAll: this.fetchedAll,
                        otherData: this.otherData,
                        posts: this.posts,
                    });
                } else {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: res.errors[0].message });
                }
            } else if (this.queryType === "projects") {
                const res = await GraphQLService.fetchPostsByAuthor(
                    this.otherData.foreignUserToFilter || this.$store.getters.username,
                    this.getLastPostId(),
                    this.getLastPostUniqueField(),
                    this.filter || this.sortingType,
                    this.$store.getters.accessToken
                );
                if (!res.errors) {
                    this.posts = this.posts.concat(res.data.getPostsByAuthor.posts);
                    this.fetchedAll = res.data.getPostsByAuthor.fetchedAll;

                    this.$store.dispatch("addPosts", {
                        filter: filter || this.sortingType,
                        queryType: this.queryType,
                        fetchedAll: this.fetchedAll,
                        otherData: this.otherData,
                        posts: this.posts,
                    });
                } else {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: res.errors[0].message });
                }
            } else if (this.queryType === "saved") {
                const res = await GraphQLService.fetchSavedPosts(
                    this.getLastPostId(),
                    this.getLastPostUniqueField(),
                    filter || this.sortingType,
                    this.$store.getters.accessToken
                );
                if (!res.errors) {
                    this.posts = this.posts.concat(res.data.getSavedPosts.posts);
                    this.fetchedAll = res.data.getSavedPosts.fetchedAll;

                    this.$store.dispatch("addPosts", {
                        filter: filter || this.sortingType,
                        queryType: this.queryType,
                        fetchedAll: this.fetchedAll,
                        otherData: this.otherData,
                        posts: this.posts,
                    });
                } else {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: res.errors[0].message });
                }
            } else if (this.queryType === "targeted") {
                const res = await GraphQLService.fetchTargetedPosts(
                    this.getLastPostId(),
                    this.getLastPostUniqueField(),
                    this.$store.getters.accessToken
                );
                if (!res.errors) {
                    this.posts = this.posts.concat(res.data.getTargetedPosts.posts);
                    this.fetchedAll = res.data.getTargetedPosts.fetchedAll;
                    
                    this.$store.dispatch("addPosts", {
                        filter: "Newest",
                        queryType: this.queryType,
                        fetchedAll: this.fetchedAll,
                        otherData: this.otherData,
                        posts: this.posts,
                    });
                } else {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: res.errors[0].message });
                }
            }
        },
        async updateFeedAfterNewPost(post) {
            this.posts.unshift(post);
        },
        async updateFilterDropdown(value) {
            this.posts = [];

            // update and get the approprate filter in localstorage
            // also, for now were going to use the same localStorage variable as saved for the projects tab
            switch (this.queryType) {
                case "all":
                    SearchUtilities.setExplorePostFilter(value);
                    this.sortingType = SearchUtilities.getExplorePostFilter();
                    break;
                case "saved":
                    SearchUtilities.setSavedPostFilter(value);
                    this.sortingType = SearchUtilities.getSavedPostFilter();
                    break;
                case "projects":
                    SearchUtilities.setSavedPostFilter(value);
                    this.sortingType = SearchUtilities.getSavedPostFilter();
            }
            
            await this.getPosts(value);
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
        },
        changeFeedType(queryType, sortingType) {
            this.clearPosts();

            this.queryType = queryType;
            this.sortingType = sortingType;

            this.getPosts();
        }
    },
};

export default LoadMore;

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
            
            // queryType is what we talked about about queryTypes ('all' -> gets all posts, 'saved' -> gets only saved, etc)
            queryType: undefined
        }
    },  
    methods: {
        // a swtich block wont work here because we need a lexical declaration 
        async getPosts() {
            if (this.queryType === 'all') {
                const res = await GraphQLService.fetchPosts(
                    this.sortingType, 
                    this.getLastPostId(), 
                    this.getLastPostUniqueField(), 
                    this.$store.getters.accessToken
                );
                this.posts = res.data.getPosts.posts;
                this.fetchedAll = res.data.getPosts.fetchedAll;
            }
        },
        updateFilterDropdown(value) {
            SearchUtilities.setHomePostFilter(value);
            this.sortingType = SearchUtilities.getHomePostFilter();
        },

        // misc functions
        getLastPostId() {
            return this.posts.length > 0 ? this.posts[this.posts.length - 1].id : 0;
        },
        getLastPostUniqueField() {
            return this.posts.length > 0 ? this.posts[this.posts.length - 1].likeAmt : -1;
        }
    }
};

export default LoadMore;
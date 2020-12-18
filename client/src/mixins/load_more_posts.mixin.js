import GraphQLService from "@/services/graphql.service";

// takes an array of all the already fetched posts, and the users accessToken (optional), and will fetch another 15-20 posts
const loadMorePosts = {
    methods: {
        load: async function(already_fetched_posts, token) {
            return GraphQLService.loadMorePosts(already_fetched_posts, token);
        }
    }
};

export default loadMorePosts;
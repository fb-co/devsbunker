import GraphQLService from "@/services/graphql.service";

// takes an array of all the already fetched posts, and the users accessToken (optional), and will fetch another 15-20 posts
const loadMorePosts = {
    methods: {
        load: async function(filter, last_post_id, lastUniqueField, token) {
            return GraphQLService.fetchPosts(filter, last_post_id, lastUniqueField, token);
        }
    }
};

export default loadMorePosts;
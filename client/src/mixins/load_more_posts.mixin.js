import GraphQLPostsService from "@/services/graphql/gql.posts.service.js";

// takes an array of all the already fetched posts, and the users accessToken (optional), and will fetch another 15-20 posts
const loadMorePosts = {
    methods: {
        load: async function (filter, last_post_id, lastUniqueField, token) {
            return GraphQLPostsService.fetchPosts(filter, last_post_id, lastUniqueField, token);
        },
    },
};

export default loadMorePosts;

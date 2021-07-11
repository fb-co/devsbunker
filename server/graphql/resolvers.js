import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge;

// user
import UserResolvers from "./user/resolvers/user.account.js";

// posts
import PostsResolvers from "./posts/resolvers/users.posts.js";

const resolvers = [UserResolvers, PostsResolvers];

export default mergeResolvers(resolvers);

import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge; // keeping merge for future resolvers

// user
import userResolvers from "./user/resolvers/user.account.js";

// posts
import postsResolvers from "./posts/resolvers/users.posts.js";

const resolvers = [userResolvers, postsResolvers];

export default mergeResolvers(resolvers);

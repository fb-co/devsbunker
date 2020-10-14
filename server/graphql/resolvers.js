import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge; // keeping merge for future resolvers

// user
import userResolvers from './user/resolvers/user.account.js';

const resolvers = [
    userResolvers
];

export default mergeResolvers(resolvers);

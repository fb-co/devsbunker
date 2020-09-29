import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge;

import usersResolvers from "./user/resolvers/users.js";
import signupResolvers from "./user/resolvers/signup.js";

const UserResolversArray = [usersResolvers, signupResolvers];

export default mergeResolvers(UserResolversArray);

import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge;

import usersResolvers from "./user/resolvers/users.js";
import signupResolvers from "./user/resolvers/signup.js";

import aboutResolvers from "./about/resolvers/about.page.js";

const UserResolversArray = [usersResolvers, signupResolvers, aboutResolvers];

export default mergeResolvers(UserResolversArray);

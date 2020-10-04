import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge;

// user
import usersResolvers from "./user/resolvers/users.js";
import signupResolvers from "./user/resolvers/signup.js";
import loginResolvers from "./user/resolvers/login.js";

// miscellaneous
import aboutResolvers from "./about/resolvers/about.page.js";

const UserResolversArray = [usersResolvers, signupResolvers, loginResolvers];
const miscellaneousResolversArray = [aboutResolvers];

const resolvers = UserResolversArray.concat(miscellaneousResolversArray);

export default mergeResolvers(resolvers);

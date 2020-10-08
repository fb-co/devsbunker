import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge;

// user
import usersResolvers from "./user/resolvers/users.js";
import signupResolvers from "./user/resolvers/signup.js";
import loginResolvers from "./user/resolvers/login.js";
import logoutResolvers from "./user/resolvers/logout.js";

// miscellaneous
import aboutResolvers from "./about/resolvers/about.page.js";
import homeResolvers from "./home/resolvers/home.page.js";

const UserResolversArray = [
    usersResolvers,
    signupResolvers,
    loginResolvers,
    logoutResolvers,
];
const miscellaneousResolversArray = [aboutResolvers, homeResolvers];

const resolvers = UserResolversArray.concat(miscellaneousResolversArray);

export default mergeResolvers(resolvers);

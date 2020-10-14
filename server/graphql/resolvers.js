import merge from "@graphql-tools/merge";
const { mergeResolvers } = merge;

// user
import usersResolvers from "./user/resolvers/users.js";
import signupResolvers from "./user/resolvers/signup.js";
import loginResolvers from "./user/resolvers/login.js";
import logoutResolvers from "./user/resolvers/logout.js";
import sessionRevoker from "./user/resolvers/revoke.session.js";


const UserResolversArray = [
    usersResolvers,
    signupResolvers,
    loginResolvers,
    logoutResolvers,
    sessionRevoker,
];


export default mergeResolvers(UserResolversArray);

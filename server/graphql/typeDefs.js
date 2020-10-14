import merge from "@graphql-tools/merge";
const { mergeTypeDefs } = merge;

// user
import user from "./user/types/fetchable.user.js";
import signup from "./user/types/signup.user.response.js";
import login from "./user/types/login.user.response.js";
import logout from "./user/types/logout.user.response.js";
import revokeUserSession from "./user/types/revoke.user.session.js";


const UserTypesArray = [user, signup, login, logout, revokeUserSession];

export default mergeTypeDefs(UserTypesArray);

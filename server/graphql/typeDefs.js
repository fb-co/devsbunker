import merge from "@graphql-tools/merge";
const { mergeTypeDefs } = merge;

// user
import user from "./user/types/fetchable.user.js";
import signup from "./user/types/signup.user.response.js";
import login from "./user/types/login.user.response.js";
import logout from "./user/types/logout.user.response.js";
import revokeUserSession from "./user/types/revoke.user.session.js";

// miscellaneous
import about from "./about/types/about.page.js";
import home from "./home/types/home.page.js";

const miscellaneous = [about, home];
const UserTypesArray = [user, signup, login, logout, revokeUserSession];

const types = UserTypesArray.concat(miscellaneous);

export default mergeTypeDefs(types);

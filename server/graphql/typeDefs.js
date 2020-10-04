import merge from "@graphql-tools/merge";
const { mergeTypeDefs } = merge;

// user
import user from "./user/types/fetchable.user.js";
import signup from "./user/types/signup.user.response.js";
import login from "./user/types/login.user.response.js";

// miscellaneous
import about from "./about/types/about.page.js";

const miscellaneous = [about];
const UserTypesArray = [user, signup, login];

const types = UserTypesArray.concat(miscellaneous);

export default mergeTypeDefs(types);

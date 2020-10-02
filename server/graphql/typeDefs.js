import merge from "@graphql-tools/merge";
const { mergeTypeDefs } = merge;

import user from "./user/types/fetchable.user.js";
import signup from "./user/types/signup.user.response.js";

import about from "./about/types/about.page.js";

const UserTypesArray = [user, signup, about];

export default mergeTypeDefs(UserTypesArray);

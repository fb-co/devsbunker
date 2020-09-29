import merge from "@graphql-tools/merge";
const { mergeTypeDefs } = merge;

import user from "./user/types/fetchableUser.js";
import signup from "./user/types/signupUserResponse.js";

const UserTypesArray = [user, signup];

export default mergeTypeDefs(UserTypesArray);

import merge from "@graphql-tools/merge";
const { mergeTypeDefs } = merge; // keeping merge for future types

// user
import UserAccountTypes from './user/types/user.account.responses.js';

const types = [UserAccountTypes];

export default mergeTypeDefs(types);

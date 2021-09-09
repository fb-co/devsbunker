import { mergeTypeDefs } from "@graphql-tools/merge";

// user
import UserAccountTypes from "./user/types/user.account.responses.js";

// posts
import PostsTypes from "./posts/types/post.types.js";

const types = [UserAccountTypes, PostsTypes];

export default mergeTypeDefs(types);

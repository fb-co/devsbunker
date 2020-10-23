import getUserPost from "../utils/getUserPost.js";
export default {
    Query: {
        userPost: function (_, args, { res }) {
            return getUserPost(args.postTitle, args.postAuthor);
        },
    },
};

import getUserPost from "../utils/getUserPost.js";
import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

import Posts from "../../../components/post/post.model.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/

export default {
    Query: {
        userPost: function (_, args, { res }) {
            return getUserPost(args.postTitle, args.postAuthor);
        },
    },

    Mutation: {
        makePost: async function (_, args, { res }) {
            const { payload } = args;
            const jwtPayload = TokenHandler.verifyAccessToken(args.token);

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            const post = new Posts({
                title: payload.title,
                author: jwtPayload.username,
                description: payload.description,
                thumbnail: payload.thumbnail,
                githubLink: payload.githubLink,
                otherLink: payload.otherLink,
                bunkerTag: payload.bunkerTag,
                clip: payload.clip,
            });

            try {
                await post.save();

                return {
                    id: post._id,
                    title: post.title,
                    author: post.author,
                    description: post.description,
                    thumbnail: post.thumbnail,
                    githubLink: post.githubLink,
                    otherLink: post.otherLink,
                    bunkerTag: post.bunkerTag,
                    clip: post.clip,
                };
            } catch {
                throw new Error("Internal error. Unable to create post");
            }
        },
    },
};

import getUserPost from "../utils/getUserPost.js";
import getPostList from "../utils/getPostList.js";
import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

import Posts from "../../../components/post/post.model.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/

export default {
    Query: {
        userPost: function (_, args, { res }) {
            return getUserPost(args.postTitle, args.postAuthor);
        },
        getPosts: function(_, args, { res }) {
            return getPostList(args.sortingType);
        }
    },

    Mutation: {
        makePost: async function (_, args, { res }) {
            const payload = args.data;
            const jwtPayload = TokenHandler.verifyAccessToken(args.token);

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            const post = new Posts({
                title: payload.title,
                author: jwtPayload.username,
                description: payload.description,
                thumbnail: payload.thumbnail,
                images: payload.images,
                links: payload.links,
                collaborators: payload.collaborators,
                tags: payload.tags,
                likes: [],
                price: 0.0,
                bunkerTag: payload.bunkerTag,
                clip: payload.clip,
            });

            console.log(post);

            try {
                await post.save();

                return {
                    id: post._id,
                    title: post.title,
                    author: post.author,
                    description: post.description,
                    thumbnail: post.thumbnail,
                    images: payload.images,
                    links: post.links,
                    collaborators: payload.collaborators,
                    tags: payload.tags,
                    likes: [],
                    price: 0.0,
                    bunkerTag: post.bunkerTag,
                    clip: post.clip,
                };
            } catch {
                throw new Error("Internal error. Unable to create post");
            }
        },
    },
};

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
        getPosts: function (_, args, { res }) {
            return getPostList(args.sortingType);
        },
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
                likeAmt: 0,
                price: payload.price,
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
                    images: payload.images,
                    links: post.links,
                    collaborators: payload.collaborators,
                    tags: payload.tags,
                    likes: [],
                    likeAmt: 0,
                    price: payload.price,
                    bunkerTag: post.bunkerTag,
                    clip: post.clip,
                };
            } catch {
                throw new Error("Internal error. Unable to create post");
            }
        },
        likePost: async function (_, args, { res }) {
            const id_payload = args.postId;
            const jwtPayload = TokenHandler.verifyAccessToken(args.token);

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                const post = await Posts.findOne({ _id: id_payload });

                if (post) {
                    post.likes.push(jwtPayload.username);
                    post.likeAmt += 1;

                    // add error handling (no more than 1 like per user)

                    await post.save();

                    return {
                        id: post._id,
                        title: post.title,
                        author: post.author,
                        description: post.description,
                        thumbnail: post.thumbnail,
                        images: post.images,
                        links: post.links,
                        collaborators: post.collaborators,
                        tags: post.tags,
                        likes: post.likes,
                        likeAmt: post.likeAmt,
                        price: post.price,
                        bunkerTag: post.bunkerTag,
                        clip: post.clip,
                    };
                } else {
                    return null;
                }
            } catch {
                throw new Error("Internal error. Unable to like post");
            }
        },
    },
};

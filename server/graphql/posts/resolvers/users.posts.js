import getUserPost from "../utils/getUserPost.js";
import getPostById from "../utils/getPostById.js";
import getPostList from "../utils/getPostList.js";
import getPostsByAuthor from "../utils/getPostsByAuthor.js";
import getSavedPosts from "../utils/getSavedPosts.js";
import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/
import AddDynamicData from "../misc/addDynamicData.js";

export default {
    Query: {
        // returns a single user post given its title and author (should switch to id at some point)
        userPost: function (_, args, { res }) {
            return getUserPost(args.postTitle, args.postAuthor);
        },

        // returns all the posts in the order of the parameter 'sortingType'
        getPosts: async function (_, args, { res }) {
            try {
                const posts = await getPostList(args.sortingType);

                let user;

                // if the user was logged in, evaluate if the post requested has been liked or saved before
                if (args.token) {
                    const jwtPayload = TokenHandler.verifyAccessToken(args.token);

                    if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

                    user = await User.findOne({ username: jwtPayload.username});
                }

                const finalPosts = AddDynamicData.addAll(posts, user);

                return finalPosts;
            } catch (err) {
                return err;
            }
        },

        // return a post by the id
        getPostById: function (_, args, { res }) {
            return getPostById(args.postId);
        },

        // returns all the posts by a given author parameter
        getPostsByAuthor: function (_, args, { res }) {
            return getPostsByAuthor(args.author, args.requesterToken);
        },

        getSavedPosts: function (_, args, { res }) {
            const jwtPayload = TokenHandler.verifyAccessToken(args.token);

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            return getSavedPosts(jwtPayload.username);
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
                    isLiked: false,
                    isSaved: false,
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
                    if (post.likes.includes(jwtPayload.username)) {
                        throw new Error("You have already liked this post");
                    } else {
                        post.likes.push(jwtPayload.username);

                        await post.save();
                        
                        
                        // save post id in users db entry as "liked posts"
                        const user = await User.findOne({ username: jwtPayload.username });

                        if (user) {
                            user.liked_posts.push(post.id);
                        }

                        await user.save();
                        
                        const userToNotify = await User.findOne({ username: post.author });

                        if (userToNotify) {
                            userToNotify.notifications.push({
                                read: false,
                                sender: jwtPayload.username,
                                message: `liked your post!`,
                                type: "like"
                            });
                            await userToNotify.save();
                        }

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
                            likeAmt: post.likes.length,
                            isSaved: user.saved_posts.includes(jwtPayload.username),
                            isLiked: true,
                            price: post.price,
                            bunkerTag: post.bunkerTag,
                            clip: post.clip,
                        };
                    }
                } else {
                    return null;
                }
            } catch (err) {
                if (/Cast/.test(err.message))
                    throw new Error(
                        "Couldn't find the post you were looking for"
                    );
                throw err;
            }
        },
        unlikePost: async function (_, args, { res }) {
            const id_payload = args.postId;
            const jwtPayload = TokenHandler.verifyAccessToken(args.token);

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                const post = await Posts.findOne({ _id: id_payload });

                if (post) {
                    const index = post.likes.indexOf(jwtPayload.username);

                    if (index !== -1) {
                        post.likes.splice(index, 1);

                        await post.save();

                        const user = await User.findOne({ username: jwtPayload.username });

                        if (user) {
                            const userIndex = user.liked_posts.indexOf(post.id);

                            if (userIndex !== -1) {
                                user.liked_posts.splice(userIndex, 1);

                                await user.save();

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
                                    likeAmt: post.likes.length,
                                    isSaved: user.saved_posts.includes(jwtPayload.username),
                                    isLiked: false,
                                    price: post.price,
                                    bunkerTag: post.bunkerTag,
                                    clip: post.clip,
                                }
                            }
                        }
                    }
                }

                return null;
            } catch (err) {

            }

        },
        savePost: async function (_, args, { res }) {
            const id_payload = args.postId;
            const jwtPayload = TokenHandler.verifyAccessToken(args.token);
            
            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");
            
            try {
                // make sure the post exists
                const post = await Posts.findOne({ _id: id_payload }); 
                
                if (post) { 
                    const user = await User.findOne({ username: jwtPayload.username });
                    if (user) {
                        if (!user.saved_posts.includes(post.id)) {

                            user.saved_posts.push(post.id);
                            await user.save(); 
                            
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
                                likeAmt: post.likes.length,
                                isLiked: post.likes.includes(jwtPayload.username),
                                isSaved: true,
                                price: post.price,
                                bunkerTag: post.bunkerTag,
                                clip: post.clip,
                            };
                        } else {
                            return null;
                        }
                    }
                } else {
                    return null;
                }
            } catch {
                throw new Error("Internal error. Unable to save post");
            }
        },
    },
};

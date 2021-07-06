import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

import sanitizeHtml from "sanitize-html";

import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import Comment from "../../../components/post/post.comment.model.js";
import AddDynamicData from "../misc/addDynamicData.js";

import getUserPost from "../utils/getUserPost.js";
import getPostByPartial from "../utils/getPostByPartial.js";
import getPostById from "../utils/getPostById.js";
import getPostList from "../utils/getPostList.js";
import getPostsByAuthor from "../utils/getPostsByAuthor.js";
import getSavedPosts from "../utils/getSavedPosts.js";
import deletePost from "../utils/deletePost.js";

import LoadAmounts from "../misc/loadAmounts.js";

export default {
    Query: {
        // returns a single user post given its title and author (should switch to id at some point)
        userPost: function (_, args) {
            return getUserPost(args.postTitle, args.postAuthor);
        },

        // returns all the posts in the order of the parameter 'sortingType'
        getPosts: async function (_, args, { req }) {
            try {
                const loadAmt = LoadAmounts.mainPostFeed;
                let posts = await getPostList(args.sortingType, loadAmt, args.lastPostId, args.lastUniqueField);
                let fetchedAll = false;
                let user;

                // if the user was logged in, evaluate if the post requested has been liked or saved before
                if (req.user) {
                    const jwtPayload = req.user;
                    user = await User.findOne({
                        username: jwtPayload.username,
                        enabled: true,
                    });
                }

                // check if the last post exists, if it does, it means you havent fetched them all yet and vise versa, remove that post after
                if (posts[loadAmt] === undefined) {
                    fetchedAll = true;
                } else {
                    // remove the test post fetch only if you havent reached the end yet and are getting rid of the test post
                    posts.pop();
                }

                const finalPosts = AddDynamicData.addAll(posts, user);

                const finalResponse = {
                    posts: finalPosts,
                    fetchedAll: fetchedAll,
                };

                return finalResponse;
            } catch (err) {
                return err;
            }
        },

        // return a post by the id
        getPostById: async function (_, args, { req }) {
            try {
                let post = await getPostById(args.postId, args.commentOffSet, LoadAmounts.commentIncrements);

                let user;

                if (req.user) {
                    const jwtPayload = req.user;
                    user = await User.findOne({
                        username: jwtPayload.username,
                        enabled: true,
                    });

                    post.isLiked = post.likes.includes(user.username);
                    post.isSaved = user.saved_posts.includes(post.id);
                }
                return post;
            } catch (err) {
                return err;
            }
        },

        // returns all the posts by a given author parameter
        getPostsByAuthor: async function (_, args, { req }) {
            try {
                const loadAmt = LoadAmounts.personalPosts;

                let posts = await getPostsByAuthor(args.author, args.lastPostId, args.lastUniqueField, args.filter, loadAmt, req.user);
                let fetchedAll = false;

                // check and remove test post
                if (posts[loadAmt] === undefined) {
                    fetchedAll = true;
                } else {
                    posts.pop();
                }

                const finalResponse = {
                    posts: posts,
                    fetchedAll: fetchedAll,
                };

                return finalResponse;
            } catch (err) {
                return err;
            }
        },

        getSavedPosts: async function (_, args, { req }) {
            const jwtPayload = req.user;
            const loadAmt = LoadAmounts.savedPosts;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            let posts = await getSavedPosts(jwtPayload.username, loadAmt, args.lastPostId, args.filter, args.lastUniqueField);
            let fetchedAll = false;

            // check if the last post exists, if it does, it means you havent fetched them all yet and vise versa, remove that post after
            if (posts[loadAmt] === undefined) {
                fetchedAll = true;
            } else {
                // remove the test post fetch if you havent reache the end
                posts.pop();
            }

            const finalResponse = {
                posts: posts,
                fetchedAll: fetchedAll,
            };

            return finalResponse;
        },

        partial_post: async function (_, args, { req }) {
            const loadAmt = LoadAmounts.postSearch;

            let posts = await getPostByPartial(
                args.partial_name,
                args.filter,
                args.userToFilter,
                args.sortingType,
                args.lastPostId,
                args.lastUniqueField,
                loadAmt,
                req.user
            );

            let fetchedAll = false;

            if (posts[loadAmt] === undefined) {
                fetchedAll = true;
            } else {
                posts.pop();
            }

            const finalResponse = {
                posts: posts,
                fetchedAll: fetchedAll,
            };

            return finalResponse;
        },
    },

    Mutation: {
        makePost: async function (_, args, { req }) {
            const payload = args.data;
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            // TODO: im not really happy with this... it's  probably some bad code... let me know

            // sanitize
            const sanitizedTitle = sanitizeHtml(payload.title);
            const sanitizedDesc = sanitizeHtml(payload.description);

            const reg0 = new RegExp("<", "g");
            const reg1 = new RegExp(">", "g");

            const cleanTitle = sanitizedTitle.replace(reg0, "").replace(reg1, "");
            const cleanDesc = sanitizedDesc.replace(reg0, "").replace(reg1, "");

            if (!cleanDesc || !cleanTitle) {
                throw new Error("Input is an empty string (after cleaning)");
            }

            const post = new Posts({
                title: cleanTitle,
                author: jwtPayload.username,
                description: cleanDesc,
                thumbnail: payload.thumbnail,
                images: payload.images,
                links: payload.links,
                collaborators: payload.collaborators,
                tags: payload.tags,
                likes: [],
                likeAmt: 0,
                price: payload.price,
                comments: [],
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
                    likes: post.likes,
                    likeAmt: post.likeAmt,
                    price: payload.price,
                    createdAt: post.createdAt,
                    comments: [],
                };
            } catch (err) {
                // best error handling I ever made
                console.error(err.errors.description);

                throw new Error(
                    `Unable to create post: ${
                        err.errors.tags
                            ? err.errors.tags.properties.message
                            : err.errors.links
                            ? err.errors.links.properties.message
                            : err.errors.title
                            ? err.errors.title.properties.message
                            : err.errors.description
                            ? err.errors.description.properties.message
                            : "Internal Error"
                    }`
                );
            }
        },
        likePost: async function (_, args, { req }) {
            const id_payload = args.postId;
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");
            try {
                // NOTE: here we avoid performing the populate op on comments because we dont need comments
                const post = await Posts.findOne({ _id: id_payload, enabled: true });

                if (post) {
                    if (post.likes.includes(jwtPayload.username)) {
                        throw new Error("You have already liked this post");
                    } else {
                        post.likes.push(jwtPayload.username);
                        post.likeAmt = post.likes.length;

                        await post.save();

                        // save post id in users db entry as "liked posts"
                        const user = await User.findOne({
                            username: jwtPayload.username,
                            enabled: true,
                        });

                        if (user) {
                            user.liked_posts.push(post.id);
                        }

                        await user.save();

                        let userToNotify;

                        // only notify the user if the post is not theirs
                        if (jwtPayload.username != post.author) {
                            userToNotify = await User.findOne({
                                username: post.author,
                                enabled: true,
                            });
                        }

                        if (userToNotify) {
                            // only notify the user if there is not already an identical notification.
                            // this is to prevent people from spamming notifications & duplicate key error

                            const notification = {
                                read: false,
                                sender: jwtPayload.username,
                                message: `liked your post!`,
                                type: "like",
                                target: post.title,
                                timestamp: new Date(),
                            };

                            let shouldNotify = true;

                            // the forEach loop was being stoopid, so im using a regular loop
                            for (let i = 0; i < userToNotify.notifications.length; i++) {
                                const oldNotification = userToNotify.notifications[i];

                                if (
                                    oldNotification.sender == jwtPayload.username &&
                                    oldNotification.message == notification.message &&
                                    oldNotification.target == notification.target
                                ) {
                                    shouldNotify = false;
                                }
                            }
                            if (userToNotify == jwtPayload.username) {
                                shouldNotify = false;
                            }

                            if (shouldNotify) {
                                userToNotify.notifications.unshift(notification);
                            }
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
                        };
                    }
                } else {
                    return null;
                }
            } catch (err) {
                if (/Cast/.test(err.message)) throw new Error("Couldn't find the post you were looking for");
                throw err;
            }
        },
        unlikePost: async function (_, args, { req }) {
            const id_payload = args.postId;
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                // NOTE: here we avoid performing the populate op on comments because we dont need comments
                const post = await Posts.findOne({ _id: id_payload, enabled: true });

                if (post) {
                    const index = post.likes.indexOf(jwtPayload.username);

                    if (index !== -1) {
                        post.likes.splice(index, 1);
                        post.likeAmt = post.likes.length;

                        await post.save();

                        const user = await User.findOne({
                            username: jwtPayload.username,
                            enabled: true,
                        });

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
                                };
                            }
                        }
                    }
                }

                return null;
            } catch (err) {}
        },
        commentOnPost: async function (_, args, { req }) {
            const id_payload = args.postId;

            const reg0 = new RegExp("<", "g");
            const reg1 = new RegExp(">", "g");
            const commentMessage = sanitizeHtml(args.comment).replace(reg0, "").replace(reg1, ""); // ultimate nesting cuz im lazy

            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                if (commentMessage != "" && commentMessage != null) {
                    const user = await User.findOne({
                        username: jwtPayload.username,
                        enabled: true,
                    });

                    // make sure the user commeting exists
                    if (user) {
                        // NOTE: here we avoid performing the populate op on comments because we dont need comments
                        const post = await Posts.findOne({ _id: id_payload, enabled: true });

                        if (post) {
                            const comment = new Comment({
                                userId: user._id,
                                createdBy: user.username,
                                payload: commentMessage,
                            });

                            // add the new comment and save the document
                            post.comments.unshift(comment);

                            await comment.save();
                            await post.save();
                            
                            return {
                                id: comment._id,
                                userId: comment.userId,
                                payload: comment.payload,
                                createdBy: comment.createdBy,
                                createdAt: comment.createdAt,
                            };
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } catch {
                throw new Error("Internal error. Unable to comment on post");
            }
        },
        savePost: async function (_, args, { req }) {
            const id_payload = args.postId;
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                // make sure the post exists
                // NOTE: here we avoid performing the populate op on comments because we dont need comments
                const post = await Posts.findOne({ _id: id_payload, enabled: true });

                if (post) {
                    const user = await User.findOne({
                        username: jwtPayload.username,
                        enabled: true,
                    });
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

        // I avoid sending back an entire post document because you dont actully need to query the db for the post item,
        // you can just get rid of the postid in the users document. this is why only a boolean is returned;
        unSavePost: async function (_, args, { req }) {
            const id_payload = args.postId;
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                const user = await User.findOne({
                    username: jwtPayload.username,
                    enabled: true,
                });

                if (user) {
                    for (let i = 0; i < user.saved_posts.length; i++) {
                        if (user.saved_posts[i] === id_payload) {
                            // remove saved post from array
                            user.saved_posts.splice(i, 1);
                            break;
                        }
                    }
                    await user.save();

                    return {
                        success: true,
                    }; // only returns whether or not it worked
                } else {
                    return null;
                }
            } catch {
                throw new Error("Internal error. Unable to unsave post");
            }
        },
        deletePost: async function (_, args, { req, res }) {
            if (req.user) {
                try {
                    // NOTE: here we avoid performing the populate op on comments because we dont need comments
                    const post = await Posts.findOne({ _id: args.postId, enabled: true });

                    if (!post) {
                        res.status(422);
                        return {
                            success: false,
                            message: "Post not found",
                            stacktrace: ["deletePost function in user.posts module"],
                        };
                    }

                    if (post.author === req.user.username) {
                        await deletePost(null, args.postId);

                        return {
                            success: true,
                            message: "Successfully deleted post.",
                            stacktrace: null,
                        };
                    } else {
                        res.status(401);
                        return {
                            success: false,
                            message: "The given post is not yours",
                            stacktrace: ["deletePost function in user.posts module", "post.author != req.user.username"],
                        };
                    }
                } catch (e) {
                    console.error(e);
                    return {
                        success: false,
                        message: e.message,
                        stacktrace: null,
                    };
                }
            } else {
                res.status(401);
                throw new Error("Unauthorized");
            }
        },
    },
};

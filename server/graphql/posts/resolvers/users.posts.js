import getUserPost from "../utils/getUserPost.js";
import getPostByPartial from "../utils/getPostByPartial.js";
import getPostById from "../utils/getPostById.js";
import getPostList from "../utils/getPostList.js";
import getPostsByAuthor from "../utils/getPostsByAuthor.js";
import getSavedPosts from "../utils/getSavedPosts.js";
import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";

export default {
    Query: {
        // returns a single user post given its title and author (should switch to id at some point)
        userPost: function (_, args) {
            return getUserPost(args.postTitle, args.postAuthor);
        },

        // returns all the posts in the order of the parameter 'sortingType'
        getPosts: async function (_, args, { req }) {
            try {
                const loadAmt = 3;
                let posts = await getPostList(args.sortingType, loadAmt, args.lastPostId, args.lastUniqueField);
                let fetchedAll = false;

                let user;

                // if the user was logged in, evaluate if the post requested has been liked or saved before
                if (req.user) {
                    const jwtPayload = req.user;
                    user = await User.findOne({ username: jwtPayload.username });
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
                    fetchedAll: fetchedAll
                }

                return finalResponse;
            } catch (err) {
                return err;
            }
        },

        // return a post by the id
        getPostById: async function (_, args, { req }) {
            try {
                let post = await getPostById(args.postId);
                let user;

                if (req.user) {
                    const jwtPayload = req.user;
                    user = await User.findOne({ username: jwtPayload.username });

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
            const loadAmt = 3;

            let posts = await getPostsByAuthor(args.author, args.lastPostId, loadAmt, args.filter, args.lastUniqueField, req.user);
            let fetchedAll = false;

            // check and remove test post
            if (posts[loadAmt] === undefined) {
                fetchedAll = true;
            } else {
                posts.pop();
            }

            const finalResponse = {
                posts: posts,
                fetchedAll: fetchedAll
            };

            return finalResponse;
        },

        getSavedPosts: async function (_, args, { req }) {
            const jwtPayload = req.user;
            const loadAmt = 3;

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
                fetchedAll: fetchedAll
            };

            return finalResponse;
        },

        partial_post: async function (_, args, { req }) {
            const loadAmt = 2;

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
                fetchedAll: fetchedAll
            }
        
            return finalResponse;
        },
    },

    Mutation: {
        makePost: async function (_, args, { req }) {
            const payload = args.data;
            const jwtPayload = req.user;

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
                comments: []
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
                    comments: []
                };
            } catch (err) {
                // best error handling I ever made
                throw new Error(`Unable to create post: ${(err.errors.tags) ? err.errors.tags.properties.message : (err.errors.links.properties.message) ? err.errors.links.properties.message : "Internal Error"}`);
            }
        },
        likePost: async function (_, args, { req }) {
            const id_payload = args.postId;
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");
            try {
                const post = await Posts.findOne({ _id: id_payload });

                if (post) {
                    if (post.likes.includes(jwtPayload.username)) {
                        throw new Error("You have already liked this post");
                    } else {
                        post.likes.push(jwtPayload.username);
                        post.likeAmt++;

                        await post.save();


                        // save post id in users db entry as "liked posts"
                        const user = await User.findOne({ username: jwtPayload.username });

                        if (user) {
                            user.liked_posts.push(post.id);
                        }

                        await user.save();

                        const userToNotify = await User.findOne({ username: post.author });

                        if (userToNotify) {
                            // only notify the user if there is not already an identical notification.
                            // this is to prevent people from spamming notifications & duplicate key error

                            const notification = {
                                read: false,
                                sender: jwtPayload.username,
                                message: `liked your post!`,
                                type: "like",
                                target: post.title,
                                timestamp: new Date()
                            };

                            let shouldNotify = true;

                            // the forEach loop was being stoopid, so im using a regular loop
                            for (let i = 0; i < userToNotify.notifications.length; i++) {
                                const oldNotification = userToNotify.notifications[i];

                                console.log(oldNotification.target, notification.target);

                                if (oldNotification.sender == jwtPayload.username && oldNotification.message == notification.message && oldNotification.target == notification.target) {
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
                            likeAmt: post.likeAmt || post.likes.length,
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
        unlikePost: async function (_, args, { req }) {
            const id_payload = args.postId;
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                const post = await Posts.findOne({ _id: id_payload });

                if (post) {
                    const index = post.likes.indexOf(jwtPayload.username);

                    if (index !== -1) {
                        post.likes.splice(index, 1);
                        post.likeAmt--;

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
                                    likeAmt: post.likeAmt || post.likes.length,
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
        commentOnPost: async function (_, args, { req }) {
            const id_payload = args.postId;
            const commentMessage = args.comment;
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                if (args.comment != "" && args.comment != null) {
                    const user = await User.findOne({ username: jwtPayload.username });

                    // make sure the user commeting exists
                    if (user) {
                        const post = await Posts.findOne({ _id: id_payload });

                        if (post) {
                            const comment = {
                                commenter: jwtPayload.username,
                                comment: commentMessage,
                                timestamp: args.timestamp
                            };

                            // add the new comment and save the document
                            post.comments.push(comment);

                            await post.save();

                            return comment;
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
                                likeAmt: post.likeAmt || post.likes.length,
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

        // I avoid sending back an entire post document because you dont actully need to query the db for the post item,
        // you can just get rid of the postid in the users document. this is why only a boolean is returned;
        unSavePost: async function (_, args, { req }) {
            const id_payload = args.postId;
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                const user = await User.findOne({ username: jwtPayload.username });

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
                        success: true
                    }; // only returns whether or not it worked
                } else {
                    return null;
                }
            } catch {
                throw new Error("Internal error. Unable to unsave post");
            }
        },
    },
};

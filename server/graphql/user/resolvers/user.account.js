import User from "../../../components/user/user.model.js";
import bcrypt from "bcrypt";
import SessionRevoker from "../../../components/tokens/SessionRevoker.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js";

import FilesHandler from "../../../middlewares/FilesHandler.js";
const fh = new FilesHandler();

import validateCreds from "../utils/validateCreds.js";
import getUserEntry from "../utils/getUserEntry.js";
import getUserByPartial from "../utils/getUserByPartial.js";
import loginValidUser from "../utils/loginValidUser.js";
import AddDynamicData from "../misc/addDynamicData.js";
import LoadAmounts from "../misc/loadAmounts.js";
import NotificationData from "../misc/notificationData.js";

import getAllPostsByAuthor from "../../posts/utils/getAllPostsByAuthor.js";
import deletePost from "../../posts/utils/deletePost.js";
import fetchUsers from "../utils/fetchUsers.js";

import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

export default {
    Query: {
        getUsers: async function (_, args, { req }) {
            try {
                const loadAmt = LoadAmounts.userFeed;
                let fetchedAll = false;

                let requester;

                // if a token was given, assign requester the username of who is asking for the user cards
                if (req.user) {
                    requester = req.user.username;
                }
                let users = await fetchUsers(args.sortMethod, args.lastUserId, args.lastUniqueField, loadAmt);

                if (users[loadAmt] === undefined) {
                    fetchedAll = true;
                } else {
                    // remove the test post fetch only if you havent reached the end yet and are getting rid of the test post
                    users.pop();
                }

                // add the dynamic data if a requester is assigned
                const finalUsers = requester ? AddDynamicData.addAll(users, req.user.username) : users;

                const finalResponse = {
                    users: finalUsers,
                    fetchedAll: fetchedAll,
                };

                return finalResponse;
            } catch (err) {
                return err;
            }
        },
        partial_user: async function (_, args, { req }) {
            const loadAmt = LoadAmounts.userSearch;

            let fetchedAll = false;
            let requester;

            if (req.user) {
                requester = req.user.username;
            }

            let users = await getUserByPartial(args.partial_username, args.sortMethod, args.lastUserId, args.lastUniqueField, loadAmt);

            if (users[loadAmt] === undefined) {
                fetchedAll = true;
            } else {
                users.pop();
            }

            const finalUsers = requester ? AddDynamicData.addAll(users, req.user.username) : users;

            const finalResponse = {
                users: finalUsers,
                fetchedAll: fetchedAll,
            };

            return finalResponse;
        },
        loginUser: async function (_, args, { res }) {
            let user;

            if (args.email) {
                user = await User.findOne({
                    email: args.email,
                });
            } else if (args.username) {
                user = await User.findOne({
                    username: args.username,
                });
            } else {
                return {
                    message: "Please provide a valid username or email",
                    accessToken: null,
                };
            }

            if (user) {
                return loginValidUser(user, args.password, res);
            } else {
                throw new AuthenticationError("Incorrect credentials.");
            }
        },

        logoutUser: function (_, args, { res }) {
            try {
                res.cookie("jid", "", {
                    // clearing the cookie
                    httpOnly: true,
                    path: "/user/refresh_token",
                    sameSite: "Lax",
                    expires: "",
                });

                return {
                    message: "Successfully logged out",
                };
            } catch (err) {
                return {
                    message: err.message,
                };
            }
        },

        user: function (_, args) {
            return getUserEntry(args.username, args.requester);
        },

        getPersonalDetails: async function (_, args, { req }) {
            const jwtPayload = req.user;

            if (!jwtPayload) return { success: false, message: "Invalid token" };

            try {
                const user = await User.findOne({
                    username: jwtPayload.username,
                });

                if (user && user.enabled) {
                    let unreadAmt = 0;

                    for (let i = 0; i < user.notifications.length; i++) {
                        if (!user.notifications[i].read) {
                            unreadAmt++;
                        }
                    }

                    return {
                        username: user.username,
                        desc: user.desc,
                        email: user.email,
                        notifications: user.notifications,
                        unreadNotificationAmt: unreadAmt,
                        tag: user.tag,
                        liked_posts: user.liked_posts,
                        // saved_posts: user.saved_posts, WE NEED TO ADD THIS
                        followers: user.followers,
                        following: user.following,
                        profile_pic: user.profile_pic,
                    };
                } else {
                    console.log(err);
                    throw new Error("Unable to find user details");
                }
            } catch (err) {
                throw new Error("Failed to fetch details");
            }
        },

        getUnreadNotificationsData: async function (_, args, { req }) {
            const jwtPayload = req.user;

            if (!jwtPayload) throw new Error("Unauthenticated");

            try {
                const user = await User.findOne({
                    username: jwtPayload.username,
                });

                if (user) {
                    let unreadNotifications = [];

                    for (let i = 0; i < user.notifications.length; i++) {
                        if (!user.notifications[i].read) {
                            unreadNotifications.push(user.notifications[i]);
                        }
                    }

                    return unreadNotifications;
                }
            } catch (err) {
                throw new Error("Failed to get unread notifications");
            }
        },

        getUnreadNotifications: async function (_, args, { req }) {
            const jwtPayload = req.user;

            if (!jwtPayload) throw new Error("Unauthenticated");

            try {
                const user = await User.findOne({
                    username: jwtPayload.username,
                });

                if (user) {
                    let unreadNotifications = 0;

                    for (let i = 0; i < user.notifications.length; i++) {
                        if (!user.notifications[i].read) {
                            unreadNotifications++;
                        }
                    }

                    return {
                        amount: unreadNotifications,
                    };
                } else {
                    console.log(err);
                    throw new Error("Failed to get user from token");
                }
            } catch (err) {
                throw new Error("Failed to get unread notifications");
            }
        },
        downloadUserData: async function (_, args, { req }) {
            const jwtPayload = req.user;

            if (!jwtPayload) throw new Error("Unauthenticated");

            try {
                const user = await User.findOne({
                    username: jwtPayload.username,
                });

                if (!user.enabled) throw new Error("User is banned");

                const posts = await getAllPostsByAuthor(jwtPayload.username);
                return {
                    user: {
                        username: user.username,
                        desc: user.desc,
                        email: user.email,
                        notifications: user.notifications,
                        tag: user.tag,
                        liked_posts: user.liked_posts,
                        // saved_posts: user.saved_posts, WE NEED TO ADD THIS
                        followers: user.followers,
                        following: user.following,
                        profile_pic: user.profile_pic,
                    },
                    posts,
                };
            } catch (e) {
                console.error(e);
                throw new Error("Failed to get user from token");
            }
        },
    },

    Mutation: {
        signupUser: async function (_, args, { res }) {
            if (
                validateCreds({
                    username: args.username,
                    email: args.email,
                    password: args.password,
                })
            ) {
                const hashedPass = await bcrypt.hash(args.password, 10);

                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: hashedPass,
                });

                try {
                    await user.save();

                    const accessToken = TokenHandler.createAccessToken(user);
                    const refreshToken = TokenHandler.createRefreshToken(user);

                    if (accessToken && refreshToken) {
                        // setting refresh cookie
                        res.cookie("jid", refreshToken, {
                            httpOnly: true,
                            path: "/user/refresh_token",
                            sameSite: "Lax",
                            expires: new Date(Date.now() + 561600000), // cookie expires after 6.5 days
                        });

                        return {
                            message: "Successfully signed up.",
                            accessToken,
                        };
                    } else {
                        res.status(422);

                        throw new AuthenticationError("Unable to create token.");
                    }
                } catch {
                    res.status(401);

                    throw new AuthenticationError("Credentials are already taken.");
                }
            } else {
                res.status(400);
                throw new AuthenticationError("Invalid credentials. Try again.");
            }
        },

        updateUserDetails: async function (_, args, { req }) {
            const jwtPayload = req.user;

            let editedData = [];

            if (!jwtPayload) return { success: false, message: "Invalid token" };

            const user = await User.findOne({
                _id: jwtPayload._id,
            });

            // if the token is valid then we should def find a user...
            if (!user) return { success: false, message: "Internal error" };
            if (!user.enabled) return { success: false, message: "User is banned" };

            const nonMod = ["_id", "id", "tokenVersion", "tag", "createdAt", "updatedAt", "__v", "v"];

            // loop through all the fields that need to be changed
            for (const payload of args.fields) {
                // checking if the received payload actually exists in the user object (maybe someone miss spells a field)
                if (user[payload.field]) {
                    if (nonMod.includes(payload.field)) {
                        throw new Error(`Cannot update field: ${payload.field}`);
                    } else {
                        if (payload.field == "password") {
                            if (payload.newValue && payload.newValue.toString().trim() !== "" && payload.newValue.length > 8) {
                                // bcrypt generates a random salt at every bcrypt.hash so first we compare the passwords with the right function and then we hash the new one
                                // really important the order of the function arguments here
                                if (await bcrypt.compare(payload.newValue, user[payload.field]))
                                    throw new Error("Password can't be the same as the previous one.");
                                const newHashedPass = await bcrypt.hash(payload.newValue, 10);

                                editedData.push({
                                    field: payload.field,
                                    newValue: "The password was successfully changed.",
                                }); // the only case that we dont want to return the mutated data is for the password
                                user[payload.field] = newHashedPass;
                            } else {
                                throw new Error(`Cannot update field: ${payload.field}, please enter a valid password with no spaces and > than 8 characters.`);
                            }
                        } else {
                            if (payload.field == "email") {
                                console.log(/\S+@\S+\.\S+/.test(payload.newValue));
                                if (!/\S+@\S+\.\S+/.test(payload.newValue)) throw new Error("Invalid email");
                            }

                            editedData.push({
                                field: payload.field,
                                newValue: payload.newValue,
                            });
                            user[payload.field] = payload.newValue;
                        }
                    }
                } else {
                    throw new Error(`Field ${payload.field}: does not exist`);
                }
            }

            await user.save();

            return {
                changedData: editedData,
                message: "Successfully updated user details",
            };
        },

        // will add a follower to "person" and add a following to follower
        followPerson: async function (_, args, { req }) {
            const jwtPayload = req.user;
            const personPayload = args.person;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                // add a follower to the person
                let personToFollow = await User.findOne({
                    username: personPayload,
                });
                let addFollowing = await User.findOne({
                    username: jwtPayload.username,
                });

                if (personToFollow && addFollowing) {
                    // check to make sure they are not already followed
                    if (
                        !personToFollow.followers.includes(addFollowing.username) &&
                        personToFollow.username !== addFollowing.username // wanted to do it with IDs but for some reason the comparison wasn't working
                    ) {
                        personToFollow.followers.push(jwtPayload.username);
                    } else {
                        throw new Error(`Unable to follow ${personPayload}, make sure you don't already follow them/you aren't following yourself!`);
                    }

                    // Notify the user that someone followed them!

                    const notification = {
                        read: false,
                        sender: addFollowing.username,
                        message: `followed you!`,
                        type: "follow",
                        target: null,
                        timestamp: new Date(),
                    };

                    let shouldNotify = true;

                    // the forEach loop was being stoopid, so im using a regular loop
                    for (let i = 0; i < personToFollow.notifications.length; i++) {
                        const oldNotification = personToFollow.notifications[i];

                        if (
                            oldNotification.sender == notification.sender &&
                            oldNotification.message == notification.message &&
                            oldNotification.target == notification.target
                        ) {
                            shouldNotify = false;
                        }
                    }
                    if (personToFollow == notification.sender) {
                        shouldNotify = false;
                    }

                    if (shouldNotify) {
                        personToFollow.notifications.unshift(notification);

                        // remove a notitcation if the user has to many
                        if (personToFollow.notifications.length > NotificationData.maxNotifications) {
                            personToFollow.notifications.pop();
                        }
                    }

                    await personToFollow.save();

                    //add a following entry to the person who followed
                    addFollowing.following.push(personPayload);

                    await addFollowing.save();

                    return {
                        followerAmt: personToFollow.followers.length,
                        isFollowing: true,
                    };
                } else {
                    return null;
                }
            } catch (err) {
                throw new Error("Something went wrong following " + personPayload);
            }
        },

        unfollowPerson: async function (_, args, { req }) {
            const jwtPayload = req.user;
            const personPayload = args.person; // this is the name of the user you want to remove from the user owning the token

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                let removeName = await User.findOne({
                    username: jwtPayload.username,
                }); // this is the user you're removing the name from
                let userBeingRemoved = await User.findOne({
                    username: personPayload,
                }); // this is the user that is being removed from 'removeName' user

                if (removeName && userBeingRemoved) {
                    for (let i = 0; i < removeName.following.length; i++) {
                        if (removeName.following[i] === personPayload) {
                            removeName.following.splice(i, 1);
                            break;
                        }
                    }
                    for (let i = 0; i < userBeingRemoved.followers.length; i++) {
                        if (userBeingRemoved.followers[i] === jwtPayload.username) {
                            userBeingRemoved.followers.splice(i, 1);
                            break;
                        }
                    }

                    await userBeingRemoved.save();
                    await removeName.save();

                    return {
                        followerAmt: userBeingRemoved.followers.length,
                        isFollowing: false,
                    };
                } else {
                    return null;
                }
            } catch {
                throw new Error("Something went wrong unfollowing " + personPayload);
            }
        },

        // will return notifications and turn like and follow types into read = true, this is to avoid an extra call when you actully get the results
        // BRO THIS IS CRAZY
        getAndReadNotifications: async function (_, args, { req }) {
            const jwtPayload = req.user;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                let user = await User.findOne({
                    username: jwtPayload.username,
                });

                if (user) {
                    for (let i = 0; i < user.notifications.length; i++) {
                        if (user.notifications[i].type == "like" || user.notifications[i].type == "follow") {
                            user.notifications[i].read = true;
                        }
                    }

                    user.markModified("notifications");

                    // the save() func is present (check by printing)
                    const saved = await user.save();

                    return user.notifications;
                } else {
                    return null;
                }
            } catch (err) {
                console.log(err);
                throw new Error("Failed to get notifications");
            }
        },

        notifyUser: async function (_, args) {
            const userToNotifyPayload = args.userToNotify;
            const notificationPayload = args.notification;

            notificationPayload.read = false; // set the message read state to false since its a new notification

            try {
                let personToNotify = await User.findOne({
                    username: userToNotifyPayload,
                });

                if (personToNotify) {
                    // limit the amount of notifications here (if len > x : delete the oldest)
                    personToNotify.notifications.unshift(notificationPayload);

                    await personToNotify.save();

                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                throw new Error("Something went wrong with the notification");
            }
        },

        revokeUserSession: async function (_, args, { req }) {
            return await SessionRevoker.revokeRefreshToken(req.user);
        },

        deleteAccount: async function (_, args, { req, res }) {
            if (req.user) {
                const user = await User.findOne({
                    _id: req.user._id,
                });

                if (!user && !user.enabled) {
                    res.status(422);
                    return {
                        success: false,
                        message: "User not found",
                        stacktrace: ["deleteAccount function in user.account module", "couldn't find a user document given the jwt"],
                    };
                }

                const success = await loginValidUser(user, args.password, res);
                if (!success.accessToken) {
                    res.status(401);
                    return {
                        success: false,
                        message: "Unauthorized, incorrect password",
                        stacktrace: ["deleteAccount function in user.account module"],
                    };
                }

                try {
                    // delete the posts
                    await deletePost(user.username, null);

                    // delete profile picture
                    fh.deleteFiles([`${process.env.UPLOAD_PROFILE_PIC}/${user.profile_pic}`]);

                    // delete user
                    await User.deleteOne({
                        _id: user._id,
                    });

                    return {
                        success: true,
                        message: "Successfully deleted the account. Bye!",
                        stacktrace: null,
                    };
                } catch (e) {
                    console.error(e);
                    return {
                        success: false,
                        message: e.message,
                        stacktrace: ["deleteAccount function in user.account module", "internal error"],
                    };
                }
            } else {
                res.status(401);
                throw new Error("Unauthorized");
            }
        },
    },
};

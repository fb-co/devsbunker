import User from "../../../components/user/user.model.js"; // TODO: move this inside GraphQL/
import bcrypt from "bcrypt";
import SessionRevoker from "../../../components/tokens/SessionRevoker.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/

import validateCreds from "../utils/validateCreds.js";
import getUserEntry from "../utils/getUserEntry.js";
import getUserByPartial from "../utils/getUserByPartial.js";
import loginValidUser from "../utils/loginValidUser.js";

import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

export default {
    Query: {
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
            return getUserEntry(args.username);
        },

        getPersonalDetails: async function (_, args, { req }) {
            const jwtPayload = req.user;

            if (!jwtPayload) return { success: false, message: "Invalid token" };

            try {
                const user = await User.findOne({ username: jwtPayload.username });

                if (user) {
                    return {
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
                    };
                } else {
                    console.log(err);
                }
            } catch (err) {
                throw new Error("Failed to fetch details");
            }
        },

        partial_user: function (_, args, { res }) {
            return getUserByPartial(args.partial_username, args.requester);
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

            const nonMod = ["_id", "id", "tokenVersion", "tag", "createdAt", "updatedAt", "__v", "v"];

            try {
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
                                    if (await bcrypt.compare(payload.newValue, user[payload.field])) throw new Error("Password can't be the same as the previous one.");
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
            } catch (err) {
                return { changedData: null, message: err.message };
            }

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
                let person_to_follow = await User.findOne({ username: personPayload });
                let add_following = await User.findOne({ username: jwtPayload.username });

                if (person_to_follow && add_following) {
                    // check to make sure they are not already followed
                    if (!person_to_follow.followers.includes(add_following.username)) {
                        person_to_follow.followers.push(jwtPayload.username);
                    } else {
                        return null; // we should add something better like a msg than just null
                    }

                    await person_to_follow.save();

                    //add a following entry to the person who followed
                    add_following.following.push(personPayload);

                    await add_following.save();

                    return {
                        followers: person_to_follow.followers.length,
                    };
                } else {
                    return null;
                }
            } catch (err) {
                throw new Error("Something went wrong following " + personPayload);
            }
        },

        notifyUser: async function (_, args, { res }) {
            const userToNotifyPayload = args.userToNotify;
            const notificationPayload = args.notification;

            notificationPayload.read = false; // set the message read state to false since its a new notification

            try {
                let person_to_notify = await User.findOne({ username: userToNotifyPayload });

                if (person_to_notify) {
                    // limit the amount of notifications here (if len > x : delete the oldest)
                    person_to_notify.notifications.push(notificationPayload);

                    await person_to_notify.save();

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
    },
};

import User from "../../../components/user/user.model.js"; // TODO: move this inside GraphQL/
import bcrypt from "bcrypt";
import SessionRevoker from "../../../components/tokens/SessionRevoker.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/

import validateCreds from "../utils/validateCreds.js";
import getUserEntry from "../utils/getUserEntry.js";
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

        user: function (_, args, { res }) {
            return getUserEntry(args.username);
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

        updateUserDetails: async function (_, args, { res }) {
            const jwtPayload = TokenHandler.verifyAccessToken(args.token);
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
                                const newHashedPass = await bcrypt.hash(payload.newValue, 10);

                                editedData.push({
                                    field: payload.field,
                                    newValue: "Changed",
                                }); // the only case that we dont want to return the mutated data is for the password
                                user[payload.field] = newHashedPass;
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
        followPerson: async function (_, args, { res }) {
            const jwtPayload = TokenHandler.verifyAccessToken(args.token);
            const personPayload = args.person;

            if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

            try {
                // add a follower to the person
                let person_to_follow = await User.findOne({ username: personPayload });

                if (person_to_follow) {
                    person_to_follow.followers.push(jwtPayload.username);
                    
                    await person_to_follow.save();

                    // add a persn under 'following' for the user that just followed this person
                    let add_following = await User.findOne({ username: jwtPayload.username });

                    if (add_following) {
                        add_following.following.push(personPayload);

                        await add_following.save();

                        return {
                            followers: person_to_follow.followers 
                        };
                    }else {
                        return null;
                    }
                } else {
                    return null;
                }
            } catch (err) {
                throw new Error("Something went wrong following " + personPayload);
            }
        },

        revokeUserSession: async function (_, args) {
            return await SessionRevoker.revokeRefreshToken(args.token);
        },
    },
};

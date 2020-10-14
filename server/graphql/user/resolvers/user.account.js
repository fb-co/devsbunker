import User from "../../../components/user/user.model.js"; // TODO: move this inside GraphQL/
import bcrypt from "bcrypt";
import SessionRevoker from "../../../components/tokens/SessionRevoker.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/

import validateCreds from "../utils/validateCreds.js";
import getUserEntry from "../utils/getUserEntry.js";
import loginValidUser from '../utils/loginValidUser.js';

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

                        throw new AuthenticationError(
                            "Unable to create token."
                        );
                    }
                } catch {
                    res.status(401);

                    throw new AuthenticationError(
                        "Credentials are already taken."
                    );
                }
            } else {
                res.status(400);
                throw new AuthenticationError(
                    "Invalid credentials. Try again."
                );
            }
        },

        updateUserDetails: async function(_, args, {res}) {
            const {description, token} = args;

            try {
                const jwtPayload = TokenHandler.verifyAccessToken(token);
    
                const user = await User.findOne({
                    _id: jwtPayload._id
                });
    
                user.desc = description;
                user.save();

                return {success: true}
            } catch {

                return {success: false}
            }

        },

        revokeUserSession: async function (_, args) {
            return await SessionRevoker.revokeRefreshToken(args.token);
        },
    },
}
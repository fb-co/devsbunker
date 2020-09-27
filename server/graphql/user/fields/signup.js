import graphql from "graphql";
const { GraphQLString, GraphQLError } = graphql;

import { SignupResponse } from "../typeDefs.js";
import User from "../../../components/user/user.model.js"; // TODO: move this inside GraphQL/

import bcrypt from "bcrypt";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/

const signup = {
    type: SignupResponse,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },

    resolve: async (_, args, { res }) => {
        function validateCreds(creds) {
            return (
                creds.username &&
                creds.username.toString().trim() !== "" &&
                /^[a-zA-Z0-9_-]+$/.test(creds.username) &&
                creds.email &&
                creds.email.toString().trim() !== "" &&
                /\S+@\S+\.\S+/.test(creds.email) &&
                creds.password &&
                creds.password.toString().trim() !== "" &&
                creds.password.length > 8
            );
        }

        function failedSignup(res, msg) {
            res.status(422);
            return new GraphQLError(msg);
        }

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
                    });

                    return {
                        message: "Successfully signed up.",
                        accessToken,
                    };
                } else {
                    return failedLogin(res, "Unable to create token.");
                }
            } catch {
                return failedSignup(
                    res,
                    "Unable to signup. Credentials are probably already taken."
                );
            }
        } else {
            return failedSignup(res, "Invalid credentials found.");
        }
    },
};

export default signup;

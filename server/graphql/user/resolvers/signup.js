import User from "../../../components/user/user.model.js"; // TODO: move this inside GraphQL/
import bcrypt from "bcrypt";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/
import validateCreds from "../utils/validateCreds.js";

import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

export default {
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
    },
};

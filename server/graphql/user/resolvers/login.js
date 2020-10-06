import bcrypt from "bcrypt";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/
import User from "../../../components/user/user.model.js"; // TODO: move this inside GraphQL/

import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

async function loginValidUser(user, password, res) {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        const accessToken = TokenHandler.createAccessToken(user);
        const refreshToken = TokenHandler.createRefreshToken(user);

        if (accessToken && refreshToken) {
            // setting refresh cookie
            res.cookie("jid", refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 561600000), // cookie expires after 6.5 days
                path: "/user/refresh_token",
                sameSite: "Lax",
            });

            return {
                message: "Successfully logged in.",
                accessToken: accessToken,
            };
        } else {
            res.status(422);

            throw new AuthenticationError("Unable to create token.");
        }
    } else {
        res.status(401);

        throw new AuthenticationError("Incorrect credentials.");
    }
}

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
    },
};

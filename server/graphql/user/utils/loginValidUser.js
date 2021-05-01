import bcrypt from "bcrypt";
import TokenHandler from "../../../components/tokens/TokenHandler.js";
import ApolloServer from "apollo-server-express";
const { AuthenticationError } = ApolloServer;

export default async function loginValidUser(user, password, res) {
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

import User from "../../../components/user/user.model.js"; // TODO: move this inside GraphQL/
import bcrypt from "bcrypt";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/
import validateCreds from "../utils/validateCreds.js";

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
                        // TODO: it doesnt set the cookie
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
                        res.status(422);

                        return {
                            message: "Unable to create token.",
                            accessToken: null,
                        };
                    }
                } catch {
                    res.status(401);

                    return {
                        message:
                            "Unable to signup. Credentials are already taken.",
                        accessToken: null,
                    };
                }
            } else {
                res.status(400);
                return {
                    message: "Invalid credentials. Please try again.",
                    accessToken: null,
                };
            }
        },
    },
};

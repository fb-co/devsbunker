import TokenHandler from "./TokenHandler.js";
import User from "../user/user.model.js";

export async function getAccessToken(req, res, next) {
    const token = req.cookies.jid; // jid is an identifier for the refresh token

    if (!token) {
        next({
            message: "No token provided",
        });
    }

    const payload = TokenHandler.verifyRefreshToken(token);

    if (payload) {
        // token is valid
        // we can send back an access token

        try {
            const user = await User.findOne({
                _id: payload._id,
            });

            if (!user) {
                next({
                    message: "User not found",
                });
            }

            if (user.tokenVersion !== payload.tokenVersion) {
                next({
                    message: "Token not valid. User revoked the session.",
                });
            } else if (!user.enabled) {
                next({
                    message: "User is banned",
                });
            } else {
                res.json({
                    accessToken: TokenHandler.createAccessToken(user),
                });
            }
        } catch (err) {
            next(err);
        }
    } else {
        next({
            message: "Invalid token",
        });
    }
}

const TokenHandler = require("./TokenHandler");
const User = require("../user/user.model");
const SessionRevoker = require("./SessionRevoker");

exports.getAccessToken = async (req, res, next) => {
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

            if (user.tokenVersion !== payload.tokenVersion) {
                next({
                    message: "Token not valid. User revoked the session.",
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
};

exports.revokeUserSession = async (req, res) => {
    const status = await SessionRevoker.revokeRefreshToken(
        req.body.accessToken
    );
    if (status) {
        res.json({
            message: "Successfully revoked session",
            status: status,
        });
    } else {
        res.json({
            error: "Failed to revoke session",
            status: status,
        });
    }
};

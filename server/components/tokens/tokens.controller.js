const TokenHandler = require('./TokenHandler');
const User = require('../user/user.model');

exports.getAccessToken = async (req, res, next) => {
    const token = req.cookies.jid; // jid is an identifier for the refresh token

    if (!token) {
        next({
            message: 'No token provided'
        });
    }

    const payload = TokenHandler.verifyRefreshToken(token);

    if (payload) {
        // token is valid
        // we can send back an access token

        try {
            const user = await User.findOne({
                _id: payload._id
            });

            res.json({
                accessToken: TokenHandler.createAccessToken(user)
            });
        } catch (err) {
            next(err);
        }

    } else {
        next({
            message: 'Invalid token'
        });
    }

};
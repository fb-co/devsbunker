const bcrypt = require('bcrypt');
const Token = require('../tokens/tokenHandler');
const User = require('../user/user.model');

exports.signupPage = (req, res) => {
    res.json({
        message: 'DevsBunker Signup Page, make a post request with your credentials.',
    });
}

function validateCreds(cred) {
    return cred.username && cred.username.toString().trim() !== '' && /^[a-zA-Z0-9_-]+$/.test(cred.username) &&
        cred.email && cred.email.toString().trim() !== '' && /\S+@\S+\.\S+/.test(cred.email) &&
        cred.password && cred.password.toString().trim() !== '' && cred.password.length > 8;
}

exports.signupUser = async (req, res, next) => {
    if (validateCreds(req.body)) {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });

        try {
            const newUser = await user.save();

            const loginToken = Token.createWebToken(user);

            if (loginToken) {
                res.json({
                    message: 'Successfully signed up.',
                    token: loginToken
                });
            } else {
                res.json({
                    err: "Internal server error",
                    message: "Unable to create token"
                });
            }

        } catch (e) {
            res.json({
                err: e,
                message: "Unable to signup. Credentials may be already taken."
            });
        }

    } else {
        res.status(422);
        const error = new Error('Invalid credentials found.');
        next(error);
    }
};
const bcrypt = require('bcrypt');
const TokenHandler = require('../tokens/TokenHandler');
const tokenHandler = new TokenHandler();

const User = require('../user/user.model');

exports.getSignup = (req, res) => {
    res.json({
        message: 'DevsBunker Signup Page, make a post request with your credentials.',
    });
}

function validateCreds(creds) {
    return creds.username && creds.username.toString().trim() !== '' && /^[a-zA-Z0-9_-]+$/.test(creds.username) &&
        creds.email && creds.email.toString().trim() !== '' && /\S+@\S+\.\S+/.test(creds.email) &&
        creds.password && creds.password.toString().trim() !== '' && creds.password.length > 8;
}

function failedSignup(res, next, msg) {
    res.status(422);
    const error = new Error(msg)
    next(error);
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

            const loginToken = tokenHandler.createWebToken(user);

            if (loginToken) {
                res.json({
                    message: 'Successfully signed up.',
                    token: loginToken
                });
            } else {
                failedSignup(res, next, 'Unable to create token');
            }

        } catch (err) {
            failedSignup(res, next, 'Unable to signup.');
        }

    } else {
        failedSignup(res, next, 'Invalid credentials found.');
    }
};
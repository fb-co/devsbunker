const bcrypt = require('bcrypt');
const Token = require('../tokens/tokenHandler');
const User = require('../user/user.model');

exports.getSignup = (req, res) => {
    res.json({
        message: 'DevsBunker Signup Page, make a post request with your credentials.',
    });
}

function validateCreds(cred) {
    return cred.username && cred.username.toString().trim() !== '' && /^[a-zA-Z0-9_-]+$/.test(cred.username) &&
        cred.email && cred.email.toString().trim() !== '' && /\S+@\S+\.\S+/.test(cred.email) &&
        cred.password && cred.password.toString().trim() !== '' && cred.password.length > 8;
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

            const loginToken = Token.createWebToken(user);

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
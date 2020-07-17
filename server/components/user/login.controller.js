const bcrypt = require('bcrypt');
const Token = require('../tokens/tokenHandler');
const User = require('./user.model');

exports.getLogin = (req, res) => {
    res.json({
        message: 'DevsBunker Login Page',
    });
}

function failedLogin(res, next, msg) {
    res.status(422);
    const error = new Error(msg)
    next(error); // everything gets forwared to the error handler in server.js
}

exports.loginUser = async (req, res, next) => {
    const toLook = await User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then((result) => {
                        if (result) {
                            // set the JWT token (payload = user id and username) 
                            const loginToken = Token.createWebToken(user);

                            if (loginToken) {
                                res.json({
                                    message: 'Successfully logged in.',
                                    token: loginToken
                                });
                            } else {
                                failedLogin(res, next, 'Unable to create token.');
                            }


                        } else {
                            failedLogin(res, next, 'Unable to login.');
                        }

                    })
                    .catch(err => {
                        next(err); // this is an internal error (bcrypt error, if it cant match the hash then it just returns undefined, if we get here something has gone wrong)
                    })
            } else {
                failedLogin(res, next, 'Unable to login');
            }
        })
        .catch(err => {
            next(err); // db internal error
        });
};
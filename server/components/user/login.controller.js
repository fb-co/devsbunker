const bcrypt = require('bcrypt');
const Token = require('../tokens/tokenHandler');
const User = require('./user.model');

// Local Middleware
function failedLogin(res, next, msg) {
    res.status(422);
    const error = new Error(msg)
    next(error); // everything gets forwared to the error handler in server.js
}

/*
    This function takes a request and user as a parameter (assumes that the user is a valid user in the database) and will check to make sure the password is correct    
*/
function loginValidUser(req, res, user){
    bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) {
            // set the JWT token (payload = userByEmail id and username) 
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
    }).catch(err => {
        console.log(err);
        next(err); // this is an internal error (bcrypt error, if it cant match the hash then it just returns undefined, if we get here something has gone wrong)
    })        
}


// Route Handlers
exports.getLogin = (req, res) => {
    res.json({
        message: 'DevsBunker Login Page',
    });
}

exports.loginUser = async (req, res, next) => {
    const emailCheck = await User.findOne({
        email: req.body.email
    }).then(userByEmail => {
        if (userByEmail) {
            loginValidUser(req, res, userByEmail);
        } else {
            const usernameCheck = User.findOne({
                username: req.body.username    
            }).then(userByUsername => {
                if(userByUsername){
                    loginValidUser(req, res, userByUsername);        
                }else{
                    failedLogin(res, next, 'Your Username or Email is Incorrect');
                }
            }).catch(err => {
                        next(err); // db internal error    
            });
        }
    }).catch(err => {
        next(err); // db internal error
    });
};
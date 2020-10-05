import bcrypt from "bcrypt";
import TokenHandler from "../tokens/TokenHandler.js";

import User from "./user.model.js";

// Local Middleware
function failedLogin(res, next, msg) {
    res.status(422);
    const error = new Error(msg);
    next(error); // everything gets forwared to the error handler in server.js
}

/*
    This function takes a request and user as a parameter (assumes that the user is a valid user in the database) and will check to make sure the password is correct    
*/
function loginValidUser(req, res, next, user) {
    bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
            if (result) {
                const accessToken = TokenHandler.createAccessToken(user);
                const refreshToken = TokenHandler.createRefreshToken(user);

                if (accessToken && refreshToken) {
                    // setting refresh cookie
                    res.cookie("jid", refreshToken, {
                        httpOnly: true,
                        path: "/user/refresh_token",
                        sameSite: "Lax",
                        expires: new Date(Date.now() + 561600000), // cookie expires after 6.5 days
                    });

                    res.json({
                        message: "Successfully logged in.",
                        accessToken: accessToken,
                    });
                } else {
                    failedLogin(res, next, "Unable to create token.");
                }
            } else {
                failedLogin(res, next, "Incorrect credentials.");
            }
        })
        .catch((err) => {
            console.log(err);
            next(err); // this is an internal error (bcrypt error, if it cant match the hash then it just returns undefined, if we get here something has gone wrong)
        });
}

// Route Handlers
export function getLogin(req, res) {
    res.json({
        message: "DevsBunker Login Page",
    });
}

export async function loginUser(req, res, next) {
    const userID = req.body.userID;

    // will search the db for a valid username or email
    const userCheck = await User.findOne({
        $or: [
            {
                email: userID,
            },
            {
                username: userID,
            },
        ],
    })
        .then((user) => {
            if (user) {
                loginValidUser(req, res, next, user);
            } else {
                failedLogin(res, next, "Incorrect credentials.");
            }
        })
        .catch((err) => {
            next(err); //db internal error
        });
}

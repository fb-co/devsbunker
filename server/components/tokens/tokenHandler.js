const jwt = require('jsonwebtoken');

exports.createWebToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username
    };

    try {
        return jwt.sign(payload, process.env.LOGIN_SECRET, {
            expiresIn: '900000' // this is 15 minutes in milliseconds
        });
    } catch {
        return undefined;
    }
};

exports.checkHeaderToken = (req, res, next) => {
    // checking the token in the req header
    const authHeader = req.get('authorization');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (token) {
            // verify the token 
            jwt.verify(token, process.env.LOGIN_SECRET, (err, user) => {

                // this can be avoided but it is more readable 
                if (err) {
                    req.user = undefined;
                    next();
                } else {
                    req.user = user; // we can access the user in every req
                    next();
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }

};
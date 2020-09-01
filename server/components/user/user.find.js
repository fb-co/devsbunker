const User = require('./user.model');

exports.findUser = async (req, res, next) => {
    try {
        const result = await User.findOne({
            username: req.query.user
        });

        if (result) {
            const toServe = {
                username: result.username,
                createdAt: result.createdAt,
                tag: result.tag
            };

            res.json({
                user: toServe
            })
        } else {
            res.json({
                user: null
            });
        }

    } catch (err) {
        next(err);
    }

};
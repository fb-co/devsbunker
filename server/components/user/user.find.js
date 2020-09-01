//const User = require('./user.model');

// We need to make sure no one will spam new names in the url and DDOS us here
// For now the response sends back the entire JSON user obejct which is NOT what we want as it sends password and email
/*
exports.findUser = async (req, res, next) => {
    const requestedUser = req.body.foreign_username;

    const user = await User.findOne({ 
        username: requestedUser 
    }).then(user => {
        if(user) {
            res.json(user);
        }
    }).catch(err => {
        next(err);
    });
};
*/
exports.findUser = (req, res) => {
    res.json({
        message: "Find a user Page"
    });
}
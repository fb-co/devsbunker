export default function isAuthorized(req, res) {
    if (req.user) {
        res.json({
            user: req.user,
        });
    } else {
        res.json({
            message:
                "This is the auth process, make a request here with the authorization header to check if you are auhtorized to access specific routes.",
        });
    }
}

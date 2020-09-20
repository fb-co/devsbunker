export default function logoutUser(req, res, next) {
    try {
        res.cookie("jid", "", {
            // clearing the cookie
            httpOnly: true,
            path: "/user/refresh_token",
            sameSite: "Lax",
        });

        res.json({
            message: "Successfully logged out",
        });
    } catch (err) {
        next(err);
    }
}

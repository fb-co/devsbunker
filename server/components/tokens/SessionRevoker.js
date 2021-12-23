import User from "../user/user.model.js";

class SessionRevoker {
    static async revokeRefreshToken(jwtPayload) {
        if (jwtPayload) {
            const user = await User.findOne({
                _id: jwtPayload._id,
            });

            if (!user) return false;

            user.tokenVersion += 1;
            user.save();

            return true;
        } else {
            return false;
        }
    }
}

export default SessionRevoker;

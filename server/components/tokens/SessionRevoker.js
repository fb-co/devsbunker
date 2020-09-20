import User from "../user/user.model.js";
import TokenHandler from "./TokenHandler.js";

class SessionRevoker {
    static async revokeRefreshToken(token) {
        if (token) {
            const decoded = TokenHandler.verifyAccessToken(token);

            if (decoded) {
                const user = await User.findOne({
                    _id: decoded._id,
                });

                user.tokenVersion += 1;
                user.save();

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

export default SessionRevoker;

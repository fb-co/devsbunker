import getUserEntry from "../utils/getUserEntry.js";
import TokenHandler from '../../../components/tokens/TokenHandler.js';
import User from "../../../components/user/user.model.js"; 

export default {
    // queries a user entry from the db
    Query: {
        user: function (_, args, { res }) {
            return getUserEntry(args.username);
        },
    },
    Mutation: {
        updateUserDescription: async function(_, args, {res}) {
            const {description, token} = args;

            try {
                const jwtPayload = TokenHandler.verifyAccessToken(token);
    
                const user = await User.findOne({
                    _id: jwtPayload._id
                });
    
                user.desc = description;
                user.save();

                return {success: true}
            } catch {

                return {success: false}
            }

        }
    }
};

import getUserEntry from "../utils/getUserEntry.js";
import User from "../../../components/user/user.model.js"; 

export default {
    // queries a user entry from the db
    Query: {
        user: function (_, args, { res }) {
            return getUserEntry(args.username);
        },
    },
    Mutation: {
        updateUser: async function(_, args, {res}) {
            // TODO: make this 
            return {success: true}
        }
    }
};

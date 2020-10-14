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
            User.updateOne(
                { username: args.username }, 
                {
                    $set: { 
                        desc: args.fields.desc
                    }
                },
            );
            return {"Success": "true"}
        }
    }
};

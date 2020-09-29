import getUserEntry from "../utils/getUserEntry.js";

export default {
    Query: {
        user: function (_, args, { res }) {
            return getUserEntry(args.username);
        },
    },
};

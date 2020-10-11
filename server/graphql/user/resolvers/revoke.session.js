import SessionRevoker from "../../../components/tokens/SessionRevoker.js";

export default {
    Query: {
        revokeUserSession: async function (_, args) {
            return await SessionRevoker.revokeRefreshToken(args.token);
        },
    },
};

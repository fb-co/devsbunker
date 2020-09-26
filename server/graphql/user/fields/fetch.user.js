import graphql from "graphql";
const { GraphQLString } = graphql;

import FetchUserType from "../fetch.user.type.js";

// Utils
import getUserEntry from "../utils/getUserEntry.js";

const fetchUser = {
    type: FetchUserType,
    args: {
        username: { type: GraphQLString },
    },
    resolve: (root, args) => {
        return getUserEntry(args.username);
    },
};

export default fetchUser;

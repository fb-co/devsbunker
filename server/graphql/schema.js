import graphql from "graphql";
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;

import UserType from "./user/user.type.js";
import getUserEntry from "./user/getUserEntry.js";

const QueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",

    fields: () => ({
        user: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
            },
            resolve: (root, args) => {
                /* I think its because before I was returning the result of the promise in 'getUserEntry()' while now I literally return a promise and just call the promise */

                return getUserEntry(args.username);
            },
        },
    }),
});

export default new GraphQLSchema({
    query: QueryType,
});

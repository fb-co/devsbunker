import graphql from "graphql";
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;

// Fields
import signup from "./user/fields/signup.js";
import fetchUser from "./user/fields/fetch.user.js";

const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",

    fields: () => ({
        fetchUser,
    }),
});

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutations",

    fields: () => ({
        signup,
    }),
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

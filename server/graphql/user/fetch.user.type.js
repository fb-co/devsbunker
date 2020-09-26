import graphql from "graphql";
const { GraphQLObjectType, GraphQLString } = graphql;

const FetchUserType = new GraphQLObjectType({
    name: "FetchUser",
    description: "Fetch User Details",

    fields: () => ({
        username: {
            type: GraphQLString,
            resolve: (user) => user.username,
        },
        email: {
            type: GraphQLString,
            resolve: (user) => user.email,
        },
        tag: {
            type: GraphQLString,
            resolve: (user) => user.tag,
        },
    }),
});

export default FetchUserType;

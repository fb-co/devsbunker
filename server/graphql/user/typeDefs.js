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

const SignupResponse = new GraphQLObjectType({
    name: "SignupResponse",
    description: "What the user will get back once signed up",

    fields: () => ({
        message: {
            type: GraphQLString,
            resolve: (res) => res.message,
        },
        accessToken: {
            type: GraphQLString,
            resolve: (res) => res.accessToken,
        },
    }),
});

export { FetchUserType, SignupResponse };

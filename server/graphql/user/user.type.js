import graphql from "graphql";
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User Type",

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

export default UserType;

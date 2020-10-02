import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type FetchableUser {
        username: String!
        email: String!
        tag: String!
    }

    type Query {
        user(username: String!): FetchableUser
    }
`;

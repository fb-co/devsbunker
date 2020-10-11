import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type Query {
        revokeUserSession(token: String!): Boolean!
    }
`;

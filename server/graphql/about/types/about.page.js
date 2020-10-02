import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type AboutMessage {
        message: String!
    }

    type Query {
        about: AboutMessage!
    }
`;

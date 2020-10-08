import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type HomeMessage {
        message: String!
    }

    type Query {
        home: HomeMessage!
    }
`;

import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type LogoutResponse {
        message: String!
    }

    type Query {
        logoutUser: LogoutResponse!
    }
`;

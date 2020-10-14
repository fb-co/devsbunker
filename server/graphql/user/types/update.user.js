import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type UpdateResponse {
        message: String!
        accessToken: String
    }

    type Mutation {
        updateUser(
            username: String!
            fields: String!
        ): UpdateResponse!
    }
`;

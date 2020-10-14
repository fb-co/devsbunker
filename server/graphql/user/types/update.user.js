import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type UpdateResponse {
        success: Boolean!
    }

    type Mutation {
        updateUser(
            username: String!
            description: String!
            token: String!
        ): UpdateResponse!
    }
`;

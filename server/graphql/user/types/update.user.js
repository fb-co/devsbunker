import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type UpdateResponse {
        success: Boolean!
    }

    type Mutation {
        updateUser(
            description: String!
            token: String!
        ): UpdateResponse!
    }
`;

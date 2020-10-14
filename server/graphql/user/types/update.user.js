import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type UpdateDetailsResponse {
        success: Boolean!
    }

    type Mutation {
        updateUserDetails(
            description: String!
            token: String!
        ): UpdateDetailsResponse!
    }
`;

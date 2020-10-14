import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type UpdateDescriptionResponse {
        success: Boolean!
    }

    type Mutation {
        updateUserDescription(
            description: String!
            token: String!
        ): UpdateDescriptionResponse!
    }
`;

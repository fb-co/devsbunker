import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type SignupResponse {
        message: String!
        accessToken: String
    }

    type Mutation {
        signupResponse(
            username: String!
            email: String!
            password: String!
        ): SignupResponse!
    }
`;

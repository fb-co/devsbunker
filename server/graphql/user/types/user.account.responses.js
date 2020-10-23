import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type UserAccountAction {
        message: String!
        accessToken: String
    }

    type FetchableUser {
        username: String!
        email: String!
        desc: String!
        tag: String!
    }

    type FetchablePost {
        title: String!
        author: String!
        description: String!
        thumbnail: String!
        githubLink: String!
        otherLink: String!
        bunkerTag: String!
        clip: String!
    }

    type LogoutResponse {
        message: String!
    }

    # Are we actully using this one? [!]
    type EditedUserDetailsOutput {
        field: String!
        newValue: String!
    }

    # What the user updated
    type mutatedUserDetails {
        field: String!
        newValue: String!
    }

    type UpdateDetailsResponse {
        changedData: [mutatedUserDetails] # nullable array of updated user data
        message: String
    }

    input UpdateUserPayload {
        field: String!
        newValue: String!
    }

    type Query {
        user(username: String!): FetchableUser

        userPost(
            postTitle: String!
            postAuthor: String!
        ): FetchablePost

        loginUser(
            username: String
            email: String
            password: String!
        ): UserAccountAction!

        logoutUser: LogoutResponse!
    }

    type Mutation {
        signupUser(
            username: String!
            email: String!
            password: String!
        ): UserAccountAction!

        revokeUserSession(token: String!): Boolean!

        updateUserDetails(
            token: String!
            fields: [UpdateUserPayload!]!
        ): UpdateDetailsResponse!
    }
`;

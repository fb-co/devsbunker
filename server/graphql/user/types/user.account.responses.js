import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type UserAccountAction {
        message: String!
        accessToken: String
    }

    type Notification {
        read: Boolean!
        sender: String!
        message: String!
        type: String!
    }

    input NotificationPayload {
        message: String!
        type: String!
    }

    type FetchableUser {
        username: String!
        desc: String!
        tag: String!
        followers: [String]!
        following: [String]!
        liked_posts: [String]!
        profile_pic: String!
    }

    type PersonalUserDetails {
        username: String!
        email: String!
        notification: [Notification]
        desc: String!
        tag: String!
        followers: [String]!
        following: [String]!
        liked_posts: [String]!
        profile_pic: String!
    }

    type LogoutResponse {
        message: String!
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

        getPersonalDetails(token: String!): PersonalUserDetails

        partial_user(partial_username: String!): [FetchableUser]!

        loginUser(username: String, email: String, password: String!): UserAccountAction!

        logoutUser: LogoutResponse!
    }

    type Mutation {
        signupUser(username: String!, email: String!, password: String!): UserAccountAction!

        revokeUserSession(token: String!): Boolean!

        updateUserDetails(token: String!, fields: [UpdateUserPayload!]!): UpdateDetailsResponse!

        notifyUser(userToNotify: String!, notification: NotificationPayload!): Boolean

        followPerson(token: String!, person: String!): FetchableUser
    }
`;

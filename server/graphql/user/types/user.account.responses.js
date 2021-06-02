import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type GeneralActionStatus {
        success: Boolean!
        message: String
        stacktrace: [String]
    }

    type UserAccountAction {
        message: String!
        accessToken: String
    }

    type Notification {
        read: Boolean!
        sender: String!
        message: String!
        type: String!
        target: String!
        timestamp: String
    }

    input NotificationPayload {
        message: String!
        type: String!
    }

    type FetchableUser {
        id: String
        username: String!
        desc: String!
        tag: String!
        followers: [String]!
        following: [String]!
        followerAmt: Int!
        followingAmt: Int!
        isFollowing: Boolean
        liked_posts: [String]!
        profile_pic: String!
        is_following: Boolean
    }

    type LoadUsersResponse {
        users: [FetchableUser]!
        fetchedAll: Boolean
    }

    type PersonalUserDetails {
        username: String!
        email: String!
        notifications: [Notification]
        desc: String!
        tag: String!
        followers: [String]!
        following: [String]!
        liked_posts: [String]!
        profile_pic: String!
    }

    type FetchablePost {
        id: String!
        title: String!
        author: String!
        images: [PostImageObject]!
        description: String!
        thumbnail: String
        links: [String]
        collaborators: [String]
        tags: [String]
        likes: [String]!
        likeAmt: Int
        isLiked: Boolean
        isSaved: Boolean
        price: Float
        createdAt: String!
    }

    type downloadableUserData {
        user: PersonalUserDetails!
        posts: [FetchablePost]!
    }

    type LogoutResponse {
        message: String!
    }

    type UnreadNotificationsAmtResponse {
        amount: Int!
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
        user(username: String!, requester: String): FetchableUser

        getUsers(sortMethod: String!, lastUserId: String!, lastUniqueField: String): LoadUsersResponse!

        getPersonalDetails: PersonalUserDetails

        partial_user(
            partial_username: String!
            requester: String
        ): [FetchableUser]!

        loginUser(
            username: String
            email: String
            password: String!
        ): UserAccountAction!

        logoutUser: LogoutResponse!

        getUnreadNotifications: UnreadNotificationsAmtResponse!

        getUnreadNotificationsData: [Notification]!

        downloadUserData: downloadableUserData
    }

    type Mutation {
        signupUser(
            username: String!
            email: String!
            password: String!
        ): UserAccountAction!

        revokeUserSession: Boolean!

        updateUserDetails(fields: [UpdateUserPayload!]!): UpdateDetailsResponse!

        notifyUser(
            userToNotify: String!
            notification: NotificationPayload!
        ): Boolean

        followPerson(person: String!): FetchableUser

        unfollowPerson(person: String!): FetchableUser

        getAndReadNotifications: [Notification]!

        deleteAccount(password: String!): GeneralActionStatus!
    }
`;

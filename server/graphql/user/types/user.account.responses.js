import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type GeneralActionStatus {
        success: Boolean!
        message: String
        stacktrace: [String]
    }

    type UserLogin {
        message: String!
        accessToken: String
    }

    type UserSignup {
        message: String!
    }

    type Notification {
        read: Boolean!
        sender: String!
        message: String!
        type: String!
        target: String
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
        followerAmt: Int
        followingAmt: Int
        isFollowing: Boolean
        liked_posts: [String]!
        profile_pic: String!
    }

    type LoadUsersResponse {
        users: [FetchableUser]!
        fetchedAll: Boolean
    }

    type TagResponse {
        tag: String
        interactions: Int
        lastInteraction: Int
        manuallyAdded: Boolean
    }

    type PersonalUserDetails {
        username: String!
        email: String!
        notifications: [Notification]
        unreadNotifications: [Notification]
        unreadNotificationAmt: Int
        desc: String!
        tag: String!
        followers: [String]!
        following: [String]!
        liked_posts: [String]!
        profile_pic: String
        postsAmt: Int
        common_tags: [TagResponse]
        user_suggestions: [String]
    }

    type CommentResponse {
        id: String!
        userId: String!
        payload: String!
        createdAt: String!
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
        comments: [CommentResponse]
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

    type InteractWithTagsResponse {
        success: Boolean!
    }
    type CommonTagsResponse {
        tag: String!
        interactions: Int!
        manuallyAdded: Boolean!
    }

    input TagRequest {
        tag: String!
    }

    input UpdateUserPayload {
        field: String!
        newValue: String!
    }

    type Query {
        user(username: String!, requester: String): FetchableUser @rateLimit(limit: 300, duration: 300)

        getUsers(sortMethod: String!, lastUserId: String!, lastUniqueField: String): LoadUsersResponse! @rateLimit(limit: 50, duration: 300)

        getPersonalDetails: PersonalUserDetails @rateLimit(limit: 50, duration: 300)

        partialUser(partialUsername: String!, sortMethod: String!, lastUserId: String!, lastUniqueField: String!): LoadUsersResponse!
            @rateLimit(limit: 50, duration: 300)

        loginUser(username: String, email: String, password: String!): UserLogin! @rateLimit(limit: 20, duration: 3600)

        logoutUser: LogoutResponse!

        getUnreadNotifications: UnreadNotificationsAmtResponse! @rateLimit(limit: 50, duration: 300)

        getUnreadNotificationsData: [Notification]! @rateLimit(limit: 50, duration: 300)

        downloadUserData: downloadableUserData @rateLimit(limit: 2, duration: 86400)

        getUserById(id: String!): FetchableUser @rateLimit(limit: 50, duration: 300)
    }

    type Mutation {
        signupUser(username: String!, email: String!, password: String!): UserSignup! @rateLimit(limit: 2, duration: 86400)

        revokeUserSession: Boolean! @rateLimit(limit: 1, duration: 60)

        updateUserDetails(fields: [UpdateUserPayload!]!): UpdateDetailsResponse! @rateLimit(limit: 3, duration: 600)

        notifyUser(userToNotify: String!, notification: NotificationPayload!): Boolean

        followPerson(person: String!): FetchableUser @rateLimit(limit: 50, duration: 300)

        unfollowPerson(person: String!): FetchableUser @rateLimit(limit: 50, duration: 300)

        getAndReadNotifications: [Notification]! @rateLimit(limit: 50, duration: 300)

        setCommonTags(tags: [String]!): [CommonTagsResponse]!

        deleteAccount(password: String!): GeneralActionStatus! @rateLimit(limit: 2, duration: 86400)

        verifyUser(userId: String!, token: String!): GeneralActionStatus!
    }
`;

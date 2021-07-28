import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type GeneralActionStatus {
        success: Boolean!
        message: String
        stacktrace: [String]
    }

    type PostImageObject {
        ogname: String
        dbname: String
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
        comments: [CommentResponse]!
        fetchedAllComments: Boolean
    }

    type LoadPostsResponse {
        posts: [FetchablePost]!
        fetchedAll: Boolean!
    }
    type CommentReply {
        reply: String!
        replier: String!
    }
    type CommentResponse {
        id: String!
        userId: String!
        payload: String!
        replies: [CommentReply]!
        createdBy: String!
        createdAt: String!
    }
    type CommentReplyResponse {
        reply: String!
        replier: String!
        createdAt: String!
    }

    # we dont need the author because the username is alredy in the token
    input makePostInput {
        title: String!
        description: String!
        thumbnail: String
        images: [String]
        links: [String]
        collaborators: [String]
        tags: [String]
        price: Float
    }

    type savedPostOutput {
        success: Boolean
    }

    type Query {
        # It's better if we use the ID instead of the post title (maybe someone has 2 posts with the same title)
        # I am going to keep the author even if technically it's not needed, we will see later on
        userPost(postId: String!, postAuthor: String!): FetchablePost

        getPosts(sortingType: String!, lastPostId: String, lastUniqueField: String): LoadPostsResponse!

        getPostsByAuthor(author: String!, lastPostId: String!, lastUniqueField: String!, filter: String): LoadPostsResponse!

        # not sure if we should make the return required since I dont want it to crash if you give it an invalid post id
        getPostById(postId: String!, commentOffSet: Int): FetchablePost

        getSavedPosts(lastPostId: String!, lastUniqueField: String!, filter: String): LoadPostsResponse!

        partial_post(
            partial_name: String!
            filter: String!
            userToFilter: String
            sortingType: String
            lastPostId: String
            lastUniqueField: String
        ): LoadPostsResponse!
    }

    type Mutation {
        makePost(data: makePostInput): FetchablePost! @rateLimit(limit: 1, duration: 900)
        likePost(postId: String!): FetchablePost
        unlikePost(postId: String!): FetchablePost
        savePost(postId: String!): FetchablePost
        unSavePost(postId: String!): savedPostOutput
        commentOnPost(postId: String!, comment: String!, timestamp: String!): CommentResponse
        replyToComment(commentId: String!, reply: String!): CommentReplyResponse
        deletePost(postId: String!): GeneralActionStatus!
    }
`;

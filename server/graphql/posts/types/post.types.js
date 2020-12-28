import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
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
        bunkerTag: String!
        clip: String
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
        bunkerTag: String!
        clip: String
        price: Float
    }

    type savedPostOutput {
        success: Boolean
    }

    type Query {
        # It's better if we use the ID instead of the post title (maybe someone has 2 posts with the same title)
        # I am going to keep the author even if technically it's not needed, we will see later on
        userPost(postId: String!, postAuthor: String!): FetchablePost

        getPosts(sortingType: String!): [FetchablePost]!

        getPostsByAuthor(author: String!): [FetchablePost]!

        # not sure if we should make the return required since I dont want it to crash if you give it an invalid post id
        getPostById(postId: String!): FetchablePost

        getSavedPosts: [FetchablePost]

        partial_post(partial_name: String!): [FetchablePost]!

        loadMorePosts(alreadyFetched: Int): [FetchablePost]!
    }

    type Mutation {
        makePost(data: makePostInput): FetchablePost! # returning that post
        likePost(postId: String!): FetchablePost
        unlikePost(postId: String!): FetchablePost
        savePost(postId: String!): FetchablePost
        unSavePost(postId: String!): savedPostOutput
    }
`;

import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type FetchablePost {
        id: String!
        title: String!
        author: String!
        description: String!
        thumbnail: String
        links: [String]
        collaborators: [String]
        tags: [String]
        likes: [String]!
        likeAmt: Int
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

    type Query {
        # It's better if we use the ID instead of the post title (maybe someone has 2 posts with the same title)
        # I am going to keep the author even if technically it's not needed, we will see later on
        userPost(postId: String!, postAuthor: String!): FetchablePost

        getPosts(sortingType: String!): [FetchablePost]!
    }

    type Mutation {
        makePost(token: String!, data: makePostInput): FetchablePost! # returning that post

        likePost(token: String!, postId: String!): Int!
    }
`;

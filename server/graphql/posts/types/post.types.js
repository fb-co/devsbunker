import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
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

    type Query {
        # It's better if we use the ID instead of the post title (maybe someone has 2 posts with the same title)
        # I am going to keep the author even if technically it's not needed, we will see later on
        userPost(postId: String!, postAuthor: String!): FetchablePost
    }
`;

import Posts from "../../../components/post/post.model.js";

export default async function getUserPost(postId, postAuthor) {
    return new Promise((resolve) => {
        Posts.findOne({ _id: postId, author: postAuthor })
            .then((post) => {
                resolve(post);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

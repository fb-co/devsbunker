import Posts from "../../../components/post/post.model.js";

export default async function deletePost(postAuthor, postId) {
    if (!postAuthor && !postId) {
        throw new Error("Invalid params in function 'deletePost'");
    }

    if (postAuthor) {
        return new Promise((resolve) => {
            Posts.deleteMany({ author: postAuthor })
                .then((ret) => {
                    resolve(ret);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    } else {
        return new Promise((resolve) => {
            Posts.deleteOne({ _id: postId })
                .then((ret) => {
                    resolve(ret);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
}

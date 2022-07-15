import Posts from "../../../components/post/post.model.js";

export default async function getUserPost(postId, postAuthor) {
    return new Promise((resolve, reject) => {
        Posts.findOne({ _id: postId, author: postAuthor, enabled: true })
            .populate("comments")
            .exec()
            .then(async (post) => {
                if (post) {
                    resolve(post);
                } else {
                    reject(new Error("Unable to find post"));
                }
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

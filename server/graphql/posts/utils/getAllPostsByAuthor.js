import Posts from "../../../components/post/post.model.js";

export default function getAllPostsByAuthor(postAuthor) {
    return new Promise((resolve, reject) => {
        Posts.find({ author: postAuthor, enabled: true })
            .populate("comments")
            .exec()
            .then((posts) => {
                if (posts) {
                    resolve(posts);
                } else {
                    reject(new Error("Unable to find posts"));
                }
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

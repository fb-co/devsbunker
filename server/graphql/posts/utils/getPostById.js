import Posts from "../../../components/post/post.model.js";

export default async function getUserPost(postId) {
    return new Promise((resolve, reject) => {
        Posts.findOne({ _id: postId, enabled: true })
            .populate("comments")
            .exec()
            .then((post) => {
                if (post) {
                    resolve(post);
                } else {
                    reject(new Error("Unabled to find post"));
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

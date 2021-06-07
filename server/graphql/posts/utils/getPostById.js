import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";

export default async function getUserPost(postId) {
    return new Promise((resolve, reject) => {
        Posts.findOne({ _id: postId, enabled: true })
            .then((post) => {
                if (posts) {
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

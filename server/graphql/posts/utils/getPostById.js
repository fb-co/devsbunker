import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";

export default async function getUserPost(postId) {
    return new Promise((resolve) => {
        Posts.findOne({ _id: postId })
            .then((post) => {
                resolve(post);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

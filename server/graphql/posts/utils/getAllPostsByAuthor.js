import Posts from "../../../components/post/post.model.js";

export default function getAllPostsByAuthor(postAuthor) {
    return new Promise((resolve, reject) => {
        Posts.find({ author: postAuthor, enabled: true })
            .then((posts) => {
                if (posts) {
                    resolve(posts);
                } else {
                    reject(new Error("Unable to find posts"));
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

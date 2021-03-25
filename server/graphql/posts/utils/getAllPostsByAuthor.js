import Posts from "../../../components/post/post.model.js";

export default async function getAllPostsByAuthor(postAuthor) {
    return new Promise((resolve) => {
        Posts.find({ author: postAuthor })
            .then((posts) => {
                resolve(posts);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

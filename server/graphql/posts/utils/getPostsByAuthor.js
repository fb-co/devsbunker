import Posts from "../../../components/post/post.model.js";

export default async function getPostsByAuthor(author) {
    return new Promise((resolve) => {
        Posts.find({ author: author })
            .then((posts) => {
                resolve(posts);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

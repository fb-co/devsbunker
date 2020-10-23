import Posts from "../../../components/post/post.model.js"; // the db

// gets user document from db with a username parameter, we could also make another for the id if you want
export default async function getUserPost(postTitle, postAuthor) {
    return new Promise((resolve) => {
        Posts.findOne({ title: postTitle, author: postAuthor })
            .then((post) => {
                resolve(post);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
import Posts from "../../../components/post/post.model.js";

export default async function getPostsByAuthor(author) {
    return new Promise((resolve) => {
        Posts.find({ author: author })
            .then((posts) => {           
                // calculate the number of likes 
                for (let i = 0; i < posts.length; i++) {
                    posts[i].likeAmt = posts[i].likes.length;
                }
    
                resolve(posts);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

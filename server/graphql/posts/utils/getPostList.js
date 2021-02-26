import Posts from "../../../components/post/post.model.js";

export default async function getPostList(sortingMethod) {
    return new Promise((resolve) => {
        if (sortingMethod == "Newest") {
            Posts.find()
                .sort({ _id: -1 })
                .limit(3)
                .then((posts) => {        
                    resolve(posts);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (sortingMethod == "Most Popular") {
            Posts.find()
                .sort({ likeAmt: -1 })
                .then((posts) => {        
                    resolve(posts);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
}

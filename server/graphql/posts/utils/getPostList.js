import Posts from "../../../components/post/post.model.js";

export default async function getPostList(sortingMethod, loadAmt, lastPostId) {
    return new Promise((resolve) => {
        const loadIncrement = loadAmt; // how many posts are to be loaded at once

        if (sortingMethod == "Newest") {
            // start the post finding from the lastId, or if its null, -1
            if (lastPostId != 0) {
                Posts.find({ '_id': { '$lt': lastPostId } })
                    .sort({ _id: -1 })
                    .limit(loadIncrement)
                    .then((posts) => { 
                        resolve(posts);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                Posts.find()
                    .sort({ _id: -1 })
                    .limit(loadIncrement)
                    .then((posts) => {        
                        resolve(posts);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } else if (sortingMethod == "Most Popular") {
            Posts.find({ 'id': { '$lt': lastPostId } })
                .sort({ likeAmt: -1 })
                .limit(loadIncrement)
                .then((posts) => {        
                    resolve(posts);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
}

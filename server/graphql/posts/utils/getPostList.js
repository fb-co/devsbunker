import Posts from "../../../components/post/post.model.js";

export default async function getPostList(sortingMethod, lastId) {
    return new Promise((resolve) => {
        const loadIncrement = 3; // how many posts are to be loaded at once

        if (sortingMethod == "Newest") {
            // start the post finding from the lastId, or if its null, 0
            if (lastId != null) {
                Posts.find({ 'id': { '$gt': lastId || 0 } })
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
            Posts.find({ 'id': { '$gt': lastId||0 } })
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

// This is the general load more module, you can add this to any query to get a loadMore response (frontend still needs to be handled accordingly)

import Posts from "../../../components/post/post.model.js";

// custom queries is an array of what exactly you want these posts to be relating to, specific user 
export default function loadMoreModule(sortingType, lastPostId, lastUniqueField, loadAmt, customQueries) {
    return new Promise((resolve) => {
        let sortFilter = {};

        // the initial query, reeguardless of filter, will always be the same with the sortFilterb eing the differentiator
        let postQuery = {
            $and: customQueries
        };

        if (sortingType === "Newest") {
            sortFilter = { _id: -1 };
            
            if (lastPostId != 0) {
                postQuery = {
                    $and: customQueries,
                    _id: { $lt: lastPostId }
                };
            }
        } else if (sortingType === "Most Popular") {
            sortFilter = { likeAmt: -1, _id: -1 };

            if (lastPostId != 0 && lastUniqueField != -1) {
                postQuery = {
                    $or: [
                        {
                            $and: customQueries,
                            likeAmt: { $lt: lastUniqueField },
                        }, 
                        {
                            $and: customQueries,
                            likeAmt: lastUniqueField,
                            _id: { $lt: lastPostId },
                        }
                    ]
                };
            }
        }

        // query the db
        Posts.find(postQuery)
            .sort(sortFilter)
            .limit(loadAmt+1)
            .then((results) => {
                resolve(results);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
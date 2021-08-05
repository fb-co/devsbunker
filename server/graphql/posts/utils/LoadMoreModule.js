// This is the general load more module, you can add this to any query to get a loadMore response (frontend still needs to be handled accordingly)

import Posts from "../../../components/post/post.model.js";

// custom queries is an array of what exactly you want these posts to be relating to, specific user (REQUIRES AT LEAST ONE)
export default function loadMoreModule(sortingType, lastPostId, lastUniqueField, loadAmt, customQueries, customSorting) {
    return new Promise((resolve, reject) => {
        let sortFilter = customSorting || {};

        // the initial query, reeguardless of filter, will always be the same with the sortFilter being the differentiator
        let postQuery = {
            $and: customQueries,
            enabled: true,
        };

        if (sortingType === "Newest") {
            sortFilter = { _id: -1 };

            if (lastPostId != 0) {
                postQuery = {
                    $and: customQueries,
                    _id: { $lt: lastPostId },
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
                        },
                    ],
                };
            }
        }

        // query the db
        Posts.find(postQuery)
            .sort(sortFilter)
            .limit(loadAmt + 1)
            .then((results) => {
                if (results) {
                    resolve(results);
                } else {
                    reject(new Error("Unable to find posts"));
                }
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

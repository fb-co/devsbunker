import Posts from "../../../components/post/post.model.js";

// The reason you fetch load amount + 1 is because you need to make sure that you havent fetched all the posts yet.
// So by getting the loadInc+1, you can see if that extra post exists or not to see if they have all been fetched or nots

// NOTE: we dont need comments so we dont' populate().exec()
export default async function getPostList(sortingMethod, loadAmt, lastPostId, lastUniqueField) {
    return new Promise((resolve, reject) => {
        const loadIncrement = loadAmt; // how many posts are to be loaded at once

        if (sortingMethod == "Newest") {
            // start the post finding from the lastId, or if its null, -1
            if (lastPostId != 0) {
                Posts.find({ _id: { $lt: lastPostId }, enabled: true })
                    .sort({ _id: -1 })
                    .limit(loadIncrement + 1)
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
            } else {
                Posts.find({ enabled: true })
                    .sort({ _id: -1 })
                    .limit(loadIncrement + 1)
                    .then((posts) => {
                        if (posts) {
                            resolve(posts);
                        } else {
                            reject(posts);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            }
        } else if (sortingMethod == "Most Popular") {
            // if the lastPostId and lastUnique field are defined
            if (lastUniqueField != -1 && lastPostId != 0) {
                Posts.find({
                    $or: [
                        { likeAmt: { $lt: lastUniqueField } },
                        {
                            likeAmt: lastUniqueField,
                            _id: { $lt: lastPostId },
                        },
                    ],
                    enabled: true,
                })
                    .sort({ likeAmt: -1, _id: -1 })
                    .limit(loadIncrement + 1)
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
            } else {
                // if its the first time getting any posts with this filter
                Posts.find({ enabled: true })
                    .sort({ likeAmt: -1, _id: -1 })
                    .limit(loadIncrement + 1)
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
            }
        }
    });
}

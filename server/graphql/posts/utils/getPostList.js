import Posts from "../../../components/post/post.model.js";


// The reason you fetch load amount + 1 is because you need to make sure that you havent fetched all the posts yet.
// So by getting the loadInc+1, you can see if that extra post exists or not to see if they have all been fetched or nots
export default async function getPostList(sortingMethod, loadAmt, lastPostId, lastUniqueField) {
    return new Promise((resolve) => {
        const loadIncrement = loadAmt; // how many posts are to be loaded at once

        if (sortingMethod == "Newest") {
            // start the post finding from the lastId, or if its null, -1
            if (lastPostId != 0) {
                Posts.find({ '_id': { '$lt': lastPostId } })
                    .sort({ _id: -1 })
                    .limit(loadIncrement+1)
                    .then((posts) => { 
                        resolve(posts);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                Posts.find()
                    .sort({ _id: -1 })
                    .limit(loadIncrement+1)
                    .then((posts) => {        
                        resolve(posts);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } else if (sortingMethod == "Most Popular") {
            //Posts.find({ 'id': { '$lt': lastPostId } })
            console.log(lastUniqueField);
            //console.log(lastPostId);
            
            // if the lastPostId and lastUnique field are defined 
            if (lastUniqueField != -1 && lastPostId != 0) {
                Posts.find({
                    $or: [
                        { likeAmt: { $lt: lastUniqueField } },
                        { 
                            likeAmt: lastUniqueField,
                            _id: { $lt: lastPostId } 
                        }
                    ]
                })
                    .sort({ likeAmt: -1, _id: -1 })
                    .limit(loadIncrement+1)
                    .then((posts) => {        
                        resolve(posts);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                // if its the first time getting any posts with this filter
                Posts.find()
                    .sort({ likeAmt: -1 })
                    .limit(loadIncrement+1)
                    .then((posts) => {        
                        resolve(posts);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
                
        }
    });
}

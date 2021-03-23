import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";

export default async function getPostsByAuthor(author, lastPostId, loadAmt, filter, lastUniqueField, jwtPayload) {
    let requesterUser;

    if (jwtPayload) {
        requesterUser = await User.findOne({ username: jwtPayload.username }, { username: 1, liked_posts: 1, saved_posts: 1 });
    }
    //console.log(fetchedAmount);

    return new Promise((resolve) => {
        if (lastPostId != -1) { // if you havent fetched all the posts yet
            if (filter === "Newest") {
                if (lastPostId != 0) { // if you havent fetched any posts yet
                    Posts.find({
                        $and: [
                            { author: author },
                            { _id: { $lt: lastPostId } }
                        ]
                    })
                        .sort({ _id: -1 })
                        .limit(loadAmt+1)
                        .then((posts) => {  
                            if (requesterUser) {
                                const finalPosts = AddDynamicData.addAll(posts, requesterUser);
                                    
                                resolve(finalPosts);
                            }
                            resolve(posts)
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    Posts.find({ author: author })
                        .sort({ _id: -1 })
                        .limit(loadAmt+1)
                        .then((posts) => {  
                            if (requesterUser) {
                                const finalPosts = AddDynamicData.addAll(posts, requesterUser);
                                    
                                resolve(finalPosts);
                            }
                            resolve(posts)
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            } else if (filter == "Most Popular") {
                if (lastPostId != 0 && lastUniqueField != -1) {
                    Posts.find({
                        $or: [
                            {   
                                author: author,
                                likeAmt: { $lt: lastUniqueField } 
                            },
                            { 
                                author: author,
                                likeAmt: lastUniqueField,
                                _id: { $lt: lastPostId } 
                            }
                        ]
                    })
                        .sort({ likeAmt: -1, _id: -1 })
                        .limit(loadAmt+1)
                        .then((posts) => {  
                            if (requesterUser) {
                                const finalPosts = AddDynamicData.addAll(posts, requesterUser);
                                    
                                resolve(finalPosts);
                            }
                            resolve(posts)
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    Posts.find({ author: author })
                        .sort({ likeAmt: -1, _id: -1 })
                        .limit(loadAmt+1)
                        .then((posts) => {  
                            if (requesterUser) {
                                const finalPosts = AddDynamicData.addAll(posts, requesterUser);
                                    
                                resolve(finalPosts);
                            }
                            resolve(posts)
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        }
    });
}

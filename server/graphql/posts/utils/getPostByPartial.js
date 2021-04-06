import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import mongoose from "mongoose";

// userToFilter is the username of the author you want to search based on. Example -> search only the posts of this username
export default async function getPostByPartial(partial_name, filter, userToFilter, sortingType, lastPostId, lastUniqueField, loadAmt, requester_token) {
    let user;
    
    if (requester_token) {
        const jwtPayload = requester_token;

        if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

        user = await User.findOne({ username: jwtPayload.username});
    } else if (filter === "myProjects" || filter === "saved") {
        // you need to requester token if you are querying with these filters
        throw new AuthenticationError("Unauthorized.");
    }
    
    return new Promise((resolve) => {
        const regex = new RegExp(partial_name, "i");

        if (filter === "none") {
            Posts.find({ title: regex })
            .limit(loadAmt+1)
            .then((posts) => { 
                if (user) {
                    const finalPosts = AddDynamicData.addAll(posts, user);
                    resolve(finalPosts);
                }
                resolve(posts);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            // search based on some filter
            try {
                let postQuery;
                if (lastPostId != -1) {
                    if (filter === "saved") {
                        // need to find the posts objects since they are not contained in the user db document
                        let userPosts = user.saved_posts;

                        // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
                        for (let i = 0; i < userPosts.length; i++) {
                            userPosts[i] = new mongoose.Types.ObjectId(userPosts[i]);
                        } 
                        postQuery = { _id: { $in: userPosts } };
                    } else if (filter === "myProjects") {
                        postQuery = { author: userToFilter };
                    }
                    if (sortingType == "Newest") {
                        // NEWEST POST SORT LOGIC
                        if (lastPostId != 0) {
                            Posts.find({
                                $and: [
                                    postQuery,
                                    { _id: { $lt: lastPostId } },
                                    { title: regex }
                                ]
                            })
                            .limit(loadAmt+1)
                            .sort({ _id: -1 })
                            .then((results) => {
                                if (user) {
                                    const finalPosts = AddDynamicData.addAll(results, user);
                                    resolve(finalPosts);
                                }
                                resolve(results);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        } else {
                            Posts.find({
                                $and: [
                                    postQuery,
                                    { title: regex }
                                ]
                            })
                            .sort({ _id: -1 })
                            .limit(loadAmt+1)
                            .then((results) => {
                                if (user) {
                                    const finalPosts = AddDynamicData.addAll(results, user);
                                    resolve(finalPosts);
                                }
                                resolve(results);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        }
                    } else if (sortingType == "Most Popular") {
                        // MOST POPULAR SORT LOGIC
                        if (lastPostId != 0 && lastUniqueField != -1) {
                            Posts.find({
                                $or: [
                                    {
                                        postQuery,
                                        likeAmt: { $lt: lastUniqueField }
                                    },
                                    {
                                        $and: [
                                            postQuery,
                                            { _id: { $lt: lastPostId } },
                                            { title: regex }
                                        ],
                                        likeAmt: { $lt: lastUniqueField }
                                    }
                                ]
                            })
                            .sort({ likeAmt: -1, _id: -1 })
                            .limit(loadAmt+1)
                            .then((results) => {
                                if (user) {
                                    const finalPosts = AddDynamicData.addAll(results, user);
                                    resolve(finalPosts);
                                }
                                resolve(results);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        }
                    }
                } else {
                    Posts.find({
                        $and: [
                            postQuery,
                            { title: regex }
                        ]
                    })
                    .limit(loadAmt+1)
                    .then((results) => {
                        if (user) {
                            const finalPosts = AddDynamicData.addAll(results, user);
                            resolve(finalPosts);
                        }
                        resolve(results);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            } catch (err) {
                throw new Error("There was a problem: " + err);
            }
        }
    });
}
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
    
    // notes for when I pick this up: you can't run conditional queries in and or or chains because they will always evaluate to false (just dont use them)
    return new Promise((resolve) => {
        const regex = new RegExp(partial_name, "i");
        
        let postQuery = {};

        // craft the query using all the variables and data
        if (filter === "saved") {
            
        } else if (filter === "myProjects") {

        }
        
        
        
        /* Old poo poo query (leaving for ref) 
        const lastPostIdQuery = lastPostId!=0 ? { _id: { $lt: lastPostId } } : {};
        //const lastUniqueFieldQuery = lastUniqueField!=-1 ? { likeAmt: { $lt: lastUniqueField } } : {};
        let postQuery = {
            $and: [
                { _id: { $in: userPosts } },
                { title: regex },
                lastPostIdQuery,
            ]
        }; // post query for the filter, like filtering out for a certain title or name
        
        try {
            // get a query for the post filter
            if (filter === "saved") {
                let userPosts = user.saved_posts;

                // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
                for (let i = 0; i < userPosts.length; i++) {
                    userPosts[i] = new mongoose.Types.ObjectId(userPosts[i]);
                } 

                postQuery = { _id: { $in: userPosts } };
            } else if (filter === "myProjects") {
                postQuery = { author: userToFilter };
            }

            // get posts given a sorting type
            if (sortingType === "Newest") {
                console.log(lastPostId);
                Posts.find(postQuery)
                .sort({ _id: -1 })
                .limit(loadAmt + 1)
                .then((posts) => {
                    if (user) {
                        resolve(AddDynamicData.addAll(posts, user));
                    }
                    resolve(posts);
                })
                .catch((err) => {
                    console.log(err);
                });
            } else if (sortingType === "Most Popular") {
                if (lastUniqueField != -1) {
                    console.log(postQuery);
                    Posts.find({
                        $or: [
                            {
                                //postQuery,
                                title: regex,
                                likeAmt: { $lt: lastUniqueField },
                            }, 
                            {
                                //postQuery,
                                title: regex,
                                likeAmt: lastUniqueField,
                                _id: { $lt: lastPostId },
                            }
                        ]
                    })
                    .sort({ likeAmt: -1, _id: -1 })
                    .limit(loadAmt+1)
                    .then((results) => {
                        console.log(results);
                        if (user) {
                            resolve(AddDynamicData.addAll(results, user));
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
                    .sort({ likeAmt: -1, _id: -1 })
                    .limit(loadAmt+1)
                    .then((results) => {
                        if (user) {
                            resolve(AddDynamicData.addAll(results, user));
                        }
                        resolve(results);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }   
            }
        } catch (err) {
            throw new Error("There was a problem: " + err);
        }
        */
    });
}
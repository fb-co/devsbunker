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
        
        let postQuery = {};  // the actual query
        let sortFilter = {}; // how the query should be sorted
        let filter;          // the filter (which author, all posts, only saved, etc)

        // determain the filter
        // get a query for the post filter (its an array so you can easily append the values to the final query)
        // I REALLY want to find a better way to handle the filter, but for now this works
        if (filter === "saved") {
            let userPosts = user.saved_posts;

            // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
            for (let i = 0; i < userPosts.length; i++) {
                userPosts[i] = new mongoose.Types.ObjectId(userPosts[i]);
            } 

            filter = [ "_id", { $in: userPosts } ];
        } else if (filter === "myProjects") {
            filter = [ "author", userToFilter ];
        }

        // craft the query using all the variables and data
        
        // default query if nothing has been fetched yet reguardless of sortingType (the sort will differentiate the two)
        postQuery = {
            title: regex,
        };
        if (filter) postQuery[filter[0]] = filter[1]; // I know this is confusing but using an array is the simplest way to do this for any data
        

        if (sortingType === "Newest") {
            sortFilter = { _id: -1 };
            
            if (lastPostId != 0) {
                postQuery = {
                    title: regex,
                    _id: { $lt: lastPostId }
                };
                if (filter) postQuery[filter[0]] = filter[1];
            }
        } else if (sortingType === "Most Popular") {
            sortFilter = { likeAmt: -1, _id: -1 };

            if (lastPostId != 0 && lastUniqueField != -1) {
                postQuery = {
                    $or: [
                        {
                            title: regex,
                            likeAmt: { $lt: lastUniqueField },
                        }, 
                        {
                            title: regex,
                            likeAmt: lastUniqueField,
                            _id: { $lt: lastPostId },
                        }
                    ]
                };
                // add the filter
                if (filter) {
                    postQuery.$or[0][filter[0]] = filter[1];
                    postQuery.$or[1][filter[0]] = filter[1];
                }
            }
        }
        
        Posts.find(postQuery)
        .sort(sortFilter)
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
    });
}
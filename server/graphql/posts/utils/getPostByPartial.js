// import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import LoadMoreModule from "./LoadMoreModule.js";
import AddDynamicData from "../misc/addDynamicData.js";
import mongoose from "mongoose";

// userToFilter is the username of the author you want to search based on. Example -> search only the posts of this username
// filter is something like: saved, myProjects, etc.
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
        let customQueries = [];

        // see if there is an inline filter (search by tag, author, etc)
        if (partial_name.substring(0, 4) === "tag:") {
            customQueries.push({ tags: new RegExp(partial_name.substring(4), "i") });
            console.log(customQueries);
        } else if (partial_name.substring(0, 7) === "author:") {
            customQueries.push({ author: new RegExp(partial_name.substring(7), "i") });
        } else {
            customQueries.push({ title: regex });
        }

        // add a filter like "myProjects" or "savedProjects" to the query
        if (filter === "saved") {
            let userPosts = user.saved_posts;

            // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
            for (let i = 0; i < userPosts.length; i++) {
                userPosts[i] = new mongoose.Types.ObjectId(userPosts[i]);
            } 

            customQueries.push({ _id: { $in: userPosts} });
        } else if (filter === "myProjects") {
            customQueries.push({ author: userToFilter });
        }
        
        LoadMoreModule(sortingType, lastPostId, lastUniqueField, loadAmt, customQueries).then((res) => {
            if (user) {
                resolve(AddDynamicData.addAll(res, user));
            }
            resolve(res);
        });
    });
}
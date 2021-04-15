import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import LoadMoreModule from "./LoadMoreModule.js";
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
        
        // this is what the loadMoremodule requires
        let customQueries = [
            { title: regex },
        ];
        
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

        const posts = LoadMoreModule(sortingType, lastPostId, lastUniqueField, loadAmt, customQueries);
        
        if (user) {
            resolve(AddDynamicData.addAll(posts, user));
        }
        resolve(posts);
    });
}
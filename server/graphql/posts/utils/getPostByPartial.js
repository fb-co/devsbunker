// import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import LoadMoreModule from "./LoadMoreModule.js";
import loadMoreModuleAggregation from "./LoadMoreModuleAggregation.js";
import AddDynamicData from "../misc/addDynamicData.js";
import mongoose from "mongoose";

// userToFilter is the username of the author you want to search based on. Example -> search only the posts of this username
// filter is something like: saved, myProjects, etc.
export default async function getPostByPartial(partial_name, filter, userToFilter, sortingType, lastPostId, lastUniqueField, loadAmt, requester_token) {
    let user;

    if (requester_token) {
        const jwtPayload = requester_token;

        if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

        user = await User.findOne({ username: jwtPayload.username });
    } else if (filter === "myProjects" || filter === "saved") {
        // you need to requester token if you are querying with these filters
        throw new AuthenticationError("Unauthorized.");
    }

    return new Promise((resolve) => {
        const regex = new RegExp(partial_name, "i");
        let customQueries = [];
        let pipelineOperators = []; // this is only used if the query ends up using the aggregation query

        // see if there is an inline filter (search by tag, author, etc)
        if (partial_name.substring(0, 4) === "tag:") {

            // process the taglist into an array and strip any whitespace and convert to regExp
            const tagList = partial_name.substring(4).split(",");

            for (let i = 0; i < tagList.length; i++) {
                tagList[i] = new RegExp(tagList[i].trim(), "i");
            }
            
            // find all posts which contain all the tags
            customQueries.push({ tags: { $all: tagList }, enabled: true });

            pipelineOperators.push({ $match: { tags: { $in: tagList } } });
        } else if (partial_name.substring(0, 7) === "author:") {
            customQueries.push({ author: new RegExp(partial_name.substring(7), "i"), enabled: true });
            
            pipelineOperators.push({ $match: { author: new RegExp(partial_name.substring(7), "i") } });
        } else {
            customQueries.push({ title: regex, enabled: true });

            pipelineOperators.push({ $match: { title: regex } });
        }

        // add a filter like "myProjects" or "savedProjects" to the query
        if (filter === "saved") {
            let userPosts = user.saved_posts;

            // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
            for (let i = 0; i < userPosts.length; i++) {
                userPosts[i] = new mongoose.Types.ObjectId(userPosts[i]);
            }

            customQueries.push({ _id: { $in: userPosts }, enabled: true });
            pipelineOperators.push({ $match: { _id: { $in: userPosts } } });
        } else if (filter === "projects") {
            customQueries.push({ author: userToFilter, enabled: true });
            pipelineOperators.push({ $match: { author: userToFilter } });
        }

        // add any cases here where the aggregation pipline is requried (ex. targeted post feed search)
        // you will also need to craft custom pipline operators
        if (filter === "targeted") {
            // no custom operators for this filter since I want users to be able to find any posts from this searhbar anyway

            loadMoreModuleAggregation(sortingType, lastPostId, lastUniqueField, loadAmt, pipelineOperators).then((res) => {
                if (user) {
                    resolve(AddDynamicData.addAll(res, user));
                } else {
                    resolve(res);
                }
            });
        } else {
            LoadMoreModule(sortingType, lastPostId, lastUniqueField, loadAmt, customQueries).then((res) => {
                if (user) {
                    resolve(AddDynamicData.addAll(res, user));
                }
                resolve(res);
            });
        }   
    });
}

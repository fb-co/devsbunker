// import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import LoadMoreModule from "./LoadMoreModule.js";
import mongoose from "mongoose";

export default async function getSavedPosts(author, loadAmt, lastPostId, filter, lastUniqueField) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: author, enabled: true })
            .then((user) => {
                if (user) {
                    let wrappedPosts = user.saved_posts;
                    let customQueries = [];

                    // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
                    for (let i = 0; i < wrappedPosts.length; i++) {
                        wrappedPosts[i] = new mongoose.Types.ObjectId(wrappedPosts[i]);
                    }

                    customQueries.push({ _id: { $in: wrappedPosts }, enabled: true });

                    // Dont change this to the await syntax because it will break everything
                    LoadMoreModule(filter, lastPostId, lastUniqueField, loadAmt, customQueries).then((res) => {
                        const finalPosts = AddDynamicData.addAll(res, user);
                        resolve(finalPosts);
                    });
                } else {
                    reject(new Error("Unable to find user"));
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

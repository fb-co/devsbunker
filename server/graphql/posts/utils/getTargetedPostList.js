import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import LoadMoreModule from "./LoadMoreModule.js";
import LoadMoreModuleAggregation from "./LoadMoreModuleAggregation.js";

export default async function getTargetedPostList(username, lastPostId, lastUniqueField, loadAmt) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username, enabled: true }).then((user) => {
            if (user) {
                /*
                let customQueries = [];
                

                // account for their followers posts
                customQueries.push({ author: { $in: user.following } });
                customQueries.push({ tags: { $in: user.tags }, enabled: true });

                
                LoadMoreModule("Newest", lastPostId, lastUniqueField, loadAmt, customQueries).then((res) => {
                    const finalPosts = AddDynamicData.addAll(res, user);
                    resolve(finalPosts);
                });
                */

                LoadMoreModuleAggregation("Newest", lastPostId, lastUniqueField, loadAmt, []).then((res) => {
                    const finalPosts = AddDynamicData.addAll(res, user);

                    console.log(finalPosts);
                    resolve(finalPosts);
                });


            } else {
                reject(new Error("Unable to find user"));
            }
        }).catch((err) => {
            console.error(err);
            reject(err);
        });
    });
}

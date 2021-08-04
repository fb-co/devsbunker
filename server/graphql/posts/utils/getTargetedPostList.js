import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import LoadMoreModule from "./LoadMoreModule.js";

export default async function getTargetedPostList(username, lastPostId, lastUniqueField, loadAmt) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username, enabled: true }).then((user) => {
            if (user) {
                let customQueries = [];

                // get the users intrested tags in a simple array
                let tagList = [];

                for (let i = 0; i < user.common_tags.length; i++) {
                    tagList.push(user.common_tags[i].tag);
                }

                customQueries.push({ tags: { $in: tagList }, enabled: true });
                

                LoadMoreModule("Newest", lastPostId, lastUniqueField, loadAmt, customQueries).then((res) => {
                    const finalPosts = AddDynamicData.addAll(res, user);
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

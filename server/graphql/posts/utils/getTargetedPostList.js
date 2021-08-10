import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import UserInterestData from "../misc/userInterestData.js";
import LoadMoreModuleAggregation from "./LoadMoreModuleAggregation.js";


export default async function getTargetedPostList(username, lastPostId, lastUniqueField, loadAmt) {
    return new Promise(async (resolve, reject) => {
        User.findOne({ username: username, enabled: true }).then(async (user) => {
            if (user) {
                // update the users interaction tags based on elapsed time
                user.common_tags = UserInterestData.checkTagTimestamps(user.common_tags);
                await user.save();

                // because the tags in the db are sorted by interaction amount, we can assume the user will be more intrested in the first ones
                const tagList = [];

                for (let i = 0; i < user.common_tags.length; i++) {
                    tagList.push(user.common_tags[i].tag);
                }
                
                const pipelineOperators = [
                    {$match: {$or: [
                        {"tags": {$in: tagList.splice(0, 2)}},
                        {"author": {$in: user.followers}}
                    ]}},
                ];
                
                LoadMoreModuleAggregation("Newest", lastPostId, lastUniqueField, loadAmt, pipelineOperators).then((res) => {
                    //console.log(res);
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

/* If you want to add the old sorting system back
                const pipelineOperators = [
                    {$match: {"tags": {$in: tagList}}},

                    {$addFields: {
                        commonTags: { $setIntersection: [tagList, "$tags"] }, 
                    }},
                    {$addFields: {
                        mappedTags: { $map: {
                            input: "$commonTags",
                            as: "tag",
                            in: { $indexOfArray: [tagList, "$$tag"] },
                        }},
                    }},
                    {$addFields: {
                        sortingOrder: { $min: "$mappedTags" },
                    }},
                    
                    {$sort: {"sortingOrder": 1}}
                ];
*/

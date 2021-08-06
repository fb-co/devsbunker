import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import LoadMoreModule from "./LoadMoreModule.js";
import LoadMoreModuleAggregation from "./LoadMoreModuleAggregation.js";

/*
function addTagCondition(remainingTags, index) {
    if (remainingTags.length > 0) {
        let expression = {};
        let tagToAdd = remainingTags[0];
        
        remainingTags.shift();

        expression['$cond'] = [
            { $eq: ['$comparedTag', tagToAdd] },
            index,
            addTagCondition(remainingTags, index+1)
        ];
        
        return expression;
    } else {
        return index+1;
    }
}
*/


export default async function getTargetedPostList(username, lastPostId, lastUniqueField, loadAmt) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username, enabled: true }).then((user) => {
            if (user) {
                // because the tags in the db are sorted by interaction amount, we can assume the user will be more intrested in the first ones
                const tagList = [];

                for (let i = 0; i < user.common_tags.length; i++) {
                    tagList.push(user.common_tags[i].tag);
                }

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
                
                LoadMoreModuleAggregation("none", lastPostId, lastUniqueField, loadAmt, pipelineOperators).then((res) => {
                    console.log(res);
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

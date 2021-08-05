// The concept here is the same as the LoadMoreModule, except it uses the aggregation pipeline to produce results

import Posts from "../../../components/post/post.model.js";

// custom queries is an array of what exactly you want these posts to be relating to, specific user (REQUIRES AT LEAST ONE)
export default function loadMoreModuleAggregation(sortingType, lastPostId, lastUniqueField, loadAmt, pipelineOperators) {
    return new Promise((resolve, reject) => {
        let finalPipelineOperators = [];

        if (sortingType == "Newest") {
            if (lastPostId != 0) {
                finalPipelineOperators.push({ $match: { _id: { $lt: lastPostId } } }); // limit to ids less than the last post id
            }

            finalPipelineOperators.push({ $sort: { _id: -1 } }); // sort all documents
            finalPipelineOperators.push({ $limit: loadAmt+1 });  // limit results
        } else if (sortingType == "Most Popular") {
            finalPipelineOperators.push({ $sort: { _id: -1 } }); // sort all documents

            if (lastPostId != 0 && lastUniqueField != -1) {
                finalPipelineOperators.push({
                    $or: [
                        { $lt: [likeAmt, lastUniqueField] }, 
                        { $lt: [likeAmt, lastUniqueField], $lt: [_id, lastPostId] }
                    ] 
                }); // sort all documents
            }
        }
        
        
        Posts.aggregate(finalPipelineOperators).then((res) => {
            if (res) {
                // dont even ask me why you need this
                for (let i = 0; i < res.length; i++) {
                    res[i].id = res[i]._id;
                }

                resolve(res);
            } else {
                reject(new Error("Unable to find posts"));
            }
        });
        
       /*
        Posts.find({ }).then((res) => {
            if (res) {
                //console.log(res);
                resolve(res);
            } else {
                reject(new Error("Unable to find posts"));
            }
        });
        */
    });
}
// The concept here is the same as the LoadMoreModule, except it uses the aggregation pipeline to produce results
// For now the aggregation load more ONLY supports "newest" queries (using "most popular" just wont work)

import Posts from "../../../components/post/post.model.js";
import mongoose from "mongoose";

// custom queries is an array of what exactly you want these posts to be relating to, specific user (REQUIRES AT LEAST ONE)
export default function loadMoreModuleAggregation(sortingType, lastPostId, lastUniqueField, loadAmt, pipelineOperators) {
    return new Promise((resolve, reject) => {
        let finalPipelineOperators = pipelineOperators;
        

        // THIS LOGIC PAGINATES NEWEST FILTERS -----

        finalPipelineOperators.push({ $sort: { _id: -1 } }); // sort dataset by newest
            
        // if the last post id is not zero, match only results with ids less than the last post id
        if (lastPostId != 0) {
            finalPipelineOperators.push({ $match: { _id: { $lt: mongoose.Types.ObjectId(lastPostId) } } }); 
        }

        // limit the data set to the load amt plus one for fetchedAll reasons
        finalPipelineOperators.push({ $limit: loadAmt+1 });

        // -----------------------------------------
        
        Posts.aggregate(finalPipelineOperators).then((res) => {
            if (res) {
                // dont even ask me why you need this
                for (let i = 0; i < res.length; i++) {
                    res[i].id = res[i]._id;
                }

                console.log(res);

                resolve(res);
            } else {
                reject(new Error("Unable to find posts"));
            }
        });
    });
}
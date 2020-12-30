import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import mongoose from "mongoose";

export default async function getSavedPosts(author, fetchedAmt) {
    // this is so so you can load in more posts as you scroll down, and it wont ask the server for too many posts in one query
    let fetchedAmount;

    if (fetchedAmt == null) {
        fetchedAmount = 0;
    } else {
        fetchedAmount = fetchedAmt;
    }

    return new Promise((resolve) => {
        const loadIncrements = 3; // specifies how many posts to load on each call

        User.findOne({ username: author })
            .then((user) => {
                let wrappedPosts = user.saved_posts;
                const totalEntries = wrappedPosts.length;
                // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
                for (let i = 0; i < wrappedPosts.length; i++) {
                    wrappedPosts[i] = new mongoose.Types.ObjectId(wrappedPosts[i]);
                }
                
                Posts.find({ 
                    _id: {
                        "$in": wrappedPosts 
                    } 
                })
                .sort({ _id: -1 })
                .skip(fetchedAmount)
                .limit(loadIncrements)
                .then((posts) => {
                    const finalPosts = {
                        posts: AddDynamicData.addAll(posts, user),
                        fetchedAll: fetchedAmount + loadIncrements >= totalEntries
                    };
                    
                    resolve(finalPosts);
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

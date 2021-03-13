import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import mongoose from "mongoose";

export default async function getSavedPosts(author, loadAmt, lastPostId) {
    return new Promise((resolve) => {
        const loadIncrements = loadAmt; // specifies how many posts to load on each call

        User.findOne({ username: author })
            .then((user) => {
                let wrappedPosts = user.saved_posts;
                const totalEntries = wrappedPosts.length;
                // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
                for (let i = 0; i < wrappedPosts.length; i++) {
                    wrappedPosts[i] = new mongoose.Types.ObjectId(wrappedPosts[i]);
                }
                if (lastPostId != -1) { // if you havent fetched all the posts yet
                    if (lastPostId != 0) { // if you havent fetched any posts yet
                        Posts.find({
                            $and: [
                                { _id: { $in: wrappedPosts } },
                                { _id: { $lt: lastPostId } }
                            ]
                        })
                        .sort({ _id: -1 })
                        .limit(loadAmt+1)
                        .then((posts) => {
                            const finalPosts = AddDynamicData.addAll(posts, user);
                            resolve(finalPosts);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    } else {
                        Posts.find({ 
                            _id: {
                                "$in": wrappedPosts 
                            } 
                        })
                        .sort({ _id: -1 })
                        .limit(loadAmt+1)
                        .then((posts) => {
                            const finalPosts = AddDynamicData.addAll(posts, user);
                            resolve(finalPosts);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

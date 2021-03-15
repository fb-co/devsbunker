import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import mongoose from "mongoose";

export default async function getPostByPartial(partial_name, filter, requester_token) {
    let user;
    
    if (requester_token) {
        const jwtPayload = requester_token;

        if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

        user = await User.findOne({ username: jwtPayload.username});
    } else if (filter === "myProjects" || filter === "saved") {
        // you need to requester token if you are querying with these filters
        throw new AuthenticationError("Unauthorized.");
    }
    
    return new Promise((resolve) => {
        const regex = new RegExp(partial_name, "i");

        if (filter === "none") {
            Posts.find({ title: regex })
            .then((posts) => { 
                if (user) {
                    const finalPosts = AddDynamicData.addAll(posts, user);
                    resolve(finalPosts);
                }
                resolve(posts);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            // search based on some filter
            try {
                let postsToGet;
    
                if (filter === "saved") {
                    // need to find the posts objects since they are not contained in the user db document
                    let userPosts = user.saved_posts;

                    // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
                    for (let i = 0; i < userPosts.length; i++) {
                        postsToGet.push( new mongoose.Types.ObjectId(userPosts[i]) );
                    } 
                } else if (filter === "myProjects") {
                    postsToGet = user.posts;
                }
                
                Posts.find({
                    $and: [
                        { _id: { $in: postsToGet } },
                        { title: regex }
                    ]
                })
                .then((results) => {
                    if (user) {
                        const finalPosts = AddDynamicData.addAll(results, user);
                        resolve(finalPosts);
                    }
                    resolve(results);
                })
                .catch((err) => {
                    console.log(err);
                });
            } catch (err) {
                throw new Error("There was a problem: " + err);
            }
        }
    });
}
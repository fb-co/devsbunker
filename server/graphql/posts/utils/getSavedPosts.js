import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import mongoose from "mongoose";

export default async function getSavedPosts(author) {
    return new Promise((resolve) => {
        User.findOne({ username: author }, { saved_posts: 1 })
            .then((posts) => {
                let wrappedPosts = posts.saved_posts;
                
                // for whatever reason to find by id, they need to wrapped in an ObjectType wrapper
                for (let i = 0; i < wrappedPosts.length; i++) {
                    wrappedPosts[i] = new mongoose.Types.ObjectId(wrappedPosts[i]);
                }

                Posts.find({ 
                    _id: {
                        "$in": wrappedPosts 
                    } 
                })
                .then((posts) => {
                    posts.forEach(post => {
                        post.likeAmt = post.likes.length;
                    });
                    
                    resolve(posts);
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

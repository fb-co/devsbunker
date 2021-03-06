import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";

export default async function getPostByPartial(partial_name, requester_token) {
    let user;
    console.log(requester_token);
    
    if (requester_token) {
        const jwtPayload = requester_token;
        user = await User.findOne({ username: jwtPayload.username});
    }
    
    return new Promise((resolve) => {
        const regex = new RegExp(partial_name, "i");

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
    });
}
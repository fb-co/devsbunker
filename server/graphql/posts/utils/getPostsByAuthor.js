import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";

export default async function getPostsByAuthor(author, jwtPayload) {
    let requesterUser;

    if (jwtPayload) {
        requesterUser = await User.findOne({ username: jwtPayload.username }, { username: 1, liked_posts: 1, saved_posts: 1 });
    }

    return new Promise((resolve) => {
        Posts.find({ author: author })
            .sort({ _id: -1 }).limit(15)
            .then((posts) => {  
                if (requesterUser) {
                    const finalPosts = AddDynamicData.addAll(posts, requesterUser);
                    resolve(finalPosts);
                }
                resolve(posts)
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

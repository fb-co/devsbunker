import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js";

export default async function getPostsByAuthor(author, requesterToken) {
    let requesterUser;

    if (requesterToken) {
        const jwtPayload = TokenHandler.verifyAccessToken(requesterToken);

        if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

        requesterUser = await User.findOne({ username: jwtPayload.username }, { username: 1, liked_posts: 1, saved_posts: 1 });
    }

    return new Promise((resolve) => {
        Posts.find({ author: author })
            .then((posts) => {  
                const finalPosts = AddDynamicData.addAll(posts, requesterUser);
    
                resolve(finalPosts);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

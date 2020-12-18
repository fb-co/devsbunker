import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js";

export default async function getMorePosts(alreadyFetched, token) {
    let user;

    if (token) {
        const jwtPayload = TokenHandler.verifyAccessToken(token);

        if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

        user = await User.findOne({ username: jwtPayload.username });
    }

    //
    return new Promise((resolve) => {
        Posts.find()
            .sort({ _id: -1 })
            .skip(alreadyFetched)
            .limit(3)
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
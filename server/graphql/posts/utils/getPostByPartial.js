import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js"; // TODO: move this inside GraphQL/

export default async function getPostByPartial(partial_name, requester_token) {
    const jwtPayload = TokenHandler.verifyAccessToken(requester_token);

    if (!jwtPayload) throw new AuthenticationError("Unauthorized.");

    const user = await User.findOne({ username: jwtPayload.username});

    return new Promise((resolve) => {
        const regex = new RegExp(partial_name, "i");

        Posts.find({ title: regex })
            .limit(20)
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
import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import TokenHandler from "../../../components/tokens/TokenHandler.js";

export default async function getMorePosts(alreadyFetched, jwtPayload) {
    let user;

    if (jwtPayload) {
        user = await User.findOne({ username: jwtPayload.username });
    }

    const totalEntries = await Posts.count();

    return new Promise((resolve) => {
        Posts.find()
            .sort({ _id: -1 })
            .skip(alreadyFetched)
            .limit(3)
            .then((posts) => {
                console.log(alreadyFetched+3, totalEntries);

                const finalPosts = {
                    posts: posts,
                    fetchedAll: alreadyFetched+3 >= totalEntries ? true : false
                }
                if (user) {
                    finalPosts.posts = AddDynamicData.addAll(posts, user);
                    resolve(finalPosts);
                }
                resolve(finalPosts);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
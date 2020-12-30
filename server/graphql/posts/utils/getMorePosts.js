import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
//import TokenHandler from "../../../components/tokens/TokenHandler.js";

export default async function getMorePosts(alreadyFetched, jwtPayload) {
    let user;

    if (jwtPayload) {
        user = await User.findOne({ username: jwtPayload.username });
    }

    const totalEntries = await Posts.countDocuments();

    return new Promise((resolve) => {
        const loadIncrements = 3; // specifies how many posts to load on each call

        Posts.find()
            .sort({ _id: -1 })
            .skip(alreadyFetched)
            .limit(loadIncrements)
            .then((posts) => {
                const finalPosts = {
                    posts: posts,
                    fetchedAll: alreadyFetched+loadIncrements >= totalEntries
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
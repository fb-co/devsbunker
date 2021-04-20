import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";
import LoadMoreModule from "./LoadMoreModule.js";

export default async function getPostsByAuthor(author, lastPostId, lastUniqueField, filter, loadAmt, jwtPayload) {
    let requesterUser;

    if (jwtPayload) {
        requesterUser = await User.findOne({ username: jwtPayload.username }, { username: 1, liked_posts: 1, saved_posts: 1 });
    }

    return new Promise((resolve) => {
        let customQueries = [{ author: author }];
        
        LoadMoreModule(filter, lastPostId, lastUniqueField, loadAmt, customQueries).then((res) => {
            if (requesterUser) {
                const finalPosts = AddDynamicData.addAll(res, requesterUser);
                resolve(finalPosts);
            }
        });
    });
}

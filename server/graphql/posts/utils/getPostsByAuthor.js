import Posts from "../../../components/post/post.model.js";
import User from "../../../components/user/user.model.js";
import AddDynamicData from "../misc/addDynamicData.js";

export default async function getPostsByAuthor(author, jwtPayload, fetchedAmt) {
    let requesterUser;
    let fetchedAmount;
    const totalEntries = await Posts.countDocuments();

    if (jwtPayload) {
        requesterUser = await User.findOne({ username: jwtPayload.username }, { username: 1, liked_posts: 1, saved_posts: 1 });
    }

    if (fetchedAmt == null) {
        fetchedAmount = 0;
    } else {
        fetchedAmount = fetchedAmt;
    }

    //console.log(fetchedAmount);

    return new Promise((resolve) => {
        const loadIncrement = 3;

        Posts.find({ author: author })
            .sort({ _id: -1 })
            .skip(fetchedAmount)
            .limit(loadIncrement)
            .then((posts) => {  
                if (requesterUser) {
                    const finalPosts = {
                        posts: AddDynamicData.addAll(posts, requesterUser),
                        fetchedAll: fetchedAmount+loadIncrement >= totalEntries 
                    };
                    resolve(finalPosts);
                }
                resolve(posts)
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

import User from "../../../components/user/user.model.js"; // the db
import AddDynamicData from "../misc/addDynamicData.js";

// gets user document from db with a username parameter, we could also make another for the id if you want
export default async function getUserEntry(name) {
    return new Promise((resolve) => {
        User.findOne({ username: name })
            .then((user) => {
                let filtered = {
                    username: user.username,
                    desc: user.desc,
                    tag: user.tag,
                    liked_posts: user.liked_posts,
                    followers: user.followers,
                    following: user.following,
                    profile_pic: user.profile_pic,
                };

                filtered = AddDynamicData.addAll(filtered);

                resolve(filtered);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

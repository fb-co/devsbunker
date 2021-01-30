import User from "../../../components/user/user.model.js"; // the db
import AddDynamicData from "../misc/addDynamicData.js";

// gets user document from db with a username parameter, we could also make another for the id if you want
export default async function getUserEntry(name, requester) {
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
                

                // if a requester username is given, return whether or not they are following a certain person
                // MAKE SURE YOU TAKE THE TOKEN AT SOME POINT INSTEAD OF JUST THE USERNAME STRING, OR ELSE ANYONE COULD SEE WHO IS FOLLOWING WHO
                // (THIS IS PUBLIC INFO ANYWAY I BELEIVE, BUT ANYWAY)
                if (requester) {
                    filtered.isFollowing = false;
                    for (let i = 0; i < user.followers.length; i++) {
                        if (user.followers[i] === requester) {
                            filtered.isFollowing = true;
                            break;
                        }
                    }
                }

                filtered = AddDynamicData.addAll(filtered);

                resolve(filtered);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

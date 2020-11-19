import User from "../../../components/user/user.model.js"; // the db

// gets user document from db with a username parameter, we could also make another for the id if you want
export default async function getUserByPartial(partial_username) {
    return new Promise((resolve) => {
        const regex = new RegExp(partial_username, "i");        

        User.find({ username: regex })
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

import User from "../../components/user/user.model.js"; // the db

// gets user document from db with a username parameter, we could also make another for the id if you want
export default async function getUserEntry(name) {
    return new Promise((resolve) => {
        User.findOne({ username: name })
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

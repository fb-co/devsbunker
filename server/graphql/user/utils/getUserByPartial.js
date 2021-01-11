import User from "../../../components/user/user.model.js"; // the db
import AddDynamicData from "../misc/addDynamicData.js";

// gets user document from db with a username parameter, we could also make another for the id if you want
export default async function getUserByPartial(partial_username, requester) {
    return new Promise((resolve) => {
        const regex = new RegExp(partial_username, "i");        

        User.find({ username: regex }, { email: 0, password: 0, tokenVersion: 0 }) // filter out the sensitive data
            .then((user) => {
                let finalUser = AddDynamicData.addAll(user, requester);
        
                resolve(finalUser);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

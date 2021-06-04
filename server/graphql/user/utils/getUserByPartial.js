import LoadMoreUserModule from "./LoadMoreUserModule.js";

// gets user document from db with a username parameter, we could also make another for the id if you want
export default async function getUserByPartial(partial_username, sortMethod, lastUserId, lastUniqueField, loadAmt) {
    return new Promise((resolve) => {
        const regex = new RegExp(partial_username, "i"); 
        const customQueries = [{
            username: regex
        }];
        
        LoadMoreUserModule(sortMethod, lastUserId, lastUniqueField, loadAmt, customQueries).then((res) => {
            resolve(res);
        });
    });
}

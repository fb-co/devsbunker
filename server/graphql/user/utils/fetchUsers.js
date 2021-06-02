import LoadMoreUserModule from "./LoadMoreUserModule.js";

export default async function fetchUsers(sortMethod, lastUserId, lastUniqueField, loadAmt) {
    return new Promise((resolve) => {
        LoadMoreUserModule(sortMethod, lastUserId, lastUniqueField, loadAmt).then((res) => {
            resolve(res);
        });
    });
}
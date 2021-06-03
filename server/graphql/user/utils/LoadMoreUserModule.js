import User from "../../../components/user/user.model.js"; // the db

export default function LoadMoreUserModule(sortingType, lastUserId, lastUniqueField, loadAmt, customQueries) {
    return new Promise((resolve) => {
        let sortFilter = {};
        
        let postQuery = {
            $and: customQueries
        };

        if (sortingType === "Most Popular") {
            sortFilter = { _id: -1 };

            if (lastUserId != 0) {
                postQuery = {
                    $and: customQueries,
                    _id: { $lt: lastUserId },
                };
            }
        }

        // if there are no custom queries, remove the and element from the post query
        if (customQueries == null) {
            delete postQuery.$and;
        } else if (customQueries.length === 0) {
            delete postQuery.$and;
        }

        // query the db
        User.find(postQuery, { email: 0, password: 0, tokenVersion: 0 }) // filter out sensitive data
            .sort(sortFilter)
            .limit(loadAmt + 1)
            .then((results) => {
                resolve(results);
            })
            .catch((err) => {
                console.log(err);
            })

    });
}
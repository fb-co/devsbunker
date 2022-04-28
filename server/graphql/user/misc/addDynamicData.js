/*
    This function will add dynamic data to users that are not stored in the db and needs to be calculated server side 
*/

// for each function, you can also only add a single user object to achevie same results instead of an array
const dynamicData = {
    // adds follwerAmt and followingAmt
    addGeneralFollowingData: function(users) {
        if (Array.isArray(users)) {
            users.forEach(user => {
                user.followerAmt = user.followers.length;
                user.followingAmt = user.following.length;
            });
        } else {
            users.followAmt = users.followers.length;
            users.followingAmt = users.following.length;
        }
        return users;
    },
    addFollowerAmt: function(users) {
        if (Array.isArray(users)) {
            users.forEach(user => {
                user.followerAmt = user.followers.length;
            });
        } else {
            users.followAmt = users.followers.length;
        }
        return users;
    },
    addFollowingAmt: function(users) {
        if (Array.isArray(users)) {
            users.forEach(user => {
                user.followingAmt = user.following.length;
            });
        } else {
            users.followingAmt = users.following.length;
        }
        
        return users;
    },

    // requester needs to be a username string
    addAll: function(users, requester) {
        if (Array.isArray(users)) {
            users.forEach(user => {
                user.followerAmt = user.followers.length;
                user.followingAmt = user.following.length;
                
                // adds the isFollowing attribute if the requester is following the user
                if (requester) {
                    user.isFollowing = user.followers.includes(requester);
                }
            });
        } else {
            users.followerAmt = users.followers.length;
            users.followingAmt = users.following.length;

            if (requester) {
                users.isFollowing = users.followers.includes(requester);
            }
        }
        return users;
    }
}


export default dynamicData;
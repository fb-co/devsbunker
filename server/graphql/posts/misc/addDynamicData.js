/*
    This function will add dynamic data to posts or users thats not stored in the db and needs to be calculated server side 
*/

// adds the likeAmt variable to an array of posts

const dynamicData = {
    addLikeAmt: function(posts) {
        posts.forEach(post => {
            post.likeAmt = post.likes.length;
        });
        return posts;
    },
    addIsLiked: function(posts, requester) {
        posts.forEach(post => {
            post.isLiked = post.likes.includes( requester.username );
        });
        return posts;
    },
    addAll: function(posts, requester) {
        posts.forEach(post => {
            post.likeAmt = post.likes.length;

            // if there is no requester dont add the isLiked and isSaved fields
            if (requester) {
                post.isLiked = post.likes.includes( requester.username );
                post.isSaved = requester.saved_posts.includes( post.id );
            }
        });
        return posts;
    }
}


export default dynamicData;

const state = {
    posts: [], // array of objects (containing filter, queryType, and posts)
    fullPosts: [], // array of post ids
};

// checks if all the other data is equal to make sure it should used cached or not
function otherDataIsEqual(otherDataInMem, otherData) {
    const keys1 = Object.keys(otherDataInMem);
    const keys2 = Object.keys(otherData);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (otherDataInMem[key] !== otherData[key]) {
            return false;
        }
    }
    return true;
}

const getters = {
    // get only the posts in memory based on queryType and filter (returns null if they arent in memory)
    // if the posts are in memory return an object with { posts: <all the posts>, fetchedAll: <were all posts fetched?> }
    getPosts: (state) => (filter, queryType, otherData) => {
        for (let i = 0; i < state.posts.length; i++) {
            if (state.posts[i].filter === filter && state.posts[i].queryType === queryType && otherDataIsEqual(state.posts[i].otherData, otherData)) {
                return {
                    fetchedAll: state.posts[i].fetchedAll,
                    posts: state.posts[i].posts
                };
            }
        }
        return null;
    },
    // returns null if the full post is not in the cache
    getFullPost: (state) => (id) => {
        for (let i = 0; i < state.fullPosts.length; i++) {
            if (state.fullPosts[i].id === id) {
                return state.fullPosts[i];
            }
        }
    },
    // mainly for dev purposes
    getAllPosts: (state) => {
        return state.posts;
    }
};

const mutations = {
    // will update the posts if the entry already exists
    addPostsToCache(state, payload) {
        for (let i = 0; i < state.posts.length; i++) {
            if (state.posts[i].filter === payload.filter && state.posts[i].queryType === payload.queryType && otherDataIsEqual(state.posts[i].otherData, payload.otherData)) {
                state.posts[i].posts = payload.posts;
                state.posts[i].fetchedAll = payload.fetchedAll;
                return; // break out of function if this is true
            }
        }

        // if the entry is not already in memory, add it
        state.posts.push({
            filter: payload.filter,
            queryType: payload.queryType,
            fetchedAll: payload.fetchedAll,
            otherData: payload.otherData,
            posts: payload.posts,
        });
    },
    updatePostInCache(state, payload) {
        for (let i = 0; i < state.posts.length; i++) {
            for (let j = 0; j < state.posts[i].posts.length; j++) {
                if (state.posts[i].posts[j].id === payload.id) {
                    for (let q = 0; q < payload.fieldsToUpdate.length; q++) {
                        state.posts[i].posts[j][payload.fieldsToUpdate[q].field] = payload.fieldsToUpdate[q].newVal;
                    }
                    break;
                }
            }
        }
    },
    cacheEntirePostInCache(state, postObj) {
        let alreadyCached = false;

        for (let i = 0 ; i < state.fullPosts.length; i++) {
            if (state.fullPosts[i].id === postObj.id) {
                alreadyCached = true;
                break;
            }
        }

        if (!alreadyCached) {
            state.fullPosts.push(postObj);
        }
    },
};

const actions = {
    addPosts({ commit }, payload) {
        commit("addPostsToCache", payload);
    },
    updatePost({ commit }, payload) {
        commit("updatePostInCache", payload);
    },
    cacheFullPost({ commit }, postObj) {
        commit("cacheEntirePostInCache", postObj);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

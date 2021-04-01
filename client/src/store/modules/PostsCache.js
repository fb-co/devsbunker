const state = {
    posts: [],
    maxCacheSize: 20,
};

const getters = {
    cachedPosts: (state) => state.posts,
};

const mutations = {
    appendPosts(state, postsToCache) {
        let tmp = [];

        if (state.posts.length > 0) {
            if (state.posts.length > state.maxCacheSize) {
                // splitting in half
                state.posts.splice(0, 10);
            }

            for (let i = 0; i < state.posts.length; i++) {
                if (i < postsToCache.length) {
                    if (state.posts[i].id !== postsToCache[i].id) {
                        tmp.push(postsToCache[i]);
                    }
                } else {
                    break;
                }
            }
            state.posts = state.posts.concat(tmp);

        } else {
            state.posts = state.posts.concat(postsToCache);
        }
    },
};

export default {
    state,
    getters,
    mutations,
};

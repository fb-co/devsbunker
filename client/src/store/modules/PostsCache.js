const state = {
    posts: [],
    neededPost: null,
    maxCacheSize: 20,
};

const getters = {
    cachedPosts: (state) => state.posts,
    cachedPostById: (state) => state.neededPost,
};

const mutations = {
    appendPosts(state, postsToCache) {
        // here we store the posts that pass the check below
        let tmp = [];

        if (state.posts.length > 0) {
            if (state.posts.length > state.maxCacheSize) {
                // splitting in half
                state.posts.splice(0, 10);
            }

            let cache_map = {};
            state.posts.forEach((post) => {
                cache_map[post.id] = post;
            });

            postsToCache.forEach((post) => {
                if (cache_map[post.id]) {
                    if (cache_map[post.id].id !== post.id) {
                        tmp.push(post);
                    }
                } else {
                    tmp.push(post);
                }
            });

            state.posts = state.posts.concat(tmp);
        } else {
            state.posts = state.posts.concat(postsToCache);
        }
    },
    getCachedPostById: function(state, id) {
        let ret = null;

        for (let i = 0; i < state.posts.length; i++) {
            if (state.posts[i].id == id) {
                ret = state.posts[i];
                break;
            }
        }

        state.neededPost = ret;
    },
};

const actions = {
    extractCachedPostById({ commit }, id) {
        commit("getCachedPostById", id);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

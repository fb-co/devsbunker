const state = {
    posts: [],
    fullPosts: [],
    neededPost: null,
    maxCacheSize: 20,
    newlyMadePost: null,
};

const getters = {
    cachedPosts: (state) => state.posts,
    cachedPostById: (state) => state.neededPost,
    cachedNewlyMadePost: (state) => state.newlyMadePost,
    cachedFullPosts: (state) => state.fullPosts,
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

            // building an hash-table to map the posts in the cache to their respective IDs
            let cache_map = {};
            state.posts.forEach((post) => {
                cache_map[post.id] = post;
            });

            postsToCache.forEach((post) => {
                // if the post to cache isn't already in the cache
                if (!cache_map[post.id]) {
                    tmp.push(post);
                }
            });

            state.posts = state.posts.concat(tmp);
        } else {
            state.posts = state.posts.concat(postsToCache);
        }
    },
    cacheFullPost(state, fullPostToCache) {
        if (state.fullPosts.length > state.maxCacheSize) {
            // splitting in half note-> (KEEP IN MIND THAT THIS WONT BE HALF IF YOU EVER CHANGE MAXCACHESIZE)
            state.fullPosts.splice(0, 10);
        }

        let dup = false;
        for (let i = 0; i < state.fullPosts.length; i++) {
            if (state.fullPosts[i].id === fullPostToCache.id) {
                dup = true;
                break;
            }
        }

        !dup ? state.fullPosts.push(fullPostToCache) : {};
    },
    getCachedPostById: function(state, id) {
        let ret = null;

        for (let i = 0; i < state.posts.length; i++) {
            console.log(`*** DEBUG *** ${id} == ${state.posts[i].id} ?`);
            if (state.posts[i].id == id) {
                ret = state.posts[i];
                break;
            }
        }

        state.neededPost = ret;
    },
    getCachedFullPostById(state, id) {
        let ret = null;

        for (let i = 0; i < state.fullPosts.length; i++) {
            if (state.fullPosts[i].id == id) {
                ret = state.fullPosts[i];
                break;
            }
        }

        state.neededPost = ret;
    },
    cacheNewPost(state, post) {
        console.log("[CACHE DEBUG] caching: ", post);
        state.newlyMadePost = post;
        console.log("[CACHE DEBUG] in state: ", state.newlyMadePost);

        this.commit("appendPosts", [post]);
    },
};

const actions = {
    extractCachedPostById({ commit }, id) {
        commit("getCachedPostById", id);
    },
    extractCachedFullPostById({ commit }, id) {
        commit("getCachedFullPostById", id);
    },
    cacheNewlyMadePost({ commit }, post) {
        commit("cacheNewPost", post);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

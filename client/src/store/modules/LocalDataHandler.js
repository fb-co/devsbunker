const state = {
    cacheIsSupported: true,

    cachedPostFeedData: {
        path: "",
        searchPhrase: "",
        scrollAmt: 0,
    },
};

const getters = {
    cacheIsSupported: (state) => state.cacheIsSupported,
    getCachedPostFeedData: (state) => state.cachedPostFeedData,
};

const mutations = {
    isCacheSupported(state, isSupported) {
        state.cacheIsSupported = isSupported;
    },
    cachePostFeed(state, postFeedData) {
        state.cachedPostFeedData = postFeedData;
    },
    clearPostFeed(state) {
        state.cachedPostFeedData = {
            path: "",
            searchPhrase: "",
        };
    },
};

const actions = {
    checkCacheSupport({ commit }) {
        commit("isCacheSupported", 'caches' in window);
    },
    cachePostFeedData({ commit }, payload) {
        commit("cachePostFeed", payload);
    },
    clearPostFeedData({ commit }) {
        commit("clearPostFeed");
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

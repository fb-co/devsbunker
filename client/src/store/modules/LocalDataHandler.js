const state = {
    cacheIsSupported: true,
};

const getters = {
    cacheIsSupported: (state) => state.cacheIsSupported,
};

const mutations = {
    isCacheSupported(state, isSupported) {
        state.cacheIsSupported = isSupported;
    },
};

const actions = {
    checkCacheSupport({ commit }) {
        commit("isCacheSupported", 'caches' in window);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

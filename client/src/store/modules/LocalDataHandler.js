const state = {
    cacheIsSupported: true,

    postSearchData: {
        returnToTerm: false,
        searchTerm: "",
    }
};

const getters = {
    cacheIsSupported: (state) => state.cacheIsSupported,
    postSearchData: (state) => state.postSearchData,
};

const mutations = {
    isCacheSupported(state, isSupported) {
        state.cacheIsSupported = isSupported;
    },
    cacheBrowsingSearchTerm(state, term) {
        state.postSearchData.searchTerm = term;
        state.postSearchData.returnToTerm = true;
    },
    clearBrowsingSearchTerm(state) {
        state.postSearchData.searchTerm = "";
        state.postSearchData.returnToTerm = false;
    }
};

const actions = {
    checkCacheSupport({ commit }) {
        commit("isCacheSupported", 'caches' in window);
    },
    cacheSearchTerm({ commit }, term) {
        commit("cacheBrowsingSearchTerm", term);
    },
    clearSearchTerm({ commit }) {
        commit("clearBrowsingSearchTerm");
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};

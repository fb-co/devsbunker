const state = {
    profilePictures: [],
    personalPfpLink: null,
    maxCacheSize: 1000
};

const getters = {
    cachedPfps: (state) => state.profilePictures,
    getPfpLink: (state) => (username) => {
        for (let i = 0; i < state.profilePictures.length; i++) {
            if (state.profilePictures[i].username == username) {
                return state.profilePictures[i].link;
            }
        }
        return null;
    },
    getPersonalPfpLink: (state) => {
        return state.personalPfpLink;
    }
};

const mutations = {
    cachePfpLink(state, data) {
        // if the max cache size is acheived remove the oldest element
        if (state.profilePictures.length >= state.maxCacheSize) {
            state.profilePictures.pop();
        }
        
        let dup = false;
        // make sure the username is not already in the cache
        for (let i = 0; i < state.profilePictures.length; i++) {
            if (state.profilePictures[i].username == data.username) {
                dup = true;
            }
        }
        if (!dup) {
            state.profilePictures.push({ username: data.username, link: data.link });
        }
    },
    cachePersonalPfpLink(state, link) {
        state.personalPfpLink = link;
    },
    removePersonalPfpLink(state) {
        state.personalPfpLink = null;
    }
};

const actions = {
    isPfpLinkCached({ commit }) {
        const link = localStorage.getItem("profile_pic_link");

        if (link) {
            commit("cachePersonalPfpLink", link);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};

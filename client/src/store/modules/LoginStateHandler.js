import UserService from "@/services/user.service";

const state = {
    isLoggedIn: false,
    username: undefined,
    accessToken: null,
};

const mutations = {
    changeLoggedInState(state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn;
    },
    // If we have multiple things like email, description, etc. keep them seperate in case we ever need to update single ones.
    changeUsername(state, username) {
        state.username = username;
    },

    refreshAccessToken(state, token) {
        state.accessToken = token;
    },
};

const getters = {
    isLoggedIn: (state) => state.isLoggedIn,
    username: (state) => state.username,
    accessToken: (state) => state.accessToken,
    //profilePic: (state) => state.profilePic,
};

const actions = {
    setLoggedInState({ commit }) {
        UserService.isLoggedIn().then((result) => {
            commit("changeLoggedInState", !!result.user);
            commit("changeUsername", result.user?.username);
        });
    },

    async manualRefreshAccessToken(commit) {
        const response = await fetch(process.env.VUE_APP_REFRESH_TOKEN, {
            method: "POST",
            credentials: "include",
        });
        const { accessToken } = await response.json();
        commit("refreshAccessToken", accessToken);
    },

    async autoRefreshAccessToken({ commit }) {
        await actions.manualRefreshAccessToken(commit); // call it once before entering loop

        // every 14 mins we refresh the accessToken, we don't need await here
        setInterval(() => {
            actions.manualRefreshAccessToken(commit);
        }, 840000);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

import Vue from 'vue'
import Vuex from 'vuex'
import SharedMethods from "../utils/shared";
import UserService from "../services/user.service";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        username: undefined,
        accessToken: null,
    },
    mutations: {
        changeLoggedInState(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn
        },
        // If we have multiple things like email, description, etc. keep them seperate in case we ever need to update single ones.
        changeUsername(state, username) {
            state.username = username;
        },

        refreshAccessToken(state, token) {
            state.accessToken = token;
        }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        username: state => state.username,
        accessToken: state => state.accessToken,
    },
    actions: {
        setLoggedInState({
            commit
        }) {
            SharedMethods.checkIfLoggedIn().then((result) => {
                console.log("Logged In: " + result);
                commit('changeLoggedInState', result);
            });
        },
        setUsername({
            commit
        }) {
            UserService.isLoggedIn().then((result) => {
                if (result.user) commit('changeUsername', result.user.username)
            });
        }
    }
});

/*

note:
i think we can do something like this instead of having two actions

    const result = await UserService.isLoggedIn();

    if (result.user) {
        commit('changeUsername', result.user.username);
        commit('changeLoggedInState', true);
    } else {
        commit('changeUsername', undefined);
        commit('changeLoggedInState', false);
    }

*/
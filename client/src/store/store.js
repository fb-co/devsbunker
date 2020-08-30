import Vue from 'vue'
import Vuex from 'vuex'
import SharedMethods from "../utils/shared";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    mutations: {
        change(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn
        }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn
    },
    actions: {
        setLoggedInState ({ commit }) {
            SharedMethods.checkIfLoggedIn().then((result) => {
                console.log("Logged In: " + result);
                commit('change', result);
            });
        }
    }
})
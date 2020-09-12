import Vue from "vue";
import Vuex from "vuex";
import LoginStateHandler from "./modules/LoginStateHandler";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        LoginStateHandler,
    },
});

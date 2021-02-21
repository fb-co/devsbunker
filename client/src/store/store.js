import Vue from "vue";
import Vuex from "vuex";
import LoginStateHandler from "./modules/LoginStateHandler";
import ScreenHandler from "./modules/ScreenHandler";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        LoginStateHandler,
        ScreenHandler,
    },
});

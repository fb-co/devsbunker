import Vue from "vue";
import Vuex from "vuex";
import LoginStateHandler from "./modules/LoginStateHandler";
import ScreenHandler from "./modules/ScreenHandler";
import PageLoadHandler from "./modules/PageLoadHandler";
import LocalDataHandler from "./modules/LocalDataHandler";
import PostsCache from "./modules/PostsCache";
import PfpCache from "./modules/PfpCache";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        LoginStateHandler,
        ScreenHandler,
        LocalDataHandler,
        PostsCache,
        PfpCache,
        PageLoadHandler,
    },
});

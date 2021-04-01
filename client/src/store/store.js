import Vue from "vue";
import Vuex from "vuex";
import LoginStateHandler from "./modules/LoginStateHandler";
import ScreenHandler from "./modules/ScreenHandler";
import LocalDataHandler from "./modules/LocalDataHandler";
import PostsCache from "./modules/PostsCache";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        LoginStateHandler,
        ScreenHandler,
        LocalDataHandler,
        PostsCache
    },
});

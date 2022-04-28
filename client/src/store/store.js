import Vue from "vue";
import Vuex from "vuex";
import LoginStateHandler from "./modules/LoginStateHandler";
import ScreenHandler from "./modules/ScreenHandler";
import PageLoadHandler from "./modules/PageLoadHandler";
import LocalDataHandler from "./modules/LocalDataHandler";
import PostsCache from "./modules/PostsCache";
import PfpCache from "./modules/PfpCache";
import AlertHandler from "./modules/AlertHandler";
import CreateNewPost from "./modules/CreateNewPost";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        LoginStateHandler,
        ScreenHandler,
        LocalDataHandler,
        PostsCache,
        PfpCache,
        PageLoadHandler,
        AlertHandler, 
        CreateNewPost,
    },
});

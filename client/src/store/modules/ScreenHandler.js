import ScreenType from "../../utils/screenType.js";

const state = {
    mobile: false,
};

const getters = {
    mobile: (state) => state.mobile,
};

const mutations = {
    isMobile(state, isMobile) {
        state.mobile = isMobile;
    },
};

const actions = {
    checkMobile({ commit }) {
        commit("isMobile", ScreenType.isMobile(950));

        window.addEventListener("resize", () => {
            commit("isMobile", ScreenType.isMobile(950));
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

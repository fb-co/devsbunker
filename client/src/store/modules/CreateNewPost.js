const state = {
    popupOpen: false,
};

const getters = {
    createPopupOpen: (state) => state.popupOpen
};

const mutations = {
    createNewPost (state) {
        document.body.style.overflow = "hidden"; // lock overall page scrolling
        state.popupOpen = true;
    },
    closeNewPostPopup (state) {
        document.body.style.overflow = "auto"; // re-enable overall page scrolling
        state.popupOpen = false;
    }
};


export default {
    state,
    getters,
    mutations,
};
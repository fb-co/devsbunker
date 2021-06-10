// We've been a little messy so far with on page load handling, and I want to try and clean it up to minimize how many queries we give the server
// per page load. This includes stuff like the users pfp link, unread notifications, etc.
import GraphQLService from "@/services/graphql.service.js";


const state = {
    pfpLink: undefined,
    unreadNotificationsAmt: undefined
};

const getters = {
    profile_pic: (state) => {
        return state.pfpLink;
    },
    unread_notifications: (state) => {
        return state.unreadNotificationsAmt;
    }
};

const mutations = {
    cachePfpLink(state, link) {
        state.pfpLink = link;
    },
    cacheUnreadNotificationsAmt(state, amt) {
        state.unreadNotificationsAmt = amt;
    },
    removePersonalPfpLink(state) {
        state.pfpLink = null;
    },
    cachePersonalPfpLink(state, link) {
        state.pfpLink = link;
    }
};

const actions = {
    async fetchPageLoadData ({ commit, rootState }) {
        const storedLink = localStorage.getItem("profile_pic_link");
        let dataToFetch = ["unreadNotificationAmt"];

        let pfpLink;

        if (storedLink) {
            pfpLink = storedLink;
        } else {
            dataToFetch.push("profile_pic");
        }

        const res = await GraphQLService.fetchPersonalDetails(rootState.LoginStateHandler.accessToken, dataToFetch);
        
        commit("cachePfpLink", pfpLink || process.env.VUE_APP_PROFILE_PICTURES + res.data.getPersonalDetails.profile_pic);
        commit("cacheUnreadNotificationsAmt", res.data.getPersonalDetails.unreadNotificationAmt);
    },
    check_and_cache_pfp({ commit }) {
        const storedLink = localStorage.getItem("profile_pic_link");

        if (storedLink) {
            
            commit("cachePersonalPfpLink", storedLink);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};



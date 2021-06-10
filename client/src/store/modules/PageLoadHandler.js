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
    }
};

const actions = {
    async fetchPageLoadData ({ commit, rootState }) {
        const res = await GraphQLService.fetchPersonalDetails(rootState.LoginStateHandler.accessToken, ["unreadNotificationAmt", "profile_pic"]);

        commit("cachePfpLink", res.data.getPersonalDetails.profile_pic);
        commit("cacheUnreadNotificationsAmt", res.data.getPersonalDetails.unreadNotificationAmt);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};



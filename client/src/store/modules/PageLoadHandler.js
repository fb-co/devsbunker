// We've been a little messy so far with on page load handling, and I want to try and clean it up to minimize how many queries we give the server
// per page load. This includes stuff like the users pfp link, unread notifications, etc.
import GraphQLService from "@/services/graphql.service.js";

const state = {
    pfpLink: undefined,
    unreadNotificationsAmt: undefined,
    unreadNotifications: [],
    postsAmt: undefined,
};

const getters = {
    profile_pic: (state) => {
        return state.pfpLink;
    },
    unread_notifications: (state) => {
        return state.unreadNotificationsAmt;
    },
    full_unread_notifications: (state) => {
        return state.unreadNotifications;
    },
    posts_amt: (state) => {
        return state.postsAmt;
    },
};

const mutations = {
    cachePersonalPfpLink(state, link) {
        state.pfpLink = link;
    },
    cacheUnreadNotificationsAmt(state, amt) {
        state.unreadNotificationsAmt = amt;
    },
    cacheUnreadNotifications(state, notifications) {
        state.unreadNotifications = notifications;
    },
    cachePostsAmt(state, amt) {
        state.postsAmt = amt;
    },
    removePersonalPfpLink(state) {
        state.pfpLink = null;
    },
    readNotifications(state) {
        state.unreadNotificationsAmt = 0;
        state.unreadNotifications = [];
    },

    // will just increment the amount of posts by one, saves server resources by not asking it to count them all again
    addPostToCount(state) {
        state.postsAmt++;
    },
};

const actions = {
    async fetchPageLoadData({ commit, rootState }) {
        const storedLink = localStorage.getItem("profile_pic_link");

        let dataToFetch = ["unreadNotificationAmt", "unreadNotifications { read sender message type target timestamp }", "postsAmt"];
        let pfpLink;

        // TODO: I don't really like this if statement
        if (storedLink) {
            const check = storedLink.split("/");
            if (check[check.length - 1] != "null") {
                pfpLink = storedLink;
            } else {
                dataToFetch.push("profile_pic");
            }
        } else {
            dataToFetch.push("profile_pic");
        }

        const res = await GraphQLService.fetchPersonalDetails(rootState.LoginStateHandler.accessToken, dataToFetch);

        if (!res.errors) {
            if (res.data.getPersonalDetails.profile_pic) {
                commit(
                    "cachePersonalPfpLink",
                    pfpLink || /http/.test(res.data.getPersonalDetails.profile_pic)
                        ? res.data.getPersonalDetails.profile_pic
                        : process.env.VUE_APP_PROFILE_PICTURES + res.data.getPersonalDetails.profile_pic
                );
            }
            commit("cacheUnreadNotificationsAmt", res.data.getPersonalDetails.unreadNotificationAmt);
            commit("cachePostsAmt", res.data.getPersonalDetails.postsAmt);
            commit("cacheUnreadNotifications", res.data.getPersonalDetails.unreadNotifications);

            // add the pfp link to localstorage if its not already in there
            if (!storedLink) {
                if (/http/.test(res.data.getPersonalDetails.profile_pic)) {
                    localStorage.setItem("profile_pic_link", res.data.getPersonalDetails.profile_pic);
                } else {
                    localStorage.setItem("profile_pic_link", process.env.VUE_APP_PROFILE_PICTURES + res.data.getPersonalDetails.profile_pic);
                }
            }
        }
    },
    flush_user_data({ commit }) {
        commit("cachePersonalPfpLink", undefined);
        commit("cacheUnreadNotificationsAmt", undefined);
        commit("cachePostsAmt", undefined);
        commit("cacheUnreadNotifications", undefined);
    },
    check_and_cache_pfp({ commit }) {
        const storedLink = localStorage.getItem("profile_pic_link");

        if (storedLink) {
            commit("cachePersonalPfpLink", storedLink);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

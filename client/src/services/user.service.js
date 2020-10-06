/*
  This is the user service. Here we will place methods related to the
  user, such as login and signup. Just like we did in server.
*/

import ApiService from "./api.service";
import { store } from "../store/store";

const UserService = {
    validateCreds: function(username, email, password) {
        return (
            username &&
            username.toString().trim() !== "" &&
            /^[a-zA-Z0-9_-]+$/.test(username) &&
            email &&
            email.toString().trim() !== "" &&
            /\S+@\S+\.\S+/.test(email) &&
            password &&
            password.toString().trim() !== "" &&
            password.length > 8
        );
    },

    logout: async function() {
        this.deleteAuthToken();
        store.commit("changeLoggedInState", false);
        return await ApiService.logoutUser();
    },

    getAuthToken: function() {
        return store.getters.accessToken;
    },

    deleteAuthToken: function() {
        store.commit("refreshAccessToken", null);
    },

    isLoggedIn: async function() {
        const token = this.getAuthToken();
        return await ApiService.isAuthenticated(token);
    },
};

export default UserService;

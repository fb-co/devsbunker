/*
  This is the API service. Here we will place methods that will 
  communicate with the API.
*/

const AUTH_API_URL = process.env.VUE_APP_AUTH_API_URL;
const LOGOUT_USER_API_URL = process.env.VUE_APP_LOGOUT_USER_API_URL;

const ApiService = {
    isAuthenticated: async function(token) {
        const response = await fetch(AUTH_API_URL, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        return response.json();
    },

    logoutUser: async function() {
        const response = await fetch(LOGOUT_USER_API_URL, {
            method: "POST",
            credentials: "include",
        });

        return response.json();
    },
};

export default ApiService;

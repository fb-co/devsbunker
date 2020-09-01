/*
  This is the API service. Here we will place methods that will 
  communicate with the API.
*/

const LOGIN_API_URL = process.env.VUE_APP_LOGIN_API_URL;
const SIGNUP_API_URL = process.env.VUE_APP_SIGNUP_API_URL;
const AUTH_API_URL = process.env.VUE_APP_AUTH_API_URL;
const FETCH_USER_API_URL = process.env.VUE_FETCH_USER_API; // not sure if its overkill to make an entire new env file

const ApiService = {
  sendCredsToAPI: async function (creds) {
    let URL = '';

    if (Object.keys(creds).length < 3) {
      URL = LOGIN_API_URL;
    } else {
      URL = SIGNUP_API_URL;
    }

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(creds)
    });

    return response.json();
  },

  isAuthenticated: async function (token) {
    const response = await fetch(AUTH_API_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    });

    return response.json();
  },


  // DONT KNOW IF I NEED SOME SORT OF HEADERS HERE
  findUserFromAPI: async function (foreign_username) { 
    const requestData = {
      foreign_username: foreign_username
    }
    
    const response = await fetch(FETCH_USER_API_URL, {
      method: 'POST',
      body: JSON.stringify(requestData)
    });

    return response.json();
  }
};

export default ApiService;
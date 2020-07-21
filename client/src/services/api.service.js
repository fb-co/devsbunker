/*
  This is the API service. Here we will place methods that will 
  communicate with the API.
*/

// TODO: use .env file
const LOGIN_API_URL = 'http://192.168.1.51:5000/user/login';
const SIGNUP_API_URL = 'http://192.168.1.51:5000/user/signup';
const AUTH_API_URL = 'http://192.168.1.51:5000/user/auth';

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
  }

};

export default ApiService;
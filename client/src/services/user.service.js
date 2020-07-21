/*
  This is the user service. Here we will place methods related to the
  user, such as login and signup. Just like we did in server.
*/

import ApiService from './api.service';

const UserService = {
  validateCreds: function (username, email, password) {
    return username && username.toString().trim() !== '' && /^[a-zA-Z0-9_-]+$/.test(username) &&
      email && email.toString().trim() !== '' && /\S+@\S+\.\S+/.test(email) &&
      password && password.toString().trim() !== '' && password.length > 8;
  },

  login: async function (id, password) {
    const creds = {
      userID: id,
      password: password
    };

    return ApiService.sendCredsToAPI(creds);
  },

  signup: async function (username, email, password) {
    const creds = {
      username: username,
      email: email,
      password: password
    };

    console.log("credentials", creds);

    return ApiService.sendCredsToAPI(creds);
  }
};

export default UserService;
/*
  This is the user service. Here we will place methods related to the
  user, such as login and signup. Just like we did in server.
*/

import ApiService from './api.service';

const UserService = {
  login: async function (id, password) {
    const creds = {
      userID: id,
      password: password
    };

    return ApiService.sendCredsToAPI(creds);
  }
};

export default UserService;
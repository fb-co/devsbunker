import UserService from "./services/user.service";

const SharedMethods = {
  checkIfLoggedIn: async function () {
    const response = await UserService.isLoggedIn();

    return !!response.user;
  }
};

export default SharedMethods;
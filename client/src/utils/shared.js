import UserService from "../services/user.service";

const Themes = {
  light: {
    mainColor: '#FFFFFF',
    secondaryColor: '#f2f2f2',
    mainFontColor: '#0D0D0D',
    errorRed: '#c50000',
    accent: '#2c6975',
    vueGreen: '#42b983',
    linkColor: '#6096fd',
    selection: '#0D0D0D',
    softText: 'rgba(0, 0, 0, 0.5)',
    settingsMobileCard: '#FFFFFF',
    burgerMenuBG: '#2a2a2a',
    burgerTextColor: 'hsla(0, 0%, 100%, 0.5)',
    mainBtnColor: '#49CCE5',
    generalCard: '#e3e8ef',
    profileOptionColor: '#656565',
  },
  dark: {
    mainColor: '#171717',
    secondaryColor: '#2E2E2E',
    mainFontColor: '#f2f2f2',
    errorRed: '#c50000',
    accent: '#2c6975',
    vueGreen: '#42b983',
    linkColor: '#6096fd',
    selection: '#f2f2f2',
    softText: 'rgba(242, 242, 242, 0.5)',
    settingsMobileCard: '#2E2E2E',
    burgerMenuBG: '#ededed',
    burgerTextColor: 'hsla(0, 0%, 5%, 0.7)',
    mainBtnColor: '#04C290',
    generalCard: '#2E2E2E',
    profileOptionColor: '#949494',

  },
  getTheme: function (themeString) {
    if (themeString === 'dark-theme') {
      return this.dark;
    } else {
      return this.light;
    }
  }
};

const SharedMethods = {
  checkIfLoggedIn: async function () {
    const response = await UserService.isLoggedIn();

    return !!response.user; /* the !! operator transforms a value into a boolean so if we get a user it will be true otherwise false (undefined -> false) **/
  },
  setLoginStateCookie: function () {
    this.checkIfLoggedIn().then(result => {
      // li stands for 'logged in'
      document.cookie = btoa('li') + '=' + btoa(result);
    })
  },
  initTheme: function () {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === null) {
      localStorage.setItem('theme', 'light-theme');
    }
    this.setTheme(currentTheme);
  },
  setTheme: function (theme) {
    const themeObj = Themes.getTheme(theme);

    document.body.style.setProperty("--main-color", themeObj.mainColor);
    document.body.style.setProperty("--secondary-color", themeObj.secondaryColor);
    document.body.style.setProperty("--main-font-color", themeObj.mainFontColor);
    document.body.style.setProperty("--error-red", themeObj.errorRed);
    document.body.style.setProperty("--accent", themeObj.accent);
    document.body.style.setProperty("--vue-green", themeObj.vueGreen);
    document.body.style.setProperty("--link-color", themeObj.linkColor);
    document.body.style.setProperty("--selection", themeObj.selection);
    document.body.style.setProperty("--soft-text", themeObj.softText);
    document.body.style.setProperty("--settings-mobile-card", themeObj.settingsMobileCard);
    document.body.style.setProperty("--burger-menu-bg", themeObj.burgerMenuBG);
    document.body.style.setProperty("--burger-textColor", themeObj.burgerTextColor);
    document.body.style.setProperty("--main-btn-color", themeObj.mainBtnColor);
    document.body.style.setProperty("--general-card", themeObj.generalCard);
    document.body.style.setProperty("--profile-option-color", themeObj.profileOptionColor);
  },
  changeTheme: function (theme) {
    localStorage.setItem('theme', theme);
    this.setTheme(theme);
  },
  toggleTheme: function () {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme == 'light-theme') {
      this.changeTheme('dark-theme');
    } else {
      this.changeTheme('light-theme');
    }
  },
  // Call this function when loading any page
  loadPage: function () {
    this.initTheme();
  }
};

export default SharedMethods
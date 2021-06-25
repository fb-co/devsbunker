import UserService from "../services/user.service";

const Themes = {
    light: {
        mainColor: "#f7f7f7",
        secondaryColor: "#efefef",
        mainFontColor: "#0D0D0D",
        errorRed: "#c50000",
        accent: "#2c6975",
        vueGreen: "#42b983",
        linkColor: "#6096fd",
        selection: "#0D0D0D",
        softText: "rgba(0, 0, 0, 0.5)",
        settingsMobileCard: "#FFFFFF",
        burgerMenuBG: "#2a2a2a",
        burgerTextColor: "hsla(0, 0%, 100%, 0.5)",
        mainAccent: "#49CCE5",
        generalCard: "#e3e8ef",
        profileOptionColor: "#656565",
        hoverEffect: "linear-gradient(90deg, rgba(255, 255, 255, 1) 3%, rgba(1, 135, 175, 0) 100%)",
        dropdownHoverColor: "#7a7a7a",
        dropShadow: "rgba(0, 0, 0, 0.1)",
    },
    dark: {
        mainColor: "#171717",
        secondaryColor: "#2e2e2e",
        mainFontColor: "#f2f2f2",
        errorRed: "#c50000",
        accent: "#2c6975",
        vueGreen: "#42b983",
        linkColor: "#6096fd",
        selection: "#f2f2f2",
        softText: "rgba(242, 242, 242, 0.5)",
        settingsMobileCard: "#2E2E2E",
        burgerMenuBG: "#ededed",
        burgerTextColor: "hsla(0, 0%, 5%, 0.7)",
        mainAccent: "#8040E9",
        generalCard: "#2E2E2E",
        profileOptionColor: "#949494",
        hoverEffect: "linear-gradient(90deg, black 3%, #2e2e2e 100%)",
        dropdownHoverColor: "#7a7a7a",
        dropShadow: "#828282",
    },
    getTheme: function(themeString) {
        if (themeString === "dark-theme") {
            return this.dark;
        } else {
            return this.light;
        }
    },
};

const SharedMethods = {
    checkIfLoggedIn: async function() {
        const response = await UserService.isLoggedIn();

        return !!response.user; /* the !! operator transforms a value into a boolean so if we get a user it will be true otherwise false (undefined -> false) **/
    },
    initTheme: function() {
        const currentTheme = localStorage.getItem("theme");
        const feedTheme = localStorage.getItem("feedTheme");

        if (currentTheme === null && feedTheme === null) {
            localStorage.setItem("theme", "light-theme");
            localStorage.setItem("feedTheme", "Simple");
        }
        this.setTheme(currentTheme);
    },
    setTheme: function(theme) {
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
        document.body.style.setProperty("--main-accent", themeObj.mainAccent);
        document.body.style.setProperty("--general-card", themeObj.generalCard);
        document.body.style.setProperty("--profile-option-color", themeObj.profileOptionColor);
        document.body.style.setProperty("--hover-effect", themeObj.hoverEffect);
        document.body.style.setProperty("--dropdown-hover-color", themeObj.dropdownHoverColor);
        document.body.style.setProperty("--drop-shadow", themeObj.dropShadow);
    },
    changeTheme: function(theme) {
        localStorage.setItem("theme", theme);
        this.setTheme(theme);
    },
    toggleTheme: function() {
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme == "light-theme") {
            this.changeTheme("dark-theme");
        } else {
            this.changeTheme("light-theme");
        }
    },
    // Call this function when loading any page
    loadPage: function() {
        this.initTheme();
    },
};

export default SharedMethods;

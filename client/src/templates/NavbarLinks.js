/* Navbar Links, default config is user not logged in */
const Links = [
    {
        id: "home_link",
        to: "/",
        name: "Home",
        show: true
    },
    {
        id: "projects_link",
        to: "/projects",
        name: "Projects",
        show: true,
    },
    {
        id: "about_link",
        to: "/about",
        name: "About",
        show: true
    },
    {
        id: "profile_link",
        to: "/profile",
        name: "Profile",
        show: false,
    },
    {
        id: "signin_link",
        to: "/signup",
        name: "Sign-up",
        show: true,
    },
    {
        id: "login_link",
        to: "/login",
        name: "Login",
        show: true
    }
];

export default Links;
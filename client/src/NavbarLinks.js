import SharedMethods from "./shared";

const Links = [{
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
    },
    {
        id: "profile_link",
        to: "/profile",
        name: "Profile",
        show: false,
    },
];

function initLinks() {
    // we check if the user is logged in (has a VALID token) and if so we 
    // change the show property of the links to true/false depending on the login state
    // false to login and signup if logged in and vice versa
    SharedMethods.checkIfLoggedIn()
        .then((result) => {
            if (result) {
                Links.forEach((link) => {
                    if (link.name === "Profile") {
                        link.show = true;
                    } else if (
                        link.name === "Login" ||
                        link.name === "Sign-up"
                    ) {
                        link.show = false;
                    }
                });
            }
        })
        .catch((err) => {
            console.error(err);
        });

    return Links;
}

export default initLinks;
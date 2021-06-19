import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/signup",
        name: "Signup",
        component: () => import("../views/Signup.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/get_session",
        name: "GetSession",
        component: () => import("../views/GetSession.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
    },
    {
        path: "/market",
        name: "Market",
        component: () => import("../views/Market.vue"),
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("../views/Settings.vue"),
        children: [
            {
                path: "",
                name: "empty",
                props: true,
                redirect: { name: "Account" },
            },
            {
                path: "account",
                name: "Account",
                props: true,
                component: () => import("../components/Settings/desktop/SettingSections/Account.vue"),
            },
            {
                path: "appearance",
                name: "Appearance",
                props: true,
                component: () => import("../components/Settings/desktop/SettingSections/Appearance.vue"),
            },
            {
                path: "privacy",
                name: "Privacy",
                props: true,
                component: () => import("../components/Settings/desktop/SettingSections/Privacy.vue"),
            },
        ],
    },

    {
        path: "/notifications",
        name: "Notifications",
        component: () => import("../views/Notifications.vue"),
    },

    {
        path: "/users",
        name: "UserSearch",
        component: () => import("../views/UserSearch.vue"),
    },

    {
        path: "/post/:postid",
        name: "Post",
        props: true,
        component: () => import("../views/Post.vue"),
    },

    {
        path: "/user/:username",
        name: "User",
        component: () => import("../views/User.vue"),
        children: [
            {
                path: "",
                name: "empty",
                props: true,
                redirect: { name: "userInformation" },
            },
            {
                path: "projects",
                name: "userProjects",
                props: true,
                component: () => import("../components/User/desktop/Sections/Projects.vue"),
            },
            {
                path: "saved",
                name: "userSavedProjects",
                props: true,
                component: () => import("../components/User/desktop/Sections/Saved.vue"),
            },
            {
                path: "purchases",
                name: "userPurchases",
                props: true,
                component: () => import("../components/User/desktop/Sections/Purchases.vue"),
            },
            {
                path: "revenue",
                name: "userRevenue",
                props: true,
                component: () => import("../components/User/desktop/Sections/Revenue.vue"),
            },
            {
                path: "information",
                name: "userInformation",
                props: true,
                component: () => import("../components/User/desktop/Sections/Information.vue"),
            },
        ],
    },

    // important to leave this as the last element
    {
        path: "*",
        name: "404",
        component: () => import("../views/404.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;

<!-- IMPORTANT: if this component is ever cached or 'kept-alive', we need to make sure the destroyed hook gets ran somehow anyway when the user redirects to another pag -->

<template>
    <div class="menu_container no_select" :style="style">
        <div class="nav_container">
            <div class="burger_blur" id="burger_menu_blur" @click="hideBurgerMenu()"></div>
            <!-- Darkens the screen for the burger menu -->
            <div
                @click.prevent="routeOrReload()"
                class="menu_logo"
                :class="{ menu_logo_desktop: !$store.getters.mobile, menu_logo_mobile: $store.getters.mobile }"
            >
                <!-- Added inline style so that the router-link-active will not change the background-color of the logo when you navigate to the home page -->
                <img v-if="!$store.getters.mobile" src="../../assets/LOGO.svg" alt="Logo" class="logo_desktop" />
                <img v-else src="../../assets/LOGOSIMPLE.svg" alt="Logo" class="logo_mobile" />
            </div>
            <!-- Static menu items (dont go into burger menu) -->
            <div class="nav_links_container">
                <div class="static_nav_links desktop_only">
                    <!--<NavBarSearch /> -->

                    <router-link to="/explore" class="static_link">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-compass"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="var(--main-font-color)"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="8 16 10 10 16 8 14 14 8 16" />
                            <circle cx="12" cy="12" r="9" />
                        </svg>
                    </router-link>
                    <router-link v-if="$store.getters.isLoggedIn" to="/notifications" class="static_link">
                        <!--
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-bell"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="var(--main-font-color)"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                            </svg>
                        -->
                        <NotificationIcon />
                    </router-link>
                    <router-link v-if="$store.getters.isLoggedIn" :to="`/user/${$store.getters.username}/`" class="static_link profile_pic">
                        <!-- PASSING THE USERNAME FROM THE STORE IS USELESS, YOU CAN DO IT DIRECTLY IN THE COMPONENT-->
                        <ProfilePicture v-if="$store.getters.username" :username="$store.getters.username" wrapperSize="50px" style="margin: 0 auto" />
                    </router-link>
                </div>
                <div class="burger_nav_links">
                    <router-link v-if="!$store.getters.isLoggedIn" to="/login" class="burger_link desktop_only">Login</router-link>
                    <router-link v-if="!$store.getters.isLoggedIn" to="/signup" class="burger_link desktop_only">Sign-up</router-link>
                </div>
                <div id="burger_icon_placeholder"></div>
                <!-- fills in the space of the actual burger icon when the burger menu is opened and is given a fixed pos -->
                <div class="burger_menu_container">
                    <div class="burger_menu_subcontainer" id="burger_menu_icon">
                        <input type="checkbox" aria-label="Toggle menu" id="burger_menu_checkbox" @click="toggleMenu()" />
                        <span></span>
                        <span></span>
                        <span></span>

                        <div class="burger_menu_cont" id="main_burger_menu">
                            <!-- make sure not to make that function have '()' because I not giving the directive the return value! -->
                            <div class="burger_cont_links" @click="hideBurgerMenu()">
                                <!--<router-link to="/">Home</router-link>-->
                                <p @click="$router.push({ path: `/` })" class="nav_link" :class="{ activeLink: $route.path == '/' }">Home</p>
                                <router-link to="/explore">All Projects</router-link>
                                <router-link v-if="$store.getters.isLoggedIn" :to="`/user/${this.$store.getters.username}/`" class="static_link profile_pic">
                                    <p>Profile</p>
                                </router-link>
                                <router-link v-if="$store.getters.isLoggedIn" to="/notifications" class="static_link">
                                    <p style="position: relative">
                                        Notifications
                                        <UnreadNumber v-if="$store.getters.mobile" style="bottom: -10px; right: 40px" />
                                        <UnreadNumber v-else style="bottom: -10px; right: 80px" />
                                    </p>
                                </router-link>
                                <router-link to="/settings/account">Settings</router-link>
                                <router-link to="/users">People</router-link>
                                <router-link to="/market">Market</router-link>
                                <router-link to="/about">About</router-link>
                                <router-link to="/policy">Privacy Policy</router-link>

                                <router-link v-if="!$store.getters.isLoggedIn" to="/login">Login</router-link>
                                <router-link v-if="!$store.getters.isLoggedIn" to="/signup">Sign-up</router-link>

                                <button v-if="$store.getters.isLoggedIn" class="logout_btn" @click="logout()">Logout</button>
                            </div>
                            <!-- Adds space below all the buttons for a better mobile experience -->
                            <div class="mobile_spacer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";
// import NavBarSearch from "./NavBarSearch.vue"; might re-add this in the future

import ProfilePicture from "@/components/User/ProfilePicture.vue";
import NotificationIcon from "@/components/Notifications/NotificationIcon.vue";
import UnreadNumber from "@/components/Notifications/UnreadNumber.vue";

import LogoutFunction from "@/mixins/logout_function.js";

export default {
    props: {
        min_width: String,
        userObject: Object,
    },
    computed: {
        style() {
            return "min-width: " + this.min_width;
        },
    },
    components: {
        ...GlobalComponents,
        //NavBarSearch,
        ProfilePicture,
        NotificationIcon,
        UnreadNumber,
    },
    destroyed() {
        document.body.style.overflow = "auto";
    },
    mixins: [LogoutFunction],
    methods: {
        toggleMenu() {
            // No idea if they are called grandparents, but its the parent of the parent
            const checkBoxGrandparent = document.getElementById("burger_menu_checkbox").parentElement.parentElement;
            const screenBlur = document.getElementById("burger_menu_blur");

            // toggle burger menu screen blur
            if (window.getComputedStyle(screenBlur).display === "none") {
                document.getElementById("burger_menu_blur").style.display = "block";

                //scroll to the top of the burger menu when you close and reopen
                document.getElementById("main_burger_menu").scrollTop = 0;
            } else {
                document.getElementById("burger_menu_blur").style.display = "none";
            }

            if (document.getElementById("burger_menu_checkbox").checked) {
                document.body.style.overflow = "hidden";
                document.getElementById("burger_icon_placeholder").style.display = "flex";
                checkBoxGrandparent.style.position = "fixed";
                checkBoxGrandparent.style.height = "var(--header-height)";
            } else {
                document.body.style.overflow = "auto";
                document.getElementById("burger_icon_placeholder").style.display = "none";
                checkBoxGrandparent.style.position = "static";
                checkBoxGrandparent.style.height = "100%";
            }
        },
        hideBurgerMenu() {
            document.getElementById("burger_menu_checkbox").click();
        },
        routeOrReload() {
            if (this.$route.path == "/") {
                this.$emit("refreshPosts", true);
            } else {
                this.$router.push("/");
            }
        },
    },
};
</script>

<style scoped>
/* Animations */
@keyframes burger_animation {
    from {
        width: 0px;
    }
    to {
        width: 300px;
    }
}
@keyframes burger_animation_mobile {
    from {
        width: 0px;
    }
    to {
        width: 225px;
    }
}
@keyframes opacityFader {
    from {
        background-color: rgba(0, 0, 0, 0);
    }
    to {
        background-color: rgba(0, 0, 0, 0.5);
    }
}


@keyframes test_animation {
    from { transform: translateX(100%) translateY(0); }
    to { transform: translateX(0) translateY(0); }
}


.mobile_spacer {
    height: 100px;
}

.nav_container {
    position: fixed;
    z-index: 6;
    top: 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: var(--header-height);
    background-color: var(--secondary-color);
}

body {
    overflow-x: hidden;
    font-family: Sans-Serif;
}

.burger_cont_links > .router-link-active {
    font-weight: bold;
    background-color: var(--main-accent);
    color: #fff;
}
.activeLink {
    text-decoration: none !important;
    font-weight: bold !important;
    background-color: var(--main-accent) !important;
    color: #fff !important;
}
.menu_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: var(--header-height);
    background-color: var(--secondary-color);
}
.menu_logo {
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.menu_logo_desktop {
    width: 250px;
}
.menu_logo_mobile {
    width: 100px;
}

.menu_logo img {
    height: 85%;
}
.menu_logo img:hover {
    transform: scale(1.02);
}

.logo_mobile {
    padding: 10px;
    margin-left: 15px;
    margin-top: -4px;
}

.nav_link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    font-weight: 100;
    font-size: 22px;
    color: var(--burger-textColor);
    width: 100%;
    height: 55px;
    margin-top: 30px;
    cursor: pointer;
}
.nav_link:hover {
    font-weight: bold;
}

.nav_links_container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-grow: 1;
}
/* Static Links Styling */

.static_nav_links {
    height: 100%;
    display: flex;
    flex-direction: row;
}
.static_link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50px;
    height: 100%;
    text-decoration: none !important;
}
.static_link svg {
    margin: 0 auto;
    width: 25px;
    height: 25px;
}
.static_link svg:hover {
    stroke-width: 2px;
}
.static_link img {
    margin: 0 auto;
}
.profile_pic {
    width: 75px;
}

/* Burger Menu Links Styling */
.burger_nav_links {
    display: flex;
    flex-direction: row;
}
.burger_link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 125px;
    margin: 0 auto;
    text-decoration: none;
    color: var(--main-font-color);
}
.burger_link:hover {
    font-weight: bold;
}
.burger_blur {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
}

/* Burger Menu Styling */
.burger_menu_container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 75px;
    height: 100%;
    margin-right: 20px;
    z-index: 50;
}
#burger_icon_placeholder {
    display: none;
    flex-direction: column;
    justify-content: center;
    width: 75px;
    height: 100%;
    margin-right: 20px;
}
#burger_menu_checkbox {
    display: block;
    width: 35px;
    height: 25px;
    margin: 0;
    position: absolute;
    cursor: pointer;
    opacity: 0; /* hide this */
    z-index: 51; /* and place it over the hamburger */
    -webkit-touch-callout: none;
}
.burger_menu_subcontainer {
    width: 33px;
    display: inline-block;
    margin: 0 auto;
}
.burger_menu_subcontainer:hover {
    cursor: pointer;
}
.burger_menu_container span {
    display: block;
    height: 4px;
    width: 33px;
    margin-bottom: 5px;
    border-radius: 3px;
    background: var(--main-font-color) !important;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
}

/* Open burger menu */

.burger_menu_cont {
    overflow-x: hidden;
    display: none;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    background-color: var(--burger-menu-bg);
    z-index: -1;
}
.burger_menu_cont:hover {
    cursor: default;
}
.burger_cont_links {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: var(--header-height);
}
.burger_cont_links a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    font-weight: 100;
    font-size: 22px;
    color: var(--burger-textColor);
    width: 100%;
    height: 55px;
    margin-top: 35px;
    transition: 0.3s;
}
.burger_cont_links a:hover {
    color: #fff;
}

.burger_cont_links input {
    text-decoration: none;
    font-family: Rubik;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 4px;
    padding: 5px;
    width: 90%;
    height: 30px;
    margin: 0 auto;
    margin-top: 10px;
}
.burger_cont_links input:focus {
    outline: none;
}

/* Burger Menu functionality */
.burger_menu_subcontainer span:first-child {
    transform-origin: 0% 0%;
}
.burger_menu_subcontainer span:nth-child(3) {
    transform-origin: 0% 100%;
}
.burger_menu_subcontainer input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(3px, -1px);
    background: var(--secondary-color);
}
.burger_menu_subcontainer input:checked ~ span:nth-child(4) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
}
.burger_menu_subcontainer input:checked ~ span:nth-child(3) {
    transform: rotate(-45deg) translate(-5px, 11px);
}

.burger_menu_subcontainer input:checked ~ .burger_menu_cont {
    display: block;
}
.burger_menu_subcontainer input:not(:checked) ~ .burger_menu_cont {
    display: none;
}

/* Other */
.logout_btn {
    text-decoration: none;
    font-weight: 100;
    font-size: 22px;
    color: var(--error-red);
    width: 100%;
    height: 55px;
    margin-top: 30px;
    border: none;
    background-color: var(--burger-menu-bg);
    font-family: rubik;
}
.logout_btn:hover {
    font-weight: bold;
    cursor: pointer;
}
.logout_btn:focus {
    outline: none;
}

/* MEDIA QUERIES */

/* mobile styles */
@media only screen and (max-width: 500px) {
    .menu_container {
        background-color: var(--main-color);
    }
    .desktop_only {
        display: none;
    }
}

@media only screen and (max-width: 950px) {
    .nav_container {
        background-color: var(--main-color);
    }
    .burger_menu_cont {
        width: 225px;
        animation: test_animation 0.5s;
    }
    .burger_cont_links a {
        font-size: 20px;
    }
    .nav_link {
        font-size: 20px;
    }
    .logout_btn {
        font-size: 20px;
    }
}
@media only screen and (min-width: 950px) {
    .nav_container {
        background-color: var(--main-color);
    }
    .burger_menu_cont {
        width: 300px;
        animation: test_animation 0.5s;
    }
}
</style>

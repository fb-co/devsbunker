<template>
    <nav class="menu-container" :style="style">
        <!-- burger menu -->
        <input type="checkbox" aria-label="Toggle menu" />
        <span></span>
        <span></span>
        <span></span>

        <!-- logo -->
        <router-link to="/" class="menu-logo">
            <!-- Added inline style so that the router-link-active will not change the background-color of the logo when you navigate to the home page -->
            <img src="https://wweb.dev/resources/navigation-generator/logo-placeholder.png" alt="Logo" />
        </router-link>

        <!-- menu items -->
        <div class="menu">
            <ul>
            </ul>
            <ul id="navbar_links">
                <li class="nav_item nav_item_icon">
                    <router-link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </router-link>
                </li>
                <li class="nav_item nav_item_icon">
                    <router-link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-compass" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="8 16 10 10 16 8 14 14 8 16" />
                            <circle cx="12" cy="12" r="9" />
                        </svg>
                    </router-link>
                </li>
                <li v-if="isLoggedIn" class="nav_item nav_item_icon">
                    <router-link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                        </svg>
                    </router-link>
                </li>
                <li v-if="isLoggedIn" class="nav_item" id="profilePicture">
                    <router-link to='/profile'>
                        <img src="../assets/profilePlaceholder.png" alt="profile_pic" style="width: 50px;">
                    </router-link>
                </li>
                <li v-if="!isLoggedIn" class="nav_item nav_item_text">
                    <router-link to="/login">Login</router-link>
                </li>
                <li v-if="!isLoggedIn" class="nav_item nav_item_text">
                    <router-link to='/signup'>Sign-up</router-link>
                </li>

                <li class="nav_item nav_item_text">
                    <Dropdown label="More" class='main_dropdown'>
                        <li>
                            <router-link to='/market'>Market</router-link>
                        </li>
                        <li>
                            <router-link to='/about'>About</router-link>
                        </li>
                        <li>
                            <router-link to='/settings/account'>Settings</router-link>
                        </li>
                    </Dropdown>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import EventBus from "../utils/EventBus";
import SharedMethods from "../utils/shared";
import GlobalComponents from "@/components/global/GlobalComponents.js";

// pro hacker move here (had to replace = cuz stoopid default base64 function)

let auth;
try {
    auth = /true/.test(
        atob(document.cookie.replace(/bGk/g, "").replace(/=/g, ""))
    )
        ? true
        : false;
} catch {
    auth = false;
}

export default {
    props: {
        min_width: String,
    },
    computed: {
        style() {
            return "min-width: " + this.min_width;
        },
    },
    data() {
        return {
            isLoggedIn: auth,
        };
    },
    components: {
        ...GlobalComponents,
    },
    beforeCreate() {
        SharedMethods.setLoginStateCookie();
    },
    created() {
        EventBus.$on("isLoggedIn", (flag) => {
            if (flag) {
                auth = true;
            } else {
                auth = false;
            }
        });
        //window.addEventListener("resize", this.resizeHandler);
    },
    /*
    destroyed() {
        window.removeEventListener("resize", this.resizeHandler);
    },
    */
};
</script>

<style scoped>
/* Animations */
@keyframes burger_animation {
    from {
        width: 0px;
    }
    to {
        width: 250px;
    }
}

body {
    overflow-x: hidden;
    font-family: Sans-Serif;
}
.menu-container {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--secondary-color);
    color: var(--main-font-color);
    padding: 20px;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
    box-sizing: border-box;
    height: var(--header-height);
}
.menu-logo {
    line-height: 0;
    margin-left: 25px;
    z-index: 1;
    background-color: var(--secondary-color);
}
.menu-logo img {
    max-height: 40px;
    max-width: 100px;
    flex-shrink: 0;
}

/* menu-container p hover styles are listed below since there may be instances where we dont want to bold the p tags */
.menu-container a:hover {
    font-weight: bold;
}

/* Bold the font for p tags in the navlinks container */
.menu p:hover {
    font-weight: bold;
}

.menu-container input {
    display: block;
    width: 35px;
    height: 25px;
    margin: 0;
    position: absolute;
    cursor: pointer;
    opacity: 0; /* hide this */
    z-index: 2; /* and place it over the hamburger */
    -webkit-touch-callout: none;
}

/* Burger menu */
.menu-container span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: var(--main-font-color);
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
}

/* Burger Menu Spans */
.menu-container span:first-child {
    transform-origin: 0% 0%;
}
.menu-container span:nth-child(3) {
    transform-origin: 0% 100%;
}
.menu-container input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(3px, -1px);
    background: var(--secondary-color);
}
.menu-container input:checked ~ span:nth-child(4) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
}
.menu-container input:checked ~ span:nth-child(3) {
    transform: rotate(-45deg) translate(-5px, 11px);
}

/* Nav Links */
.menu ul {
    list-style: none;
}
.nav_item {
    display: inline-block;
    height: var(--header-height);
    width: auto;
}
/* for nav items with an icon in them */
.nav_item_icon {
    width: 50px;
}
.nav_item_icon a {
    display: inline-block;
    height: 100%;
}
.nav_item_icon svg {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    height: 25px;
}
.nav_item_icon svg:hover {
    stroke-width: 2px;
}

/* for nav items with text in them */
.nav_item_text {
    width: 150px;
}
.nav_item_text > a {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    line-height: var(--header-height);
}
.main_dropdown {
    height: 100%;
}

/* profile picture */
#profilePicture {
    width: 75px;
}
#profilePicture img {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

/* MEDIA QUERIES */

/* mobile styles */
@media only screen and (max-width: 767px) {
    .menu-container {
        flex-direction: column;
        align-items: flex-end;
        background-color: var(--main-color);
    }
    .menu-logo {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background-color: var(--main-color);
    }
    .menu-logo img {
        max-height: 30px;
    }

    .menu-container input:checked ~ .menu {
        box-sizing: border-box;
        position: absolute;
        overflow-x: hidden;
        top: 0;
        right: 0;
        background-color: var(--main-font-color);
        width: 250px;
        height: 100vh;
        animation: burger_animation 0.5s;
    }
    .menu-container input:not(:checked) ~ .menu {
        display: none;
    }
    .menu ul {
        width: 100%;
        margin-top: 60px;
    }
    .menu a {
        width: 100%;
        height: 75px;
    }
}
/* desktop styles */
@media only screen and (min-width: 767px) {
    .menu-container {
        width: 100%;
    }
    .menu-container a {
        color: var(--main-font-color);
    }
    .menu-container input {
        display: none;
    }
    /* Burger menu */
    .menu-container span {
        display: none;
    }
    .menu {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .menu ul {
        padding: 0;
        display: flex;
    }
    .nav_item {
        font-size: 18px;
        margin: -20px 0px -20px 0px;
    }
}
</style>
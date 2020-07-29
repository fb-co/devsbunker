<template>
    <nav class="menu-container">
        <!-- burger menu -->
        <input type="checkbox" aria-label="Toggle menu" />
        <span></span>
        <span></span>
        <span></span>

        <!-- Header Text -->
        <div class="header_text">
            <div class="vertical_center horizontal_center">
                <h1 class="mainHeader">{{ headerText }}</h1>
            </div>
        </div>

        <!-- logo -->
        <router-link to="/" class="menu-logo" style="background-color: var(--secondary-color);">
            <!-- Added inline style so that the router-link-active will not change the background-color of the logo when you navigate to the home page -->
            <img src="https://wweb.dev/resources/navigation-generator/logo-placeholder.png" alt="Logo" />
        </router-link>

        <!-- menu items -->
        <div class="menu">
            <ul>
            </ul>
            <ul>
                <!-- displaying links with for loop to keep the template element clean -->
                <li v-for="link in links" :key="link.id" :id="link.id">
                    <router-link v-if="link.show" :to="link.to" class="main_link">{{link.name}}</router-link>
                </li>

                <li id="more_link">
                    <p class="main_link">More</p>
                </li>
                <div id="more_dropdown">
                    <!--
                    <router-link to="/about" class="dropdown_link">About</router-link>
                    <router-link to="/signup" class="dropdown_link">Sign-up</router-link>
                    <router-link to="/login" class="dropdown_link">Login</router-link>
                    -->
                </div>
            </ul>
        </div>
    </nav>
</template>

<script>
import EventBus from "../utils/EventBus";
import Links from "../templates/NavbarLinks";

export default {
    props: {
        headerText: String,
    },
    data() {
        return {
            // navbar links
            links: Links,
        };
    },
    created() {
        // when we create the navbar we basically create an event listener using the Event Bus
        EventBus.$on("isLoggedIn", (flag) => {
            if (flag) {
                // user is logged in so we modify the links
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
            } else {
                // user logged out so we switch back to the og links
                Links.forEach((link) => {
                    if (link.name === "Profile") {
                        link.show = false;
                    } else if (
                        link.name === "Login" ||
                        link.name === "Sign-up"
                    ) {
                        link.show = true;
                    }
                });
            }
        });
        window.addEventListener("resize", this.resizeHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.resizeHandler);
    },
    methods: {
        resizeHandler() {
            const navElements = this.links;
            const navBarShrinkMin = 1650; //screen width (px) where the navbar should shart shrinking

            //set all elements back to visible so that they will re-appear when the page is expanded
            for (let i = 0; i < navElements.length; i++) {
                navElements[i].show = true;
            }

            if (window.innerWidth < navBarShrinkMin) {
                const screenUnits = Math.floor((navBarShrinkMin - window.innerWidth) / 150); // Gets the amount of links it should remove
                const amount = screenUnits < navElements.length - 2 ? screenUnits : navElements.length - 2; // gets the amount of links it can remove (leaves two)

                for (let i = navElements.length - 1; i > (navElements.length - 1) - amount; i--) {
                    navElements[i].show = false;
                }
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
    margin-bottom: 20px;
    background: var(--secondary-color);
    color: var(--main-font-color);
    padding: 20px;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
    box-sizing: border-box;
    height: 80px;
}
.menu-logo {
    line-height: 0;
    margin-left: 25px;
    z-index: 1;
}
.menu-logo img {
    max-height: 40px;
    max-width: 100px;
    flex-shrink: 0;
}
.main_link {
    width: 150px;
    text-decoration: none;
    color: var(--secondary-color);
    transition: color 0.3s ease;
}
.menu-container p {
    width: 150px;
    text-decoration: none;
    color: var(--main-font-color);
    transition: color 0.3s ease;
}
.menu-container a:hover {
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

.main_link {
    display: inline-block;
    padding: 30px;
    box-sizing: border-box;
}
.header_text {
    margin: -20px;
    position: absolute;
    width: 100%;
    height: 100%;
}

/* More dropdown */
.dropdown_link {
    text-decoration: none;
    display: none;
    height: 50px;
    width: 100%;
}
#more_link {
    display: none;
}
#more_link:hover {
    font-weight: bold;
    cursor: pointer;
}

#more_dropdown {
    padding-top: 20px;
    display: none;
    background-color: var(--secondary-color);
    position: absolute;
    top: 60px;
    right: -10px;
    width: 200px;
    height: auto;
}
#more_link:hover + #more_dropdown {
    display: inline-block;
}
#more_dropdown:hover {
    display: inline-block;
}

/* MEDIA QUERIES */

/* mobile styles */
@media only screen and (max-width: 767px) {
    .menu-container {
        flex-direction: column;
        align-items: flex-end;
    }
    .menu-logo {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
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
    .router-link-exact-active {
        background-color: var(--accent);
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
    .menu li {
        font-size: 18px;
        margin: -20px 0px -20px 0px;
    }
    .menu li:last-child {
        margin: -20px 5px -20px 0px;
    }
    .router-link-exact-active {
        font-weight: bold;
    }
}
</style>
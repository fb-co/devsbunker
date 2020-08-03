<template>
    <nav class="menu-container">
        <!-- burger menu -->
        <input type="checkbox" aria-label="Toggle menu" />
        <span></span>
        <span></span>
        <span></span>

        <!-- logo -->
        <router-link to="/" class="menu-logo" style="background-color: var(--secondary-color);">
            <!-- Added inline style so that the router-link-active will not change the background-color of the logo when you navigate to the home page -->
            <img src="https://wweb.dev/resources/navigation-generator/logo-placeholder.png" alt="Logo" />
        </router-link>

        <!-- menu items -->
        <div class="menu">
            <ul>
            </ul>
            <ul id = "navbar_links"> 
                <li class = "navbarSVG">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <circle cx="10" cy="10" r="7" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                </li>  
                <li class = "navbarSVG">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-compass" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <polyline points="8 16 10 10 16 8 14 14 8 16" />
                        <circle cx="12" cy="12" r="9" />
                    </svg>
                </li>  
                <li class = "navbarSVG">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                </li>
                <li class = "navbarLink">
                    <router-link to="/login">Login</router-link>
                </li>
                <li class = "navbarLink">
                    <router-link to='/signup'>Sign-up</router-link>
                </li>
                <li class = "navbarP" id = "more_dropdown_container">
                    <p>
                        More
                        <svg class = "inline-icon-spacer" width="8" height="8" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="var(--main-font-color)"/>
                        </svg>
                    </p>
                    <div id = "more_dropdown">
                        <router-link to = '/about'>About</router-link>    
                        <router-link to = '/'>Example</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
//import EventBus from "../utils/EventBus";
//import Links from "../templates/NavbarLinks";

export default {
    created() {
        // when we create the navbar we basically create an event listener using the Event Bus
        /*
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
        */
        //window.addEventListener("resize", this.resizeHandler);
    }
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
    margin-bottom: 20px;
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
#navbar_links li {
    height: var(--header-height);
    display: inline-block;
    box-sizing: border-box;
}


/* Navbar link with a p tag inside ------------/

/* container for p tag */
.navbarP {
    width: 150px;
}
/* the p tag */
.navbarP p { 
    width: 100%;
    line-height: var(--header-height); /* This just centers the link vertically */
}
.navbarP p:hover { 
    font-weight: bold;
    cursor: pointer;
}

/* Navbar link with a router-link/a tag inside ------------/

/* container for a tag */
.navbarLink {
    width: 150px;
}

/* the a tag */
.navbarLink a { 
    text-decoration: none;
    line-height: var(--header-height); /* This just centers the link vertically */
}

/* Navbar link with a p tag inside ------------/

/* container for p tag */
.navbarP {
    width: 150px;
}
/* the p tag */
.navbarP p { 
    width: 100%;
    line-height: var(--header-height); /* This just centers the link vertically */
}
.navbarP p:hover { 
    font-weight: bold;
    cursor: pointer;
}

/* svg tags in the navbar -----------------*/

/* the container for the svg */
.navbarSVG { 
    width: 50px;
}
/* The actual svg */
.navbarSVG svg {
    width: 25px;
    height: 25px;
    position: relative;
    top: 50%; 
    transform: translateY(-50%);
} 
.navbarSVG svg:hover { 
    cursor: pointer;
    stroke-width: 2;
}


/* More Dropdown */

/* functionality to make the dropdown appear when you hover over the more option */
#more_dropdown_container:hover > div {
    display: block;
}

/* Style for the dropdown container */
#more_dropdown {
    display: none;
    background-color: var(--secondary-color);
    width: 150px;
    height: auto;
}

/* Style for all links in the dropdown */
#more_dropdown > a {
    text-decoration: none;
    display: block;
    box-sizing: border-box;
    padding: 15px;
}

/* Add some extra space at the bottom of the dropdown menu */
#more_dropdown:last-child {
    padding-bottom: 10px;
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
    .router-link-exact-active {
        font-weight: bold;
    }
}
</style>
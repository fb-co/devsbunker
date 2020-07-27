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
                <li id = "home_link">
                    <router-link to="/" class="main_link">Home</router-link>
                </li>
                <li id = "projects_link">
                    <router-link to="/projects" class="main_link">Projects</router-link>
                </li>
                <li id = "about_link">
                    <router-link to="/about" class="main_link">About</router-link>
                </li>
                <li id = "signin_link">
                    <router-link to="/signup" class="main_link">Sign-up</router-link>
                </li>
                <li id = "login_link">
                    <router-link to="/login" class="main_link">Login</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        headerText: String,
    }
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
.menu-container a {
    width: 150px;
    text-decoration: none;
    color: var(--secondary-color);
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
@media only screen and (min-width: 768px) {
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

    /* Media Queries for Subtle Page Resizing */
    @media only screen and (max-width: 1300px) {
        #login_link {
            display: none;
        }
    }
    @media only screen and (max-width: 1150px) {
        #signin_link {
            display: none;
        }
    }
    @media only screen and (max-width: 1000px) {
        #about_link {
            display: none;
        }
    }
}
</style>
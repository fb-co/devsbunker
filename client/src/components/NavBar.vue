<template>
    <nav class="menu-container">
        <!-- burger menu -->
        <input type="checkbox" aria-label="Toggle menu" />
        <span></span>
        <span></span>
        <span></span>

        <!-- logo -->
        <router-link to="/" class="menu-logo">
            <img src="https://wweb.dev/resources/navigation-generator/logo-placeholder.png" alt="Logo" />
        </router-link>
        
        <!-- Header Text -->
        <div class = "header_text">
            <div class = "vertical_center horizontal_center">
                <h1>{{ headerText }}</h1>
            </div>
        </div>

        <!-- menu items -->
        <div class="menu">
            <ul>
            </ul>
            <ul>
                <li>
                    <router-link to="/signup">Sign-up</router-link>
                </li>
                <li>
                    <router-link to="/login">Login</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        headerText: String
    }
};
</script>

<style scoped>
body {
    overflow-x: hidden;
    font-family: Sans-Serif;
    margin: 0;
}

.menu-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: #2e2e2e;
    color: #f2f2f2;
    padding: 20px;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
    box-sizing: border-box;
}

.menu-logo {
    line-height: 0;
    margin: 0 20px;
}

.menu-logo img {
    max-height: 40px;
    max-width: 100px;
    flex-shrink: 0;
}

.menu-container a {
    text-decoration: none;
    color: #2e2e2e;
    transition: color 0.3s ease;
}

.menu-container a:hover {
    color: #2c6975;
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
    background: #f2f2f2;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
}

.menu-container span:first-child {
    transform-origin: 0% 0%;
}

.menu-container span:nth-child(3) {
    transform-origin: 0% 100%;
}

.menu-container input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(3px, -1px);
    background: #2e2e2e;
}

.menu-container input:checked ~ span:nth-child(4) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
}

.menu-container input:checked ~ span:nth-child(3) {
    transform: rotate(-45deg) translate(-5px, 11px);
}

.menu ul {
    list-style: none;
}

.menu li {
    padding: 10px 0;
    font-size: 18px;
}

.header_text{
    margin: -20px;
    position: absolute;
    width: 100%;
    height: 100%;
}

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

    .menu {
        position: absolute;
        box-sizing: border-box;
        width: 300px;
        right: -300px;
        top: 0;
        margin: -20px;
        padding: 75px 50px 50px;
        background: #f2f2f2;
        -webkit-font-smoothing: antialiased;
        /* to stop flickering of text in safari */
        transform-origin: 0% 0%;
        transform: translateX(0%);
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    }

    .menu-container input:checked ~ .menu {
        transform: translateX(-100%);
    }
}

/* desktop styles */
@media only screen and (min-width: 768px) {
    .menu-container {
        width: 100%;
    }

    .menu-container a {
        color: #f2f2f2;
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
        display: flex;
        padding: 0;
    }

    .menu li {
        padding: 0 20px;
    }
}
</style>
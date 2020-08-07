<template>
    <div id="app">
        <!--<NavBar />-->
        <router-view />
    </div>
</template>

<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

/* CSS Vars */

:root {
    --footer-size: 60px;
    --header-height: 80px;

    --main-color: #212020;
    --secondary-color: #2e2e2e;
    --main-font-color: #f2f2f2;
    --error-red: #c50000;
    --accent: #2c6975;
    --vue-green: #42b983;
    --link-color: #6096fd;
    --selection: #f2f2f2;
    --soft-text: rgba(242, 242, 242, 0.5);
}

::selection {
    background: var(--selection);
    color: var(--main-color);
}

body {
    background-color: var(--main-color);
    color: var(--main-font-color);
}

#app {
    font-family: "Rubik", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

.router-link-exact-active {
    font-weight: bold;
}

/* Class Styles */
.horizontal_center {
    width: 100%;
    text-align: center;
}
.vertical_center {
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
.mainHeader {
    font-size: 2rem;
}
.large_logo {
    margin-top: 40px;
    width: 200px;
    height: auto;
}
.required_symbol {
    color: red;
    margin-left: 10px;
    float: left;
}
/* the content_containter and content_subContainer classes allows you to pack all the items in a page into two more nested divs mainly to incorperate footers */
.content_container {
    min-height: 100vh;
}
.content_subContainer {
    overflow: auto;
    padding-bottom: 75px;
}
.mainFooter {
    position: relative;
    top: 0px;
    height: var(--footer-size);
    margin-top: calc(var(--footer-size) * -1);
    clear: both;
}
/* General Container for pages (goes in template tags) */
.pageContainer {
    width: 100%;
    height: 100vh;
}


/* Form Things */
.form_field_line {
    background-image: linear-gradient(
        to right,
        var(--secondary-color) 0%,
        var(--main-font-color) 2%,
        var(--main-font-color) 98%,
        var(--secondary-color) 100%
    );
    opacity: 0.5;
}   

/* Apply this to an inline icon to put some space between the text and the icon */
.inline-icon-spacer {
    margin-left: 5px;
}

</style>

<script>
//import NavBar from "@/components/NavBar";

export default {
    components: {
        //NavBar
    },
};
</script>

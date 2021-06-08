<template>
    <div>
        <div id="app" v-if="!isFetching">
            <Navbar />
            <router-view ref="page_content" />
            <BottomNavBar v-if="$store.getters.mobile" @updateFeed="updateFeed($event)" />
        </div>

        <Loading v-if="isFetching" />
    </div>
</template>

<script>
import Loading from "./components/Loading";
import Navbar from "./components/NavBar";
import BottomNavBar from "./components/BottomNavBar";

export default {
    data() {
        return {
            isFetching: true,
        };
    },

    components: {
        Loading,
        Navbar,
        BottomNavBar,
    },

    destroyed() {
        window.removeEventListener("resize", () => {});
    },
    async beforeMount() {
        await this.$store.dispatch("autoRefreshAccessToken");
        await this.$store.dispatch("setLoggedInState");
        this.$store.dispatch("checkMobile");

        // check if caching is supported and shove it into the store
        this.$store.dispatch("checkCacheSupport");

        this.isFetching = false;
    },

    methods: {
        updateFeed() {
            this.$refs.page_content.updateFeed(true);
        }
    }
};
</script>

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
    --default-mobile-thresh: 950px;

    --main-color: #16171b;
    --secondary-color: #2e2e2e;
    --main-font-color: #f2f2f2;
    --error-red: #c50000;
    --accent: #2c6975;
    --vue-green: #42b983;
    --link-color: #6096fd;
    --selection: #f2f2f2;
    --soft-text: rgba(242, 242, 242, 0.5);
    --settings-mobile-card: #2e2e2e;
    --burger-menu-bg: #2a2a2a;
    --main-accent: #49cce5;
    --drop-shadow: rgba(0, 0, 0, 0.1);

    /* profile page */
    --profile-option-color: #656565;
    --hover-effect: linear-gradient(90deg, black 3%, #2e2e2e 100%);
}

::selection {
    background: var(--selection);
    color: var(--main-color);
}

body {
    background-color: var(--main-color);
    color: var(--main-font-color);
}
/* Handles for inputs with light backgrounds despite the theme */
.light_input_selection::selection {
    background: #0d0d0d;
    color: #ffffff;
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
    margin: 0 auto;
}
.horizontal_flex_center {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.vertical_center {
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
.vertical_flex_center {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.placeholder {
    flex-grow: 1;
}
.line {
    background-image: linear-gradient( to right, var(--secondary-color) 0%, var(--soft-text) 40%, var(--soft-text) 60%, var(--secondary-color) 100% );
    width: 90%;
    height: 1.5px;
    margin: 0 auto;
    border-radius: 5px;
}
.relative_vertical_center {
    position: relative;
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
/* General Container for pages (goes in template tags and does not include header) */
.pageContainer {
    width: 100%;
    height: calc(100vh - var(--header-height));
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
    margin-left: 10px;
}

/* disable highlight text for some text */
.no_select {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
}

/* SCROLL BAR UNIVERSAL STYLES (uncompatible with firefox) */

/* scrollbar width */
::-webkit-scrollbar {
    width: 5px;
}

/* scrollbar track */
::-webkit-scrollbar-track-piece {
    background-color: var(--main-color);
    margin-top: 20px;
    margin-bottom: 20px;
}

/* handle */
::-webkit-scrollbar-thumb:vertical {
    border-radius: 20px;
    background-color: var(--soft-text);
}
</style>



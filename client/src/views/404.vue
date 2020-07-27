<template>
    <div id="notfound">
        <div class="notfound">
            <div class="notfound-404">
                <h1><span>4</span><span>0</span><span>4</span></h1>
            </div>
            <h2>Oops! Page not found!</h2>
            <div class="draw-border">
                <button class="btn" @click="redirectToHome">Home</button>
            </div>
        </div>
    </div>
</template>

<script>
import SharedMethods from "../shared";

export default {
    created() {
        SharedMethods.loadPage();
    },
    methods: {
        redirectToHome() {
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

body {
    padding: 0;
    margin: 0;
}

#notfound {
    position: relative;
    height: 100vh;
}

#notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.notfound {
    max-width: 520px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
}

.notfound .notfound-404 {
    position: relative;
    height: 240px;
}

.notfound .notfound-404 h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 252px;
    font-weight: 900;
    margin: 0px;
    color: var(--vue-green);
    text-transform: uppercase;
    letter-spacing: -40px;
    margin-left: -20px;
}

.notfound .notfound-404 h1 > span {
    text-shadow: -8px 0px 0px var(--main-font-color);
}

.notfound h2 {
    font-size: 20px;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--main-font-color);
    margin-top: 0px;
    margin-bottom: 25px;
}

@media only screen and (max-width: 767px) {
    .notfound .notfound-404 {
        height: 200px;
    }
    .notfound .notfound-404 h1 {
        font-size: 200px;
    }
}

@media only screen and (max-width: 480px) {
    .notfound .notfound-404 {
        height: 162px;
    }
    .notfound .notfound-404 h1 {
        font-size: 162px;
        height: 150px;
        line-height: 162px;
    }
    .notfound h2 {
        font-size: 16px;
    }
}

.draw-border {
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn {
    border: 0;
    background: none;
    text-transform: uppercase;
    color: var(--link-color);
    font-weight: bold;
    font-size: 17px;
    position: relative;
    outline: none;
    padding: 10px 20px;
    box-sizing: border-box;
}

.btn::before,
.btn::after {
    box-sizing: inherit;
    position: absolute;
    content: "";
    border: 2px solid transparent;
    width: 0;
    height: 0;
}
.btn::after {
    bottom: 0;
    right: 0;
}

.btn::before {
    top: 0;
    left: 0;
}
.btn:hover::before,
.btn:hover::after {
    width: 100%;
    height: 100%;
}
.btn:hover::before {
    border-top-color: var(--link-color);
    border-right-color: var(--link-color);
    transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
}

.btn:hover::after {
    border-bottom-color: var(--link-color);
    border-left-color: var(--link-color);
    transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s,
        height 0.3s ease-out 1s;
}
</style>
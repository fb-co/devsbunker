<template>
    <div id="notfound">
        <div class="notfound">
            <div class="notfound-404">
                <h1><span>4</span><span>0</span><span>4</span></h1>
            </div>
            <h2>Oops! Page not found!</h2>
            <button class="btn" @click="redirectToHome">Home</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        redirectToHome() {
            this.$router.push("/");
        }
    }
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

.btn {
    width: 150px;
    margin-top: 10px;
    font-size: 1.3rem;
    text-align: center;
    background-color: var(--main-color);
    border: 1px solid var(--vue-green);
    color: var(--vue-green);
    padding: 0px 0px;
    cursor: pointer;
    transition: 0.6s;
    height: 40px;
}

.btn:hover {
    color: var(--main-font-color);
    border-color: var(--main-font-color);
}
</style>
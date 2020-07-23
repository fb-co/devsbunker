<template>
    <div class="login">
        <NavBar headerText=""></NavBar>

        <div id="error">{{ errMessage }}</div>

        <div class="loginForm">
            <p class="cardTitle">Login</p>
            <form name="login" v-on:submit.prevent="submitForm">

                <!-- <label class="textLabel" for="userID">Username or Email</label> -->
                <svg id="userIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c4c4c4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>

                <input id="userID" name="userID" v-model="userID" autocapitalize="off" placeholder="Username or Email" required>
                <div id="bottomLine-1"></div>

                <!-- <label class="textLabel" for="password">Password</label> -->

                <svg id="passIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c4c4c4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>

                <input type="password" id="password" name="password" v-model="password" placeholder="Password" required>
                <div id="bottomLine-2"></div>

                <input type="submit" value="Login">

            </form>

            <div class="otherOption">
                <p class="otherOption">Or login with</p>

                <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="svg4073" width="48" height="48">
                    <metadata id="metadata4079">
                        <rdf:RDF>
                            <cc:Work rdf:about="">
                                <dc:format>image/svg+xml</dc:format>
                                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                            </cc:Work>
                        </rdf:RDF>
                    </metadata>
                    <defs id="defs4077" />
                    <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="640" inkscape:window-height="480" id="namedview4075" />
                    <inkscape:clipboard style="font-variant-east_asian:normal;opacity:1;vector-effect:none;fill:#ffffff;fill-opacity:1;stroke-width:1.3333333;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;stroke:none" min="181.7604,182.3607" max="225.19906,224.72719" />
                    <g transform="matrix(1.3333333,0,0,-1.3333333,21.717333,0)" id="g196">
                        <path inkscape:connector-curvature="0" id="path198" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none" d="m 0,0 c -8.995,0 -16.288,-7.293 -16.288,-16.29 0,-7.197 4.667,-13.302 11.14,-15.457 0.815,-0.149 1.112,0.354 1.112,0.786 0,0.386 -0.014,1.411 -0.022,2.77 -4.531,-0.984 -5.487,2.184 -5.487,2.184 -0.741,1.882 -1.809,2.383 -1.809,2.383 -1.479,1.01 0.112,0.99 0.112,0.99 1.635,-0.115 2.495,-1.679 2.495,-1.679 1.453,-2.489 3.813,-1.77 4.741,-1.353 0.148,1.052 0.568,1.77 1.034,2.177 -3.617,0.411 -7.42,1.809 -7.42,8.051 0,1.778 0.635,3.232 1.677,4.371 -0.168,0.412 -0.727,2.068 0.159,4.311 0,0 1.368,0.438 4.48,-1.67 1.299,0.362 2.693,0.542 4.078,0.548 1.383,-0.006 2.777,-0.186 4.078,-0.548 3.11,2.108 4.475,1.67 4.475,1.67 0.889,-2.243 0.33,-3.899 0.162,-4.311 1.044,-1.139 1.675,-2.593 1.675,-4.371 0,-6.258 -3.809,-7.635 -7.438,-8.038 0.585,-0.503 1.106,-1.497 1.106,-3.017 0,-2.177 -0.02,-3.934 -0.02,-4.468 0,-0.436 0.293,-0.943 1.12,-0.784 6.468,2.159 11.131,8.26 11.131,15.455 C 16.291,-7.293 8.997,0 0,0" />
                    </g>
                </svg>

            </div>

        </div>
        <button v-on:click="changeTheTheme()">Dark Theme</button>
        <button v-on:click="changeTheThemeLight()">Light Theme</button>
        <!--<router-link class="bigRoute" to="/signup">Don't have an account? Create one here.</router-link>-->
    </div>
</template>


<script>
import UserService from "../services/user.service";
import SharedMethods from "../shared";

import NavBar from "@/components/NavBar";

window.onload = function () {
    SharedMethods.initTheme();
};

export default {
    created() {
        SharedMethods.checkIfLoggedIn()
            .then((result) => {
                if (result) {
                    this.$router.push("/profile");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    },
    data() {
        return {
            userID: "",
            password: "",
            errMessage: "",
        };
    },
    components: {
        NavBar,
    },
    methods: {
        async submitForm() {
            const result = await UserService.login(this.userID, this.password);

            if (/Incorrect/.test(result.message)) {
                this.errMessage = "Incorrect credentials.";
            } else {
                this.errMessage = "";
                localStorage.setItem("token", result.token);

                this.$router.push("/profile");
            }
        },
        changeTheTheme() {
            SharedMethods.changeTheme("dark-theme");
        },
        changeTheThemeLight() {
            SharedMethods.changeTheme("light-theme");
        },
    },
};
</script>

<style scoped>
.cardTitle {
    font-size: 30px;
    font-weight: 700;
    margin-top: 25px;
    color: var(--main-font-color);
}
.loginForm {
    padding: 20px;
    width: 450px;
    max-width: 800px;
    height: 600px;
    background-color: #0d0d0d;
    border-radius: 10px;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

form {
    margin-top: 40px;
}

input,
select,
textarea {
    outline: 0;
    border: 0;
    width: 80%;
    padding: 12px;
    background-color: #171717;
    color: var(--main-font-color);
    box-sizing: border-box;
    margin-top: 30px;
    margin-bottom: 50px;
    height: 30px;
}

input::placeholder {
    font-size: 18px;
    color: rgba(242, 242, 242, 0.8);
}

.textLabel {
    color: var(--main-font-color);
    float: left;
    font-weight: 400;
    margin-left: 25px;
    margin-bottom: 7px;
}

input[type="submit"] {
    width: 93%;
    font-size: 1rem;
    font-weight: 900;
    text-align: center;
    background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
    box-shadow: 0px 15px 30px rgba(20, 102, 204, 0.16);
    filter: drop-shadow(0px 24px 48px rgba(99, 60, 247, 0.15));
    border-radius: 16px;
    padding: 0px 0px;
    cursor: pointer;
    transition: 0.6s;
    height: 45px;
    margin-top: 10px;
}

input[type="submit"]:hover {
    color: var(--main-font-color);
    border-color: var(--main-font-color);
}

#error {
    width: 25%;
    max-width: 230px;
    margin: auto;
    margin-top: 40px;
    color: var(--error-red);
    font-weight: 600;
    font-size: 20px;
    text-align: center;
}

@media only screen and (max-width: 800px) {
    #error {
        width: 100%;
    }
    .loginForm {
        width: 60%;
    }
}
@media only screen and (max-width: 450px) {
    .loginForm {
        display: none;
    }
}

#bottomLine-1 {
    border-bottom: 1px solid var(--main-font-color);
    width: 85%;
    position: absolute;
    top: 197px;
    left: 35px;
}

#bottomLine-2 {
    border-bottom: 1px solid var(--main-font-color);
    width: 85%;
    position: absolute;
    top: 305px;
    left: 35px;
}

#userIcon {
    position: absolute;
    left: 37px;
    top: 150px;
}

#passIcon {
    position: absolute;
    left: 37px;
    top: 259px;
}

.otherOption {
    margin-bottom: 30px;
    font-weight: 100;
    color: rgba(242, 242, 242, 0.5);
}
</style>
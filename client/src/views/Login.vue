<template>
    <div class="login">
        <NavBar headerText=""></NavBar>

        <div class="loginForm">
            <p v-if="!errMessage" class="cardTitle">Login</p>
            <p v-if="errMessage" class="cardTitle err">{{ errMessage}}</p>

            <form name="login" v-on:submit.prevent="submitForm">

                <svg id="userIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c4c4c4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>

                <input @click="errMessage ? errMessage = '' : _" id="userID" class="form_field" name="userID" v-model="userID" autocapitalize="off" placeholder="Username or Email" autocomplete="off" required>
                <div v-bind:class="{errLine: errMessage}" class="bottomLine-1"></div>

                <svg id="passIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c4c4c4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>

                <input @click="errMessage ? errMessage = '' : _" type="password" id="password" class="form_field" name="password" style="margin-left: 25px;" v-model="password" placeholder="Password" required>
                <div v-bind:class="{errLine: errMessage}" class="bottomLine-2"></div>

                <svg v-if="hidePassword" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye selectable_icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" v-on:click="togglePassword()">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                    <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                </svg>

                <svg v-if="!hidePassword" @click="togglePassword()" class="selectable_icon" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="svg4828" width="24.25" height="24.25">
                    <metadata id="metadata4834">
                        <rdf:RDF>
                            <cc:Work rdf:about="">
                                <dc:format>image/svg+xml</dc:format>
                                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                            </cc:Work>
                        </rdf:RDF>
                    </metadata>
                    <defs id="defs4832" />
                    <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="640" inkscape:window-height="480" id="namedview4830" />
                    <inkscape:clipboard style="font-variant-east_asian:normal;opacity:1;vector-effect:none;fill:#000000;fill-opacity:1;stroke-width:0.75781249;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" min="3.3750003,2.8125006" max="27.624999,27.0625" />
                    <g transform="matrix(0.75781249,0,0,0.75781249,0.85253882,1.3735348)" id="g4792">
                        <g id="g4782">
                            <g id="g4773">
                                <g id="g4763" transform="matrix(1.3333333,0,0,1.3333333,-1.1249997,-1.8124996)">
                                    <path id="path4743" d="M 0,0 H 24 V 24 H 0 Z" inkscape:connector-curvature="0" style="stroke:none" />
                                    <circle id="circle4745" r="2" cy="12" cx="12" />
                                    <path id="path4747" d="m 2,12 1.5,2 a 11,11 0 0 0 17,0 L 22,12" inkscape:connector-curvature="0" />
                                    <path id="path4749" d="m 2,12 1.5,-2 a 11,11 0 0 1 17,0 l 1.5,2" inkscape:connector-curvature="0" />
                                </g>
                                <rect id="rect4765" width="3.9325533" height="28.838724" x="18.673452" y="-12.410653" transform="rotate(39.048251)" />
                            </g>
                        </g>
                    </g>
                </svg>

                <router-link to='/profile/reset-password' id='forgot_link'>Forgot Password?</router-link>

                <input type="submit" value="Login">

            </form>

            <div class="otherOption">
                <p class="otherOption">Or login with</p>

                <router-link to='/'>
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
                </router-link>

            </div>

        </div>
        <!-- <button v-on:click="changeTheTheme()">Dark Theme</button>
        <button v-on:click="changeTheThemeLight()">Light Theme</button> -->
        <!--<router-link class="bigRoute" to="/signup">Don't have an account? Create one here.</router-link>-->
    </div>
</template>


<script>
import UserService from "../services/user.service";
import SharedMethods from "../shared";

import NavBar from "@/components/NavBar";

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

        SharedMethods.initTheme();
    },
    data() {
        return {
            userID: "",
            password: "",
            errMessage: "",
            hidePassword: "",
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
        togglePassword() {
            let element = document.getElementById("password");

            if (element.type === "password") {
                element.type = "text";
                this.hidePassword = true;
            } else {
                element.type = "password";
                this.hidePassword = false;
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
/* Animations */
@keyframes form_field_animation {
    from {
        width: 80%;
        margin-left: 0%;
    }
    to {
        width: 85%;
        margin-left: -2%;
    }
}

.cardTitle {
    font-size: 25px;
    font-weight: 700;
    margin-top: 30px;
    color: var(--main-font-color);
}

.err {
    color: var(--error-red);
    text-align: center;
}

@media only screen and (max-width: 305px) {
    .cardTitle {
        font-size: 20px;
        margin-top: 35px;
    }
}

@media only screen and (max-width: 250px) {
    .cardTitle {
        font-size: 15px;
        margin-top: 42px;
    }
}

.loginForm {
    padding: 20px;
    width: 450px;
    max-width: 800px;
    height: 600px;
    background-color: var(--secondary-color);
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
    background-color: var(--secondary-color);
    color: var(--main-font-color);
    box-sizing: border-box;
    margin-top: 30px;
    margin-bottom: 50px;
    height: 30px;
    font-size: 18px;
}

input::placeholder {
    font-size: 18px;
    color: rgba(242, 242, 242, 0.8);
}

.form_field {
    width: 75%;
    padding-top: 12px;
}
.form_field::-webkit-input-placeholder {
    opacity: 0.5;
}

.form_field:focus + .bottomLine-1 {
    border-bottom: 2px solid var(--main-font-color);
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
}
.form_field:focus + .bottomLine-2 {
    border-bottom: 2px solid var(--main-font-color);
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
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
    height: 45px;
}

input[type="submit"]:hover {
    background: linear-gradient(250deg, #8743ff 0%, #4136f1 60%);
}

.selectable_icon {
    position: relative;
    top: 8px;
    stroke: var(--main-font-color);
}
.selectable_icon:hover {
    stroke-width: 2.5px;
}

@media only screen and (max-width: 800px) {
    .loginForm {
        width: 60%;
    }
}
@media only screen and (max-width: 530px) {
    .loginForm {
        width: 100%;
        background: var(--color-primary);
    }

    input {
        background: var(--color-primary);
    }
}

#forgot_link {
    display: block;
    margin-top: -20px;
    width: 93%;
    text-align: right;
    font-weight: 100;
    font-size: 14px;
    color: var(--link-color);
}

.bottomLine-1 {
    border-bottom: 1px solid var(--main-font-color);
    width: 80%;
    position: absolute;
    top: 197px;
    left: calc(50% - (80% / 2));
}

.bottomLine-2 {
    border-bottom: 1px solid var(--main-font-color);
    width: 80%;
    position: absolute;
    top: 305px;
    left: calc(50% - (80% / 2));
}

.errLine {
    border-bottom: 1px solid #f33;
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

/* closed eyes svg properties, needed to do this because there are subelements in the svg tag */
#g4763 {
    fill: none;
    stroke: var(--main-font-color);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

#g4763:hover {
    stroke-width: 2.5px;
}

#rect4765 {
    fill: var(--main-font-color);
    fill-opacity: 1;
    stroke: var(--main-font-color);
    stroke-width: 1.5;
    stroke-miterlimit: 4;
    stroke-dasharray: none;
    stroke-opacity: 0;
}
</style>
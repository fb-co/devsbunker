<template>
    <div class="signup">
        <NavBar></NavBar>

        <div class="signupForm" v-if="!submitted">
            <p v-if="!errMessage" class="cardTitle">Sign-up</p>
            <p v-if="errMessage" class="cardTitle err">{{ errMessage}}</p>

            <form name="signup" v-on:submit.prevent="submitForm">
                <svg id="userIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c4c4c4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
                <input @click="errMessage ? errMessage = '' : {}" class="form_field" type="text" id="username" name="username" v-model="username" autocapitalize="off" autocomplete="off" placeholder="Username" required>

                <div v-bind:class="{errLine: !/match/.test(errMessage) && errMessage}" class="bottomLine-1 form_field_line"></div>

                <svg id="emailIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F2F2F2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                </svg>

                <input @click="errMessage ? errMessage = '' : {}" class="form_field" type="email" id="email" name="email" v-model="email" autocapitalize="off" autocomplete="off" placeholder="Email" required>
                <div v-bind:class="{errLine: !/match/.test(errMessage) && errMessage}" class="bottomLine-2 form_field_line"></div>

                <svg id="passIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c4c4c4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>

                <input @click="errMessage ? errMessage = '' : {}" class="form_field" type="password" id="password" name="password" v-model="password" placeholder="Password" required>

                <div v-bind:class="{errLine: errMessage}" class="bottomLine-3 form_field_line"></div>

                <svg id="passIcon2" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c4c4c4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>

                <input @click="errMessage ? errMessage = '' : {}" class="form_field" type="password" id="confirm-password" name="password" v-model="confirmedPassword" placeholder="Confirm password" required>

                <div v-bind:class="{errLine: errMessage}" class="bottomLine-4 form_field_line"></div>

                <input type="submit" value="Sign-up">

            </form>

            <div class="otherOption">
                <p class="otherOption">Or sign-up with</p>

                <router-link to='/'>
                    <svg v-if="darkTheme" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="svg4073" width="48" height="48">
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

                    <svg v-if="!darkTheme" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="svg1175" width="43.438667" height="42.366489">
                        <metadata id="metadata1181">
                            <rdf:RDF>
                                <cc:Work rdf:about="">
                                    <dc:format>image/svg+xml</dc:format>
                                    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                                </cc:Work>
                            </rdf:RDF>
                        </metadata>
                        <defs id="defs1179" />
                        <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="640" inkscape:window-height="480" id="namedview1177" />
                        <inkscape:clipboard style="font-variant-east_asian:normal;opacity:1;vector-effect:none;fill:#1b1817;fill-opacity:1;stroke:none;stroke-width:1.3333333;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" min="116.15693,588.39967" max="159.5956,630.76616" />
                        <path inkscape:connector-curvature="0" id="path24" style="fill:#1b1817;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.33333325" d="M 21.717333,0 C 9.7239998,0 0,9.7239998 0,21.719999 c 0,9.596 6.2226665,17.736 14.853333,20.609333 1.086667,0.198667 1.482667,-0.472 1.482667,-1.048 0,-0.514666 -0.01867,-1.881333 -0.02933,-3.693333 -6.041333,1.312 -7.3159996,-2.912 -7.3159996,-2.912 -0.9879999,-2.508 -2.4119999,-3.176 -2.4119999,-3.176 -1.9719999,-1.348 0.1493333,-1.321333 0.1493333,-1.321333 2.18,0.154667 3.3266662,2.238667 3.3266662,2.238667 1.937334,3.318666 5.084,2.359999 6.321334,1.805333 0.197333,-1.404 0.757333,-2.361333 1.378666,-2.904 -4.822666,-0.548 -9.8933329,-2.412 -9.8933329,-10.734667 0,-2.370666 0.8466667,-4.309333 2.2359999,-5.827999 -0.2239999,-0.549334 -0.9693332,-2.757334 0.212,-5.7480002 0,0 1.824,-0.584 5.973333,2.2266662 1.732,-0.481333 3.590667,-0.722666 5.437333,-0.730666 1.844,0.008 3.702667,0.249333 5.437334,0.730666 4.146666,-2.8106662 5.966666,-2.2266662 5.966666,-2.2266662 1.185333,2.9906662 0.44,5.1986662 0.216,5.7480002 1.392,1.518666 2.233333,3.457333 2.233333,5.827999 0,8.344 -5.078666,10.18 -9.917333,10.717334 0.78,0.670666 1.474667,1.996 1.474667,4.022666 0,2.902667 -0.02667,5.245333 -0.02667,5.957333 0,0.581334 0.390667,1.257334 1.493334,1.045334 C 37.221332,39.447999 43.438666,31.313333 43.438666,21.719999 43.438666,9.7239998 33.713332,0 21.717333,0" />
                    </svg>
                </router-link>

            </div>
        </div>
        <Loading v-if="submitted" />
    </div>
</template>

<script>
import UserService from "../services/user.service";
import SharedMethods from "../utils/shared";
import GeneralProperties from "../mixins/general.mixin";
import EventBus from "../utils/EventBus";

import NavBar from "@/components/NavBar";
import Loading from "@/components/Loading";

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

        SharedMethods.loadPage();
    },

    mixins: [GeneralProperties],

    data() {
        return {
            username: "",
            email: "",
            password: "",
            confirmedPassword: "",
            errMessage: "",
            submitted: false,
        };
    },
    components: {
        NavBar,
        Loading,
    },
    methods: {
        async submitForm() {
            if (this.password != this.confirmedPassword) {
                this.errMessage = "Passwords don't match!";
            } else {
                // we validate even client-side (same thing as server-side)
                const valid = UserService.validateCreds(
                    this.username,
                    this.email,
                    this.password
                );
                if (valid) {
                    this.submitted = true;

                    const result = await UserService.signup(
                        this.username,
                        this.email,
                        this.password
                    );

                    if (/Unable/.test(result.message)) {
                        this.errMessage = "Credentials are already taken.";
                        setTimeout(() => {
                            this.submitted = false;
                        }, 1500);
                    } else if (/Invalid/.test(result.message)) {
                        // we are going to do this even here just to add another layer of security
                        this.errMessage = "Invalid credentials.";
                        setTimeout(() => {
                            this.submitted = false;
                        }, 1500);
                    } else {
                        this.errMessage = "";
                        localStorage.setItem("token", result.token);
                        EventBus.broadcastLoginState(true); // emitting the event that the user logged in
                        this.$router.push("/");
                    }
                } else {
                    this.errMessage = "Invalid credentials";
                }
            }
        },
    },
};
</script>

<style scoped>
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

.signupForm {
    padding: 20px;
    width: 450px;
    max-width: 800px;
    height: 810px;
    background-color: var(--secondary-color);
    border-radius: 10px;
    margin: 0;
    margin-bottom: 10px;
    position: absolute;
    top: 110px;
    left: 50%;
    -ms-transform: translate(-50%, 0%);
    transform: translate(-50%, 0%);
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
    color: var(--main-font-color);
}

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

.form_field {
    width: 75%;
    padding-top: 12px;
}
.form_field::-webkit-input-placeholder {
    opacity: 0.5;
}

.form_field:focus + .bottomLine-1 {
    height: 2px;
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
}
.form_field:focus + .bottomLine-2 {
    height: 2px;
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
}
.form_field:focus + .bottomLine-3 {
    height: 2px;
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
}
.form_field:focus + .bottomLine-4 {
    height: 2px;
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
}

input[type="submit"] {
    width: 93%;
    font-size: 1rem;
    font-weight: 900;
    text-align: center;
    color: #fff;
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

.bottomLine-1 {
    /*border-bottom: 1px solid var(--main-font-color);*/
    height: 1px;
    width: 80%;
    position: absolute;
    top: 197px;
    left: calc(50% - (80% / 2));
}

.bottomLine-2 {
    /*border-bottom: 1px solid var(--main-font-color);*/
    height: 1px;
    width: 80%;
    position: absolute;
    top: 305px;
    left: calc(50% - (80% / 2));
}

.bottomLine-3 {
    /*border-bottom: 1px solid var(--main-font-color);*/
    height: 1px;
    width: 80%;
    position: absolute;
    top: 415px;
    left: calc(50% - (80% / 2));
}

.bottomLine-4 {
    /*border-bottom: 1px solid var(--main-font-color);*/
    height: 1px;
    width: 80%;
    position: absolute;
    top: 525px;
    left: calc(50% - (80% / 2));
}

.errLine {
    border-bottom: 1px solid #f33;
}

#userIcon {
    position: absolute;
    left: 37px;
    top: 150px;
    stroke: var(--main-font-color);
}

#passIcon {
    position: absolute;
    left: 37px;
    top: 370px;
    stroke: var(--main-font-color);
}

#passIcon2 {
    position: absolute;
    left: 37px;
    top: 479px;
    stroke: var(--main-font-color);
}

#emailIcon {
    position: absolute;
    left: 37px;
    top: 259px;
    stroke: var(--main-font-color);
}

.otherOption {
    margin-bottom: 30px;
    font-weight: 100;
    color: var(--soft-text);
}

@media only screen and (max-width: 800px) {
    .signupForm {
        width: 60%;
    }
}
@media only screen and (max-height: 900px) {
    input {
        background: var(--main-color);
    }
}
@media only screen and (max-width: 530px) {
    .signupForm {
        top: 80px;
        width: 100%;
        background: var(--main-color);
    }

    input {
        background: var(--main-color);
    }
}
@media only screen and (max-width: 305px) {
    .cardTitle {
        font-size: 20px;
    }
    .signupForm {
        top: 80px;
    }
}

@media only screen and (max-width: 250px) {
    .cardTitle {
        font-size: 15px;
    }
    .signupForm {
        top: 80px;
    }
}
</style>
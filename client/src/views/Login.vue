<template>
    <div class="login">
        <NavBar headerText="Login"></NavBar>

        <img src="https://wweb.dev/resources/navigation-generator/logo-placeholder.png" alt="Logo" class="large_logo" />

        <div id="error">{{ errMessage }}</div>

        <div class="loginForm">
            <form name="login" v-on:submit.prevent="submitForm">

                <label class="textLabel" for="userID">Username or Email</label>
                <p class="required_symbol">*</p>
                <input id="userID" name="userID" v-model="userID" autocapitalize="off" required>

                <label class="textLabel" for="password">Password</label>
                <p class="required_symbol">*</p>
                <input type="password" id="password" name="password" v-model="password" required>

                <input type="submit" value="Login">
            </form>

        </div>

        <router-link class="bigRoute" to="/signup">Don't have an account? Create one here.</router-link>
    </div>
</template>


<script>
import UserService from "../services/user.service";
import SharedMethods from "../shared";

import NavBar from "@/components/NavBar";

export default {
    created() {
        SharedMethods.checkIfLoggedIn()
            .then(result => {
                if (result) {
                    this.$router.push("/profile");
                }
            })
            .catch(err => {
                console.error(err);
            });
    },
    data() {
        return {
            userID: "",
            password: "",
            errMessage: ""
        };
    },
    components: {
        NavBar
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
        }
    }
};
</script>

<style scoped>
.loginForm {
    padding: 20px;
    width: 60%;
    max-width: 800px;
    margin: auto;
}

input,
select,
textarea {
    width: 100%;
    padding: 12px;
    background-color: var(--main-color);
    border: 1px solid var(--main-font-color);
    color: var(--main-font-color);
    border-radius: 6px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 50px;
    height: 30px;
}

.textLabel {
    color: var(--main-font-color);
    float: left;
    font-weight: 400;
}

input[type="submit"] {
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
}

.bigRoute {
    color: var(--link-color);
    text-decoration: none;
}

.bigRoute:hover {
    text-decoration: underline;
}
</style>
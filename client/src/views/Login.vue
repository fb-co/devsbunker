<template>
    <div class="login">
        <h1 style="margin-top: 50px;">Login Page</h1>

        <div id="error"></div>

        <div class="loginForm">
            <form name="login" v-on:submit.prevent="login">

                <label class="textLabel" for="email">Email</label>
                <input type="email" id="email" name="email" v-model="email" required>

                <label class="textLabel" for="password">Password</label>
                <input type="password" id="password" name="password" v-model="password" required>

                <input type="submit" value="Login">

            </form>

        </div>

        <router-link class="bigRoute" to="/signup">Don't have an account? Sign-up here.</router-link>
    </div>
</template>


<script>
// reusable module to fetch credentials (login + signup)
import fetchAPI from "../../public/javascript/sendCredsToAPI";

export default {
    data() {
        return {
            email: "",
            password: ""
        };
    },

    methods: {
        login() {
            fetchAPI({
                email: this.email,
                password: this.password
            }).catch(err => console.error(err));
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
    width: 100px;
    margin-top: 10px;
    background-color: var(--main-color);
    border: 1px solid var(--vue-green);
    color: var(--vue-green);
    padding: 12px 20px;
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
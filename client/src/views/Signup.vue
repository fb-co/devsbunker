<template>
    <div class="signup">
        <NavBar headerText = "Sign-Up"></NavBar>

        <img src="https://wweb.dev/resources/navigation-generator/logo-placeholder.png" alt="Logo" class = "large_logo"/>

        <div id="error">{{ errMessage }}</div>

        <div class="signupForm">
            <form name="signup" v-on:submit.prevent="submitForm">

                <label class="textLabel" for="username">Username</label><p class = "required_symbol">*</p>
                <input type="text" id="username" name="username" v-model="username" autocapitalize="off" required>

                <label class="textLabel" for="email">Email</label><p class = "required_symbol">*</p>
                <input type="email" id="email" name="email" v-model="email" autocapitalize="off" required>

                <label class="textLabel" for="password">Password</label><p class = "required_symbol">*</p>
                <input type="password" id="password" name="password" v-model="password" required>

                <label class="textLabel" for="password">Confirm Password</label><p class = "required_symbol">*</p>
                <input type="password" id="password" name="password" v-model="password" required>

                <input type="submit" value="Sign-up">
            
                <router-link class="bigRoute" to="/signup">Already Have an Account? Login Here.</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import UserService from "../services/user.service";
import NavBar from "@/components/NavBar";

export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            errMessage: ""
        };
    },
    components: {
        NavBar
    },
    methods: {
        async submitForm() {
            // we validate even client-side (same thing as server-side)
            const valid = UserService.validateCreds(
                this.username,
                this.email,
                this.password
            );
            if (valid) {
                const result = await UserService.signup(
                    this.username,
                    this.email,
                    this.password
                );

                if (/Unable/.test(result.message)) {
                    this.errMessage = "Credentials are already taken.";
                } else if (/Invalid/.test(result.message)) {
                    // we are going to do this even here just to add another layer of security
                    this.errMessage =
                        "Invalid credentials. Please follow the rules.";
                } else {
                    this.errMessage = "";
                    localStorage.setItem("token", result.token);
                    // [!] redirect to profile [!]
                    alert("Successfully signed up!");
                }
            } else {
                this.errMessage = "Invalid credentials. Please follow the rules.";
            }
        }
    }
};
</script>

<style scoped>

.signupForm {
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
    font-weight: 400;
    float: left;
}

input[type="submit"] {
    width: 150px;
    font-size: 1.3rem;
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
    display: block;
}

.bigRoute:hover {
    text-decoration: underline;
}
</style>
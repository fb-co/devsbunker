<template>
    <div class="box">
        <h1>Reset Account Password</h1>
        <p>Enter your email address and an email will be sent to you</p>

        <div class="inputs">
            <p>Email address:</p>
            <SpicyInput>
                <input type="email" label="Email" placeholder="Email..." ref="email0" v-model="email0" />
            </SpicyInput>

            <p>Confirm email address:</p>
            <SpicyInput>
                <input type="email" label="Confirm email" placeholder="Confirm..." ref="email1" v-model="email1" />
            </SpicyInput>
        </div>

        <div class="button_container">
            <button class="button" @click.stop="resetPassword()">Reset</button>
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import SpicyInput from "@/components/global/SpicyInput.vue";
import GraphQLVerificationService from "@/services/graphql/gql.verification.service.js";

export default {
    data() {
        return {
            email0: null,
            email1: null,
        };
    },
    created() {
        SharedMethods.loadPage();
    },
    methods: {
        async resetPassword() {
            if (!this.email0 || !this.email1) {
                this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: "Please fill in the fields." });
            } else {
                if (this.email0 !== this.email1) {
                    this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: "Email addresses don't match!" });
                } else {
                    const res = await GraphQLVerificationService.askForPasswordReset(this.email0);

                    if (res.data.askForPasswordReset.success) {
                        this.$store.dispatch("alertUser", { msg: "An email has been sent to you", type: "success", title: "Success" });
                        setTimeout(() => {
                            this.$router.push({ name: "Home", params: { user_id: res.data.askForPasswordReset.userId, type: "reset_pwd" } });
                        }, 1000);
                    } else {
                        this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: res.data.askForPasswordReset.message });
                    }
                }
            }
        },
    },
    components: {
        SpicyInput,
    },
};
</script>

<style scoped>
.box {
    margin: 100px auto 50px auto;
    background-color: var(--secondary-color);
    border-radius: 10px;

    max-width: 700px;
    width: 95%;
    
    padding-top: 40px;
    padding-bottom: 40px;
    padding-left: 5px;
    padding-right: 5px;

    display: flex;
    flex-direction: column;
}

.box h1 {
    font-size: 25px;
    font-weight: 700;
    color: var(--main-font-color);
}

.box p {
    font-size: 18px;
    color: var(--soft-text);

    margin-top: 35px;
}

.inputs {
    width: 70%;
    margin: auto;
    margin-top: 50px;

    text-align: left;
}

.inputs p {
    margin-bottom: 10px;
    color: var(--main-font-color);
    font-weight: 100;
}
.button_container {
    display: flex;
    flex-direction: column;
    justify-content: bottom;
    margin-left: 10px;
    margin-top: 35px;
}
.button {
    background-color: var(--main-accent);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 125px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin: 0px auto 0px auto;
    cursor: pointer;
}
.button:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}
</style>

<template>
    <div class="wrapper">
        <div class="box">
            <h1>Reset password</h1>

            <div id="form" v-if="!sent">
                <div class="inputs">
                    <p>New password:</p>
                    <SpicyInput>
                        <input type="password" label="Password" placeholder="Password..." ref="pwd0" v-model="pwd0" />
                    </SpicyInput>

                    <p>Confirm new password:</p>
                    <SpicyInput>
                        <input type="password" label="Confirm password" placeholder="Confirm..." ref="pwd1" v-model="pwd1" />
                    </SpicyInput>
                </div>

                <div class="button_container">
                    <button class="button" @click.stop="resetPassword()">Reset</button>
                </div>
            </div>

            <div id="waiting" v-else>
                <p>We are trying to reset your password, wait patiently.</p>

                <div v-if="loading" class="loading">
                    <LoadingGif :show="true" />
                </div>

                <div v-if="success">
                    <h2>Done!</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import GraphQLService from "../services/graphql.service";
import LoadingGif from "../components/global/LoadingGif.vue";
import SpicyInput from "@/components/global/SpicyInput.vue";

export default {
    data() {
        return {
            success: false,
            loading: true,
            sent: false,
            pwd0: null,
            pwd1: null,
        };
    },
    created() {
        SharedMethods.loadPage();
    },
    methods: {
        async resetPassword() {
            if (this.$route.params.userId && this.$route.params.token) {
                if (!this.pwd0 || !this.pwd1) {
                    this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: "Please fill in the fields." });
                } else {
                    if (this.pwd0 !== this.pwd1) {
                        this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: "Passwords don't match!" });
                    } else {
                        if (this.pwd0.toString().trim() !== "" && this.pwd0.length > 8) {
                            const res = await GraphQLService.resetPassword(this.pwd0, this.$route.params.userId, this.$route.params.token);
                            console.log(res);

                            this.sent = true;

                            if (res.data.resetPassword.success) {
                                this.loading = false;
                                this.success = true;
                                this.$store.dispatch("alertUser", { msg: "Successfully reset password", type: "success", title: "Success" });
                                setTimeout(() => {
                                    this.$router.push("/login");
                                }, 2000);
                            } else {
                                this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: res.data.resetPassword.message });
                            }
                        } else {
                            this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: "Password must be longer than 8 characters" });
                        }
                    }
                }
            } else {
                this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: "'userId' and 'token' params are missing." });
            }
        },
    },
    components: {
        LoadingGif,
        SpicyInput,
    },
};
</script>

<style scoped>
.wrapper {
    width: 100%;
    padding-top: 75px;

    display: flex;
    align-items: center;
    justify-content: center;
}
.box {
    border-radius: 5px;
    border: 1px solid var(--soft-text);

    max-width: 700px;
    width: 100%;
    height: 400px;
}

.box h1 {
    font-size: 40px;
    margin-top: 50px;
}

.box p {
    font-size: 18px;
    color: var(--soft-text);

    margin-top: 35px;
}

.box h2 {
    color: var(--main-accent);
    font-size: 40px;
    margin-top: 60px;
}

.loading {
    margin-top: 50px;
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

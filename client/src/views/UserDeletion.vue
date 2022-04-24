<template>
    <div class="wrapper">
        <div class="box">
            <h1>Delete account</h1>

            <p>We are trying to delete your account, wait patiently.</p>

            <div v-if="loading" class="loading">
                <LoadingGif :show="true" />
            </div>

            <div v-if="success">
                <h2>Done!</h2>
            </div>

            <div v-if="!success && !loading" class="failure">
                <h3>{{ message }}</h3>

                <!--                 <div class="btn" v-if="/token/.test(message)">
                    <p>NEW TOKEN</p>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import GraphQLUserService from "@/services/graphql/gql.user.service.js";
import GraphQLVerificationService from "@/services/graphql/gql.verification.service.js";
import LoadingGif from "../components/global/LoadingGif.vue";

export default {
    data() {
        return {
            success: false,
            loading: true,
            message: null,
        };
    },
    async created() {
        if (this.$route.params.userId && this.$route.params.token) {
            const res = await GraphQLVerificationService.verifyUserDeletion(this.$route.params.userId, this.$route.params.token);

            this.loading = false;
            if (res && !res.errors) {
                if (res.data.verifyUserDeletion.success) {
                    this.success = true;

                    const deletion = await GraphQLUserService.deleteUserAccount(null, this.$store.getters.accessToken);

                    if (deletion.data.deleteAccount.success === true) {
                        this.$store.dispatch("alertUser", { msg: deletion.data.deleteAccount.message, type: "success", title: "Done" });
                        setTimeout(() => {
                            this.$router.push("/");
                            window.location.reload();
                        }, 1500);
                    } else {
                        this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: res.errors[0].message });
                    }
                } else {
                    this.message = res.data.verifyUserDeletion.message;
                }
            } else {
                this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: res.errors[0].message });
            }
        } else {
            this.$store.dispatch("alertUser", { title: "Error", type: "error", msg: "'userId' and 'token' params are missing." });
        }
    },
    components: {
        LoadingGif,
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

.failure {
    margin-top: 60px;
}
.failure h3 {
    color: var(--error-red);
    font-weight: 300;
    font-size: 20px;
}
.failure p {
    color: var(--main-font-color);
}

.failure .btn {
    width: 30%;
    height: 50px;
    margin: auto;
    margin-top: 30px;

    border-radius: 12px;
    border: 1px solid var(--main-accent);
    background-color: var(--main-accent);

    transition: 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
}

.failure .btn:hover {
    background-color: transparent;
}
.failure .btn:hover p {
    color: var(--main-accent);
}

.failure .btn p {
    font-weight: bold;
    margin: 0;
}
</style>

<template>
    <div class="profile">
        <h1>Profile</h1>
        <button class="btn" @click="logout">Logout</button>
    </div>
</template>

<script>
import UserService from "../services/user.service";
import EventBus from "../utils/EventBus";

export default {
    methods: {
        logout() {
            UserService.logout();
            EventBus.broadcastLoginState(false); // broadcasting that the user just logged out
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.profile {
    margin-top: 30px;
}
.btn {
    width: 150px;
    margin-top: 10px;
    font-size: 1.3rem;
    text-align: center;
    background-color: var(--main-color);
    border: 1px solid var(--error-red);
    border-radius: 6px;
    color: var(--error-red);
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
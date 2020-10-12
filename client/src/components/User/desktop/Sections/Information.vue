<template>
    <div class="general_container">
        <p class="label">General</p>
        <p v-if="userObject" class="desc">{{ userObject.desc }}</p> <!-- Conditionally render it or else you get errors in console as it tries to return the value before the promise is resolved (it will work fine tho) -->

        <div class="input_container">
            <div class="input_section">
                <p class="input_label">Name</p>
                <input class="info_input" placeholder="" :value="$store.getters.username">
            </div>
            <div class="input_section">
                <p class="input_label">Email</p>
                <input class="info_input" placeholder="" :value="userObject.email">
            </div>
        </div>
        <button class="save_button">Save</button>
    </div>
</template>

<script>
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            userObject: undefined
        }
    },
    created() {
        GraphQLService.fetchUserDetails(this.$store.getters.username, ["desc", "email"]).then((user) => { this.userObject = user.data.user; });
    }
}
</script>

<style scoped>
.general_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: inherit;
}
.label {
    font-size: 25px;
    font-weight: bold;
    margin: 20px auto 20px auto;
}
.desc {
    color: var(--soft-text);
    width: 300px;
    margin: 40px auto 0px auto;
}
.input_container {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
}
.input_section {
    margin: 40px;
}
.info_input {
    border: 1px solid var(--soft-text);
    padding: 5px 5px 5px 10px;
    border-radius: 3px;
}
.info_input:focus {
    outline: none;
    border: 1px solid var(--main-btn-color);
    box-shadow: 0px 4px 5px var(--main-btn-color);
}
.input_label {
    font-weight: bold;
    text-align: left;
    margin-bottom: 15px;
}
.save_button {
    background-color: var(--main-btn-color);
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
</style>
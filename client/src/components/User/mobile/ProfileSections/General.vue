<template>
    <div class="general_container">
        <ProfilePicture
            v-if="userObject"
            :username="userObject.username"
            :darkenOnHover="true"
            :forUpload="userObject.username === this.$store.getters.username"
            wrapperSize="200px"
            class="profile_pic"
        />

        <div class="fancy_line" />
        <div v-if="!editing">
            <p ref="static_description" class="desc_not_editing">{{ userObject.desc }}</p>

            <div class="other_cont_container">
                <div class="other_cont_item">
                    <p class="bold other_item_label">Email</p>
                    <p>{{ userObject.email }}</p>
                </div>
            </div>
            <button @click="editFields()" class="save_button">Edit</button>
        </div>
        <div v-else>
            <textarea maxlength="400" class="desc_editing" ref="edit_desc" :value="userObject.desc" placeholder="Description..." />
            <div class="other_cont_container">
                <div class="other_cont_item" :class="{ invalid: invalidEmail }">
                    <p class="bold other_item_label">Email</p>
                    <input class="cont_field" ref="edit_email" :value="emailInInput" placeholder="Email..." />
                </div>
            </div>
            <div class="field_edit_buttons_container">
                <button @click="cancelFields()" class="cancel_button">Cancel</button>
                <button @click="saveFields()" class="save_button">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/User/ProfilePicture.vue";
import GeneralProfile from "@/mixins/general_profile.js";

export default {
    data() {
        return {
            emailInInput: this.userObject.email,
        };
    },
    props: {
        userObject: Object,
    },
    mixins: [GeneralProfile],
    components: {
        ProfilePicture,
    },
};
</script>

<style scoped>
.fancy_line {
    width: 15%;
    height: 2.5px;
    margin: 30px auto 0px auto;
    background-color: var(--main-accent);
    border-radius: 10px;
}
.desc_not_editing {
    width: 50%;
    min-width: 300px;
    max-width: 350px;
    margin: 30px auto 0px auto;
    text-align: justify;
    color: var(--soft-text);
}
.desc_editing {
    width: 50%;
    min-width: 300px;
    max-width: 350px;
    height: 125px;
    max-height: 200px;
    min-height: 75px;
    margin: 30px auto 0px auto;
    padding: 10px;
    font-size: 15px;
    font-family: rubik;
}
.cont_field {
    padding: 7px;
    font-size: 15px;
    font-family: rubik;
}
.other_cont_container {
    display: flex;
    flex-direction: row;
    justify-content: left;
    width: 50%;
    min-width: 300px;
    max-width: 350px;
    margin: 50px auto 70px auto;
}
.other_cont_item {
    text-align: left;
}
.other_item_label {
    margin-bottom: 10px;
    color: var(--main-font-color);
    font-size: 18px;
}

.invalid p {
    color: var(--error-red);
}
.invalid input {
    border-bottom: 2px solid var(--error-red);
}

.field_edit_buttons_container button {
    margin-left: 10px;
    margin-right: 10px;
}

.save_button {
    background-color: var(--main-accent);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 125px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin: 0px auto 40px auto;
    cursor: pointer;
}
.save_button:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}

.cancel_button {
    background-color: var(--error-red);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 125px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin: 0px auto 40px auto;
    cursor: pointer;
}
.cancel_button:hover {
    box-shadow: 0px 4px 20px var(--error-red);
}
</style>

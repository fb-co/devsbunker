<template>
    <div class="general_container" v-if="userObject">
        <p class="label">General</p>

        <ProfilePicture
            v-if="userObject"
            :username="userObject.username"
            :darkenOnHover="true"
            :forUpload="userObject.username === this.$store.getters.username"
            wrapperSize="300px"
            class="profile_pic"
        />
        <!--<textarea @blur="closeDescEditing()" maxlength="400" class="edit_desc" ref="edit_desc" />-->
    </div>
</template>

<script>
//import GraphQLService from "@/services/graphql.service";
import ProfilePicture from "@/components/ProfilePicture.vue";

export default {
    data() {
        return {
            userObject: this.userData,
            isExternal: false,
            isEditingDesc: false,
            editsMade: false,
        };
    },
    props: {
        userData: Object,
    },
    mounted() {
        this.isExternal = (this.userObject.username || "") != this.$store.getters.username;
    },
    components: {
        ProfilePicture,
    },
    /*
    beforeRouteLeave(to, from, next) {
        
    },
    */
    methods: {
        
    },
};
</script>

<style scoped>
.general_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.label {
    font-size: 25px;
    font-weight: bold;
    margin: 20px auto 20px auto;
}
.desc_edit_icon {
    display: none;
    position: absolute;
    right: -25px;
    bottom: -15px;
}
.desc_container {
    position: relative;
    cursor: text;
    width: 450px;
    margin: 40px auto 0px auto;
}
.profile_pic_container {
    position: relative;
}
.profile_pic {
    cursor: pointer;
    margin: 35px auto 10px auto;
}
.edit_desc {
    display: none;
    resize: none;
    border: 1px solid var(--soft-text);
    border-radius: 4px;
    width: 100%;
    height: 150px;
    padding: 7px;
    font-size: 15px;
    font-family: rubik;
}
.edit_desc:focus {
    outline: none;
    border: 2px solid var(--main-accent);
}
.desc {
    height: 100%;
    display: block;
    color: var(--soft-text);
}

.desc_container:hover > .desc_edit_icon {
    display: inline-block;
}
.input_container {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
}
.input_section {
    margin: 40px auto 40px auto;
}
.info_input {
    border: 1px solid var(--soft-text);
    padding: 5px 5px 5px 10px;
    border-radius: 3px;
}
.info_input:focus {
    outline: none;
    border: 1px solid var(--main-accent);
    box-shadow: 0px 4px 5px var(--main-accent);
}
.input_label {
    font-weight: bold;
    text-align: left;
    margin-bottom: 15px;
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
</style>

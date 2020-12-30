<template>
    <WrapperDesktop>
        <div class='setting_item'>
            <p class="setting_label">Password</p>
            <span class="setting_item_spacer" />
            <div class='setting_container'>
                <p @click="pwdPopUp = !pwdPopUp" class="important-btn">Reset</p>
            </div>
            <div class="outside" v-if="pwdPopUp" @click.self="pwdPopUp = false">
                <div id="resetPwd">
                    <div class="fields">
                        <!-- i tried to use GeneralInput but v-model wasn't working + we should probably add a isPassword prop on the general input component-->
                        <input ref="newPwd" class="form_field" label="New Password" v-model="pwd1" type="password" placeholder="New Password"/>
                        <div class="space"></div>
                        <input ref="newPwd" class="form_field" label="Confirm Password" v-model="pwd2" type="password" placeholder="Confirm New Password"/>
                    </div>
                    <div class="space"></div>
                    <div class="btn-container">
                        <button class="important-submit" @click="resetPwd()">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </WrapperDesktop>
</template>
<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";
import GraphQLService from "@/services/graphql.service";


export default {
    data() {
        return {
            pwdPopUp: false,
            pwd1: "",
            pwd2: ""
        };
    },
    methods: {
        async resetPwd() {
            if (this.pwd1 == this.pwd2) {
                const pwd = this.pwd1;
                const response = await GraphQLService.updateUserDetails(this.$store.getters.accessToken, [{ field: "password", newValue: pwd }]);
                console.log(response);
                if (/Successfully/.test(response.data.updateUserDetails.message)) {
                    this.pwdPopUp = false;
                } else {
                    console.log("err");
                }
            } else {
                console.log("PASSWORDS DONT MATCH");
            }

        }
    },  
    components: {
        ...GlobalComponents,
    },
};
</script>
<style scoped>
/*

    NOTE:
    i should have used flexbox for the resetPwd element... phucc CSS man 

*/
.important-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
    height: 30px;
    margin-top: 20px;
    margin-left: 15%;
    color: var(--error-red);
    border-radius: 4px;
    border: 1px solid var(--error-red);
    cursor: pointer;
}

.outside {
    width: 100%;
    height: 100%;
    background-color: rgba(99, 99, 99, 0.5);
    position: absolute;
    top: 0;
    left: 0;
}

#resetPwd {
    max-width: 800px;
    max-height: 400px;
    width: 60%;
    height: 40%;
    background-color: var(--main-color);
    position: absolute;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;

    border-radius: 20px;
}

.fields {
    width: 70%;
    margin: auto;
    margin-top: 30px;
}

.space {
    height: 20px;
    width: 100%;
}

.btn-container {
    margin: auto;
}
.important-submit {
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

@keyframes form_field_animation {
    from {
        width: 80%;
        margin-left: 0%;
    }
    to {
        width: 85%;
        margin-left: -2%;
    }
}

.form_field {
    width: 75%;
    padding-top: 12px;
}
.form_field::-webkit-input-placeholder {
    opacity: 0.5;
}

.form_field:focus + .bottomLine-1 {
    height: 2px;
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
}
.form_field:focus + .bottomLine-2 {
    height: 2px;
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
}
.form_field:focus + .bottomLine-3 {
    height: 2px;
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
}
.form_field:focus + .bottomLine-4 {
    height: 2px;
    animation: form_field_animation 1s;
    width: 85%;
    margin-left: -2%;
}

</style>
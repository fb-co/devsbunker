<template>
    <WrapperDesktop>
        <div class="setting_item">
            <p class="setting_label">Password</p>
            <span class="setting_item_spacer" />
            <div class="setting_container">
                <p @click="pwdPopUp = !pwdPopUp" class="important-btn">Reset</p>
            </div>
            <div class="outside" v-if="pwdPopUp" @click.self="pwdPopUp = false">
                <div id="resetPwd">
                    <div class="general_input_container">
                        <p>New Password</p>
                        <input
                            @click.stop=""
                            ref="newPwd"
                            class="general_input"
                            label="New Password"
                            v-model="pwd1"
                            type="password"
                        />
                        <div class="form_line_container">
                            <div class="bottom_line"></div>
                        </div>
                        <div class="space"></div>
                        <p>Confirm New Password</p>
                        <input
                            @click.stop=""
                            ref="newPwd"
                            class="general_input"
                            label="Confirm Password"
                            v-model="pwd2"
                            type="password"
                        />
                        <div class="form_line_container">
                            <div class="bottom_line"></div>
                        </div>
                    </div>
                    <div class="space"></div>
                    <div class="btn-container">
                        <button class="important-submit" @click="resetPwd()">
                            Reset
                        </button>
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
                const response = await GraphQLService.updateUserDetails(
                    this.$store.getters.accessToken,
                    [{ field: "password", newValue: pwd }]
                );
                console.log(response);
                if (
                    /Successfully/.test(response.data.updateUserDetails.message)
                ) {
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
        ...GlobalComponents
    }
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
    cursor: pointer;
    margin: auto;
    margin-top: 20px;
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

.general_input_container {
    position: relative;
    width: var(--width);
    padding: 5px;
    width: 65%;
    margin: auto;
    margin-top: 60px;
}
.general_input_container > p {
    text-align: left;
    width: 100%;
    margin: 0px auto 10px auto;
    color: var(--soft-text);
    font-size: 14px;
}
.general_input_container input,
.general_textarea {
    width: 100%;
    border: none;
    padding: 3px;
    background-color: var(--main-color);
    margin: 0px auto 5px auto;
    font-family: rubik;
    color: var(--main-font-color);
    text-align: left;
    font-size: 15px;
}
.general_input_container input:focus,
.general_textarea:focus {
    outline: none;
}

.form_line_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 2px;
}
.form_line_container > div {
    width: 98%;
    height: 1px;
    background-image: linear-gradient(
        to right,
        var(--secondary-color) 0%,
        var(--main-font-color) 2%,
        var(--main-font-color) 98%,
        var(--secondary-color) 100%
    );
    opacity: 0.3;
}
.general_input_container input:focus + .form_line_container > div,
.general_textarea:focus + .form_line_container > div {
    animation: form_field_animation 1s;
    width: 100%;
    height: 1.5px;
}
</style>
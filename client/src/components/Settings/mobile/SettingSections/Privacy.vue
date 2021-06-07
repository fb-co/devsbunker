<template>
    <WrapperMobile>
        <div class="settings_item">
            <p class="label vertical_flex_center">Change Password</p>
            <div class="placeholder" />
            <p @click="openResetPwdModal()" class="reset_pwd horizontal_flex_center">Reset</p>
            <InputModal
                ref="resetPwd"
                :fields="[{
                    label: 'New Password',
                    type: 'pwd'
                }, {
                    label: 'Confirm New Password',
                    type: 'pwd'
                }]"
                title="Reset"
                @submitted="resetPwd($event[0], $event[1])"
            /> 
        </div>
    </WrapperMobile>
</template>

<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";
import GraphQLService from "@/services/graphql.service";
import InputModal from "@/components/global/InputModal.vue";

export default {
    components: {
        ...GlobalComponents,
        InputModal
    },
    methods: {
        async resetPwd(pwd, pwdConfirm) {
            if (pwd == pwdConfirm) {
                const response = await GraphQLService.updateUserDetails(
                    this.$store.getters.accessToken,
                    [{ field: "password", newValue: pwd }]
                );
                console.log(response);

                if (
                    /Successfully/.test(response.data.updateUserDetails.message)
                ) {
                    this.$refs.resetPwd.close();
                    this.$refs.success_popup.show();
                } else {
                    this.$refs.resetPwd.showError("Invalid credentials", true);
                }
            } else {
                this.$refs.resetPwd.showError("Passwords do not match");
            }
        },
        openResetPwdModal() {
            this.$refs.resetPwd.open();
        }
    }
};
</script>

<style scoped>
    .settings_item {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-left: 5px;
    }
    .label {
        text-align: left;
    }

    .reset_pwd {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 30px;
        border: 2px solid var(--error-red);
        border-radius: 5px;
        padding-right: 10px;
        padding-left: 10px;
        cursor: pointer;
        color: var(--error-red);
    }
    .reset_pwd:hover {
        background-color: var(--error-red);
        color: #fff;
    }
</style>
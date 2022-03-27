<template>
    <WrapperDesktop>
        <div class="setting_item">
            <p class="setting_label">Password</p>
            <span class="setting_item_spacer" />
            <div class="setting_container">
                <p @click="openResetPwdModal()" class="important-btn">Reset</p>
            </div>
            <InputModal
                ref="resetPwd"
                :fields="[
                    {
                        label: 'New Password',
                        type: 'pwd',
                    },
                    {
                        label: 'Confirm New Password',
                        type: 'pwd',
                    },
                ]"
                title="Reset"
                @submitted="resetPwd($event[0], $event[1])"
            />
        </div>
        <SuccessPopup ref="success_popup" message="Successfully Reset Password" />
    </WrapperDesktop>
</template>
<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";
import GraphQLUserService from "@/services/graphql/gql.user.service";
import InputModal from "@/components/global/InputModal.vue";
import SuccessPopup from "@/components/Popups/SuccessPopUp.vue";

export default {
    methods: {
        async resetPwd(pwd, pwdConfirm) {
            if (pwd == pwdConfirm) {
                const response = await GraphQLUserService.updateUserDetails(this.$store.getters.accessToken, [{ field: "password", newValue: pwd }]);

                if (/Successfully/.test(response.data.updateUserDetails.message)) {
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
        },
    },
    components: {
        ...GlobalComponents,
        InputModal,
        SuccessPopup,
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
</style>

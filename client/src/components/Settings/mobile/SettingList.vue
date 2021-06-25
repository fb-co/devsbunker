<template>
    <div class="settings_list_container">
        <div class="setting_section">
            <h4>Appearance</h4>
            <div class="setting_section_item_container">
                <p class="setting_label vertical_flex_center">Theme</p>
                <ThemeSwitcher width="25" height="25" class="vertical_flex_center" />
            </div>
            <div class="setting_section_item_container">
                <p class="setting_label vertical_flex_center">Project Cards</p>
                <Dropdown :label="feedTheme" fontSize="12px" height="40px" linkHeight="40px" @itemSelected="switchFeedTheme" class="feedThemeChanger">
                    <button>Simple</button>
                    <button>Descriptive</button>
                </Dropdown>
            </div>
        </div>
        <div class="setting_section" style="margin-bottom: 10px;">
            <h4>Privacy</h4>
            <div class="setting_section_item_container">
                <p class="setting_label vertical_flex_center">Change Password</p>
                <p @click="openResetPwdModal()" class="reset_pwd">Reset</p>
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
    </div>
</template>

<script>
import ThemeSwitcher from "@/components/global/ThemeSwitcher.vue";
import Dropdown from "@/components/global/Dropdown.vue";
import InputModal from "@/components/global/InputModal.vue";
import GraphQLService from "@/services/graphql.service";

export default {
    data() {
        return {
            feedTheme: localStorage.getItem("feedTheme") || "Simple"
        }
    },
    components: {
        ThemeSwitcher,
        Dropdown,
        InputModal
    },
    methods: {
        switchFeedTheme(value) {
            let current = localStorage.getItem("feedTheme");

            if (!current || current !== value) {
                localStorage.setItem("feedTheme", value);
            }
        },
        async resetPwd(pwd, pwdConfirm) {
            if (pwd == pwdConfirm) {
                const response = await GraphQLService.updateUserDetails(this.$store.getters.accessToken, [{ field: "password", newValue: pwd }]);

                if (/Successfully/.test(response.data.updateUserDetails.message)) {
                    this.$refs.resetPwd.close();
                    this.$store.dispatch("alertUser", { type: "success", title: "Success", msg: "Successfully Reset Password" });
                } else {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Failed to Reset Password" });
                    this.$refs.resetPwd.showError("Invalid credentials", true);
                }
            } else {
                this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Failed to Reset Password" });
                this.$refs.resetPwd.showError("Passwords do not match");
            }
        },
        openResetPwdModal() {
            this.$refs.resetPwd.open();
        },
    },
};
</script>

<style scoped>
.settings_list_container {
    width: 100%;
    background-color: var(--secondary-color);
    box-shadow: 0px 0px 10px var(--drop-shadow);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
}
.setting_section {
    padding: 20px;
    width: 100%;
}
.setting_section > h4 {
    font-size: 18px;
    text-align: left;
    padding-bottom: 10px;
}
.setting_section_item_container {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}
.setting_label {
    width: 60%;
    text-align: left;
    padding-left: 5px;
}

.feedThemeChanger {
    flex-grow: 1;
}
.reset_pwd {
    padding: 5px 15px 5px 15px;
    border: 2px solid var(--error-red);
    border-radius: 5px;
    cursor: pointer;
    color: var(--error-red);
    margin: 0 auto;
}
.reset_pwd:hover {
    background-color: var(--error-red);
    color: #fff;
}
</style>

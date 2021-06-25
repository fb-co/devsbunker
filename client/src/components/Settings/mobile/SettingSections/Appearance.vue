<template>
    <WrapperMobile>
        <!-- TODO: refactor this, adding settings is pretty hard -->
        <div id="section">
            <div class="setting_labels">
                <div class="setting_container">
                    <p class="setting_label">Theme</p>
                </div>
            </div>
            <div class="settings_cont">
                <div class="setting_container">
                    <ThemeSwitcher width="25" height="25" />
                </div>
            </div>
            <div class="spacer"></div>
            <div class="setting_labels">
                <div class="setting_container">
                    <p class="setting_label">Post feed theme</p>
                </div>
            </div>
            <div class="settings_cont">
                <div class="setting_container">
                    <Dropdown :label="feedTheme" fontSize="12px" linkHeight="40px" @itemSelected="switchFeedTheme">
                        <button>Simple</button>
                        <button>Descriptive</button>
                    </Dropdown>
                </div>
            </div>
        </div>
    </WrapperMobile>
</template>

<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";
import Dropdown from "@/components/global/Dropdown.vue";
import GeneralProperties from "@/mixins/general.mixin";

export default {
    components: {
        ...GlobalComponents,
        Dropdown,
    },
    mixins: [GeneralProperties],
    methods: {
        switchFeedTheme(value) {
            let current = localStorage.getItem("feedTheme");

            if (!current || current !== value) {
                localStorage.setItem("feedTheme", value);
            }
        },
    },
};
</script>

<style scoped>
/* tmp */
.spacer {
    height: 20px;
    width: 100%;
}
</style>

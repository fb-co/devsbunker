<template>
    <div id='section'>
        <div class='setting_labels'>
            <div class='setting_container'>
                <p class='setting_label'>Theme</p>
            </div>
        </div>
        <div class='settings_cont'>
            <div class='setting_container'>
                <Dropdown label="Light" spacing='10px' class='theme_dropdown setting_cont'>
                    <li>
                        <button>Dark</button>
                    </li> 
                    <li>
                        <button>Light</button>
                    </li>
                </Dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";

export default {
    components: {
        ...GlobalComponents
    }
}
</script>
<style scoped>
    @import '../stylesheets/settings.css'; /* Import the Settings Component Style-sheet */

    .theme_dropdown {
        width: 100px;
        height: 50px;
    }
    .theme_dropdown:hover {
        background-color: var(--secondary-color);
    }
</style>
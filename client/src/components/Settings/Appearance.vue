<template>
    <div id='section'>
        <div class='setting_labels'>
            <div class='horizontal_center'>
                <Dropdown label="Light" spacing='10px' class='theme_dropdown'>
                    <li>
                        <button>Dark</button>
                    </li> 
                    <li>
                        <button>Light</button>
                    </li>
                </Dropdown>
            </div>
        </div>
        <div class='setting_cont'>
            
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
    #section {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }
    .setting_labels {
        display: flex;
        flex-direction: column;
        width: 50%;
    }
    .setting_cont {
        width: 50%;
    }
    .settingItem {
        margin: 0 auto;
    }

    .theme_dropdown {
        margin: 20px;
        font-weight: bold;
        width: 100px;
        height: 50px;
    }
    .theme_dropdown:hover {
        background-color: var(--secondary-color);
    }
</style>
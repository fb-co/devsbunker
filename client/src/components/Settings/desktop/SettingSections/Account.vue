<template>
    <WrapperDesktop>
        <div id='section'>
            <div class='setting_labels'>
                <div class='setting_container'>
                    <p class='setting_label'>Account Visibility</p>
                </div>
            </div>
            <div class='setting_cont'>
                <div class='setting_container'>
                    <Dropdown spacing="5px" label="Temp Label">
                        <li>Hello</li>
                        <li>Bruh</li>
                    </Dropdown>
                </div>
            </div>
        </div>
    </WrapperDesktop>
</template>
<script>
import GlobalComponents from "@/components/global/GlobalComponents.js";

export default {
    components: {
        ...GlobalComponents,
    },
};
</script>

<style scoped>
</style>
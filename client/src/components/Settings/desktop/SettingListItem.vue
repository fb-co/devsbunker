<template>
    <li class="settings_list_item no_select" @click="navigateTo()">
        <div class="option_icon_container">
            <slot></slot>
        </div>

        <p class="option_text" :class="{active: isActive}">{{ label }}</p>
        <p class="option-arrow option_text" style="font-weight: bold;">></p>
    </li>
</template>

<script>
export default {
    props: ["label", "isActive"],

    methods: {
        navigateTo() {
            if (this.$route.params.section != this.label.toLowerCase())
                this.$router.push("/settings/" + this.label.toLowerCase());
        },
    },
};
</script>

<style scoped>
.settings_list_item {
    border-left: 2px solid transparent;
    width: 250px;
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    margin-bottom: 15px;
}
.settings_list_item:hover {
    border-left: 2px solid var(--accent);
    cursor: pointer;
}

.settings_list_item svg {
    margin-top: 3px;
    margin-left: 15px;
    margin-right: 15px;
}

.option_icon_container {
    padding-top: 10px;
    padding-bottom: 10px;
}

.option_text {
    margin-top: 3px;
    display: inline-block;
    line-height: 47px;
}
.option-arrow {
    flex-grow: 1;
    text-align: right;
    display: inline-block;
}

.active {
    font-weight: bold;
}
</style>
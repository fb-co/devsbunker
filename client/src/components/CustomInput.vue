<template>
    <!-- This Component will make an input with an icon in front of it, the SVG and input need to be inserted as content into the html tag -->

    <div class="main_input_container">
        <slot class="input_container">

        </slot>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main_input_container {
    display: flex;
    flex-direction: row;
    background-color: var(--secondary-color);
    border-radius: 5px;
}
.main_input_container svg {
    width: 20px;
    margin: -5px 10px -5px 10px;
}
.main_input_container input {
    border: none;
    flex-grow: 1;
    background-color: var(--secondary-color);
    color: #8d8d8d;
    border-radius: 5px;
    padding-right: 10px;
}
.main_input_container input:focus {
    outline: none;
    flex-grow: 1;
}
</style>
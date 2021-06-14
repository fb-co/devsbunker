<template>
    <div class="container">
        <input class="main_input" :placeholder="placeholder">
        <div class="input_line"></div>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: String
    }
}
</script>

<style scoped>
@keyframes line_animation {
    from {
        width: 90%;
    }
    to {
        width: 100%;
    }
}

.container {
    width: 100%;
    height: auto;
}
.main_input {
    border: none;
    background-color: transparent;
    color: var(--main-font-color);
    border-radius: 5px;
    padding-right: 10px;
    height: 30px;
    width: 100%;
    margin: 30px auto 0px auto;
    padding: 5px;
    font-family: rubik;
}
.input_line{
    width: 90%;
    height: 1px;
    background-image: linear-gradient( to right, transparent 0%, var(--secondary-color) 2%, var(--secondary-color) 98%, transparent 100% );
}
.main_input:focus {
    outline: none;
}
.main_input:focus ~ .input_line {
    animation: line_animation 1s;
    width: 100%;
    background-image: linear-gradient( to right, var(--secondary-color) 0%, var(--main-font-color) 2%, var(--main-font-color) 98%, var(--secondary-color) 100% );
}
</style>
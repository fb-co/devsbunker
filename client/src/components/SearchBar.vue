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
        width: 10%;
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
    color: #8d8d8d;
    border-radius: 5px;
    padding-right: 10px;
    height: 30px;
    width: 100%;
    margin: 30px auto 0px auto;
    padding: 5px;
    font-family: rubik;
}
.input_line{
    width: 100%;
    height: 0px;
    border-bottom: 1px solid var(--secondary-color);
}
.main_input:focus {
    outline: none;
}
.main_input:focus ~ .input_line {
    border-bottom: 1px solid black; /* Change this to color to var at some point */
    width: 100%;
}
</style>
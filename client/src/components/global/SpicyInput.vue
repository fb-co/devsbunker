<template>
    <div class="input_container">
        <slot>

        </slot>
        <div class="bottom_line_container">
            <div class="bottom_line" />
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
    @keyframes line_animation {
        from {
            width: 98%;
        }
        to {
            width: 100%;
        }
    }

    .input_container {
        width: 100%;
    }
    .input_container input {
        width: 98%;
        padding: 5px;
        border: none;
        background-color: transparent;
        color: var(--main-font-color);
    }
    .input_container input:focus {
        outline: none;
    }

    .bottom_line_container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .bottom_line { 
        width: 98%;
        height: 1px;
        opacity: 0.3;
        background-image: linear-gradient( to right, var(--secondary-color) 0%, var(--main-font-color) 2%, var(--main-font-color) 98%, var(--secondary-color) 100% );
    }
    .input_container input:focus + .bottom_line_container > div {
        animation: line_animation 1s;
        width: 100%;
        height: 1px;
        opacity: 0.7;
    }
</style>
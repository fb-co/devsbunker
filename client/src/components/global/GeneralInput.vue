<template>
    <div class="general_input_container" :style="cssProps">
        <p v-if="label!=''">{{ label }}</p>
        <input class="general_input"> <!-- use $refs to get this value to avoid conflictions --> 
        <div class="form_line_container">
            <div class="bottom_line"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: "100%"
        }
    },
    computed: {
        cssProps() {
            return {
                "--width": this.width,
            };
        },
    },
}
</script>

<style scoped>
    @keyframes form_field_animation {
        from {
            width: 89%;
        }
        to {
            width: 93%;
        }
    }

    .general_input_container {
        display: flex;
        flex-direction: column;
        width: var(--width);
        padding: 5px;
    }
    .general_input_container > p {
        text-align: left;
        width: 90%;
        margin: 0px auto 10px auto;
        color: var(--soft-text);
    }
    .general_input {
        width: 90%;
        border: none;
        padding: 3px;
        background-color: var(--main-color);
        margin: 0px auto 5px auto;
        font-family: rubik;
    }
    .general_input:focus {
        outline: none;
    }
    .form_line_container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }
    .form_line_container > div {
        width: 89%;
        height: 1px;
        background-image: linear-gradient( to right, var(--secondary-color) 0%, var(--main-font-color) 2%, var(--main-font-color) 98%, var(--secondary-color) 100% );
        opacity: 0.3;
    }
    .general_input:focus + .form_line_container > div {
        animation: form_field_animation 1s;
        width: 93%;
        height: 1.5px;
    }
</style>
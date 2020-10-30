<template>
    <div class="general_input_container" :style="cssProps">
        <p v-if="label!=''">{{ label }}</p>
        <input v-if="!isTextArea" ref="general_input">
        <div v-else ref="general_input" contenteditable="true" class="general_textarea"></div> <!-- Acts like a text area -->
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
        },
        isTextArea: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        cssProps() {
            return {
                "--width": this.width,
            };
        },
    },
    methods: {
        // this ternary operator is important because if the input is a textarea (div with contenteditable), it does not have the .value attribute
        getValue() {
            return this.isTextArea ? this.$refs.general_input.innerText : this.$refs.general_input.value;
        },
        clearValue() {
            this.$refs.general_input.value = "";
        }
    }
}
</script>

<style scoped>
    @keyframes form_field_animation {
        from {
            width: 98%;
        }
        to {
            width: 100%;
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
        width: 100%;
        margin: 0px auto 10px auto;
        color: var(--soft-text);
        font-size: 14px;
    }
    .general_input_container input, .general_textarea {
        width: 100%;
        border: none;
        padding: 3px;
        background-color: var(--main-color);
        margin: 0px auto 5px auto; 
        font-family: rubik;
        color: var(--main-font-color);
        text-align: left;
        font-size: 15px;
    }
    .general_input_container input:focus, .general_textarea:focus {
        outline: none;
    }

    .form_line_container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 2px;
    }
    .form_line_container > div {
        width: 98%;
        height: 1px;
        background-image: linear-gradient( to right, var(--secondary-color) 0%, var(--main-font-color) 2%, var(--main-font-color) 98%, var(--secondary-color) 100% );
        opacity: 0.3;
    }
    .general_input_container input:focus + .form_line_container > div, .general_textarea:focus + .form_line_container > div {
        animation: form_field_animation 1s;
        width: 100%;
        height: 1.5px;
    }
</style>
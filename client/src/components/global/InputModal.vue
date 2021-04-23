<template>
    <div v-if="isOpen" class="model_overlay" @mousedown="close()">
        <div class="model_popup" @click.stop="" @mousedown.stop="">
            <div class="close_button">
                <div style="width: 33.33%"></div>
                <p v-if="title" class="main_title vertical_flex_center">{{ title }}</p>
                <div style="width: 33.33%">
                    <svg
                        @click="close()"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-x"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="var(--main-font-color)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
            </div>
            <div class="fields_container">
                <SpicyInput v-for="(input, index) in fields" :key="index" class="input_field">
                    <input :type="input.type == 'pwd' ? 'password' : 'text'" :label="input.label" placeholder="Confirm Password" ref="main_input" v-model="inputFields[index]" />
                </SpicyInput>
            </div>
            <div class="button_container">
                <button @click="clicked()" class="submit">
                    {{ btnText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import SpicyInput from "@/components/global/SpicyInput.vue";

export default {
    data() {
        return {
            inputFields: [],
            isOpen: false,
        };
    },
    props: {
        title: String,
        btnText: {
            type: String,
            default: "Submit",
        },
        fields: {
            type: Array,
            default: () => [
                {
                    label: "Input Field",
                    type: "pwd",
                },
            ],
        },
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.clearInputs();
            this.isOpen = false;
        },
        clicked() {
            this.$emit("submitted", this.inputFields);
            this.clearInputs();
        },
        clearInputs() {
            this.inputFields = [];
        },
    },
    components: {
        SpicyInput,
    },
};
</script>

<style scoped>
.model_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 12;
    background-color: rgba(0, 0, 0, 0.5);
}
.model_popup {
    position: fixed;
    top: 50%;
    left: 50%;
    max-width: 400px;
    width: 60%;
    background-color: var(--secondary-color);
    transform: translate(-50%, -50%);
    border-radius: 10px;
}
.close_button {
    display: flex;
    flex-direction: row;
    text-align: right;
    width: 100%;
    margin-bottom: 20px;
}
.close_button svg {
    margin: 10px;
}
.close_button svg:hover {
    background-color: var(--error-red);
}
.fields_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
}
.input_field {
    width: 200px;
    margin: 0 auto;
}
.main_title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    flex-grow: 1;
}

.submit {
    background-color: var(--error-red);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 125px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    margin: auto;
    margin-top: 20px;
}
.button_container {
    margin-bottom: 20px;
}
</style>

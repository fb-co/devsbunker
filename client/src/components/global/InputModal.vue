<template>
    <div id="modal" v-if="display">
        <div class="close_btn">
            <svg
                @click="close()"
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </div>
        <div id="fields">
            <div
                class="general_input_container"
                v-for="(input, index) in fields"
                :key="index"
            >
                <p>{{ input.replace(/#pwd#/g, "") }}</p>
                <input
                    @click.stop=""
                    :ref="input.toLowerCase().replace(/\s+/g, '')"
                    class="general_input"
                    label="input.toLowerCase()"
                    v-model="inputFields[index]"
                    :type="/<#pwd#>/.test(input) ? 'password' : 'text'"
                />
                <div class="form_line_container">
                    <div class="bottom_line"></div>
                </div>
            </div>
            <div class="space"></div>
            <div class="btn-container">
                <button class="important-submit" @click="clicked()">
                    {{ btnText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputFields: [],
            display: false,
        };
    },
    props: {
        btnText: {
            type: String,
            default: "Submit",
        },
        fields: {
            type: Array,
            default: () => ["Input field"],
        },
    },
    created() {
        // we could remove this
        if (this.fields.length > 3) {
            console.error("Max amount of fields is 3");
            this.display = false;
        } else {
            this.display = true;
        }
    },
    methods: {
        close() {
            this.$emit("closed", true);
        },
        clicked() {
            this.$emit("clicked", this.inputFields);
            this.$emit("closed", true);
        },
    },
};
</script>

<style scoped>
#modal {
    max-width: 800px;
    max-height: 400px;
    width: 60%;
    height: 40%;
    background-color: var(--secondary-color);
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;

    border-radius: 20px;
}

.close_btn {
    width: 100%;
    text-align: right;
}
.close_btn svg {
    margin-right: 50px;
    margin-top: 20px;
    cursor: pointer;
}

#fields {
    display: flex;
    flex-direction: column;
    margin: auto;
}

.important-submit {
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
</style>

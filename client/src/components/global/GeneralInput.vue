<template>
    <div class="general_input_container" :style="cssProps">
        <p v-if="label != '' && !labelIsPlaceholder">{{ label + (showLength ? " (" + message.length + "/20,000)" : "") }}</p>

        <input
            @click.stop
            @input="queryData()"
            v-if="!isTextArea"
            ref="general_input"
            class="main_query_input"
            :placeholder="labelIsPlaceholder ? label : ''"
        />

        <textarea v-else @input="textarea_autoresize" ref="general_input" class="general_textarea" rows="1" v-model="message" />

        <!-- In order to animate the form line, the text area version needs to be in the container, so this should only be rendered if its an input -->
        <div class="form_line_container">
            <div class="bottom_line"></div>
        </div>

        <div class="main_query_results" ref="results">
            <div v-if="searchFor == 'users'">
                <p v-for="document in documents" :key="document.username" class="document_item">{{ document.username }}</p>
            </div>
            <div v-else>
                <p v-for="document in documents" :key="document.title" class="document_item">{{ document.title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import GraphQLUserService from "@/services/graphql/gql.user.service.js";
import GraphQLPostsService from "@/services/graphql/gql.posts.service.js";
import TextAreaAutoResize from "@/mixins/textarea_autoresize.js";

export default {
    data() {
        return {
            documents: [],
            selectedDocument: -1,
            queryThresh: 1000, // amount of time in between query queue times
            queryQueued: false, // flag to make sure queries are not spammed
            message: "",
            canClose: false, // Important because you need to make sure when you blur the input that the click binding on the options can be triggered
        };
    },
    mixins: [TextAreaAutoResize],
    props: {
        label: {
            type: String,
            default: "",
        },
        // will make the specificed label the inputs placehodler opposed to a label on top
        labelIsPlaceholder: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: "100%",
        },
        isTextArea: {
            type: Boolean,
            default: false,
        },
        searchFor: {
            type: String,
            default: "users",
        },
        isQuery: {
            type: Boolean,
            default: true,
        },
        showLength: {
            type: Boolean,
            default: false,
        },
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
            return this.$refs.general_input.value;
        },
        clearValue() {
            this.$refs.general_input.value = "";
        },

        focusInput() {
            this.$refs.general_input.focus();
        },

        queryData() {
            if (this.isQuery) {
                if (this.$refs.general_input.value != "" && this.$refs.general_input.value.length > 2) {
                    if (!this.queryQueued) {
                        this.queryQueued = true;

                        setTimeout(() => {
                            if (this.$refs.general_input.value != "") {
                                if (this.searchFor === "users") {
                                    GraphQLUserService.fetchUserByPartial(this.$refs.general_input.value).then((res) => {
                                        this.documents = res.data.partialUser;
                                    });
                                } else if (this.searchFor === "posts") {
                                    GraphQLPostsService.fetchPostByPartial(this.$refs.general_input.value).then((res) => {
                                        this.documents = res.data.partial_post;
                                    });
                                }
                            }
                            this.queryQueued = false;
                        }, this.queryThresh);
                    }
                } else {
                    this.documents = [];
                }
            }
        },
    },
};
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
    position: relative;
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

.general_input_container textarea,
.general_input_container input {
    width: 100%;
    border: none;
    background-color: inherit;
    margin: 0px auto 5px auto;
    font-family: rubik;
    color: var(--main-font-color);
    text-align: left;
    font-size: 15px;
    resize: none;
}

.general_input_container input:focus,
.general_textarea:focus {
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
    background-image: linear-gradient(to right, var(--secondary-color) 0%, var(--main-font-color) 2%, var(--main-font-color) 98%, var(--secondary-color) 100%);
    opacity: 0.3;
}
.general_input_container input:focus + .form_line_container > div {
    animation: form_field_animation 1s;
    width: 100%;
    height: 1.5px;
}
.general_textarea:focus + .form_line_container > div {
    animation: form_field_animation 1s;
    width: 100%;
    height: 1.5px;
}

.document_item {
    width: 100%;
    background-color: var(--main-color);
    color: var(--main-font-color);
    padding: 15px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
}
.document_item:hover {
    color: var(--soft-text);
}

.main_query_input:focus ~ .main_query_results {
    display: flex;
}

.main_query_results {
    position: absolute;
    z-index: 15;
    width: 100%;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    display: none;
    flex-direction: column;
}
</style>

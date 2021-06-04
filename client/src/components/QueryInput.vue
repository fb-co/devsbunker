<template>
    <!-- Parent needs to have a add_entry() function -->
    <div class="query_input_container" @keyup.stop="nextDocument"> <!-- Stop the event propogation for the keyup function -->
        <input @click.stop="" @input="queryData()" ref="input_ref" class="main_query_input" :placeholder="placeholder">
        <div class="main_query_results" ref="results">
            <div v-if="searchFor==='users'">
                <p @mousedown="addEntry(document.username)" v-for="(document, index) in documents" :key="document.username" class="document_item" :class="{ selected: isSelected(index) }">{{ document.username }}</p>
            </div>
            <div v-else>
                <p @mousedown="addEntry(document.name)" v-for="(document, index) in documents" :key="document.name" class="document_item" :style="'color: ' + document.color " :class="{ selected: isSelected(index) }">{{ document.name }}</p>
            </div>
            <!-- <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="100%" /> -->
        </div>
    </div>
</template>

<script>
import GraphQLService from '../services/graphql.service';
import Languages from '../templates/Languages.js';

export default {
    data() {
        return {
            documents: [],
            selectedDocument: 0,
            queryThresh: 1000, // amount of time in between query queue times
            queryQueued: false, // flag to make sure queries are not spammed

            canClose: false // Important because you need to make sure when you blur the input that the click binding on the options can be triggered
        }
    },
    props: {
        placeholder: {
            type: String,
            default: "Search..."
        },
        searchFor: {
            type: String,
            default: "users"
        }
    },
    mounted() {
        this.$refs.input_ref.focus();

        document.addEventListener("keyup", () => {
            this.nextDocument();
        });
    },
    destroyed() {
        document.removeEventListener("keyup", () => {
            this.nextDocument();
        });
    },
    methods: {
        getValue() {
            return this.$refs.input_ref.value;
        },
        clearValue() {
            this.$refs.input_ref.value = "";
        },

        queryData() {
            if (this.$refs.input_ref.value != "") {
                if (this.searchFor === "users") { // include all searches that require a request to the server in 'or' format at this if statement
                    if (!this.queryQueued) {
                        this.queryQueued = true;

                        setTimeout(() => {
                            if (this.$refs.input_ref.value != "") {
                                // use different queries to search for different items based on 'searchFor'
                                if (this.searchFor === "users") {
                                    GraphQLService.fetchUserByPartial(this.$refs.input_ref.value, "Most Popular", 0, -1, ["username"]).then((res) => {
                                        this.documents = res.data.partial_user.users;
                                    });
                                }
                            }
                            this.queryQueued = false;
                        }, this.queryThresh);
                    }
                } else if (this.searchFor === "languages") { 
                    this.documents = Languages.searchByPartial(this.$refs.input_ref.value);
                } 
            } else {
                this.documents = [];
            }
        },

        isSelected(index) {
            return index===this.selectedDocument;
        },

        nextDocument() {
            if (event.keyCode == 38) {
                this.selectedDocument--;
            } else if (event.keyCode == 40) {
                this.selectedDocument++;
            } else if (event.keyCode == 13) {
                // handle for pressing enter
                if (this.documents[this.selectedDocument] !== undefined) {
                    this.addEntry(this.documents[this.selectedDocument].username || this.documents[this.selectedDocument].name);
                } else {
                    if (this.searchFor === "links") {
                        this.addEntry(this.$refs.input_ref.value);
                    }
                }
            }

            // make sure the selected document is within the bounds of the results
            if (this.selectedDocument >= this.documents.length) {
                this.selectedDocument = 0;
            } else if (this.selectedDocument < 0) {
                this.selectedDocument = this.documents.length-1;
            }
        },

        addEntry(value) {
            if (value !== "") {
                this.$parent.add_entry(value);
                this.documents = [];
            }
        }, 
    }
}
</script>

<style scoped>
    
    .query_input_container{
        width: 175px;
        margin: 0 auto;
    }

    .main_query_input {
        width: 100%;
        border: 1px solid var(--soft-text);
        background-color: var(--secondary-color);
        padding: 5px;
        border-radius: 5px;
        margin-top: 15px;
        font-family: rubik;
        color: var(--main-font-color);
    }
    .main_query_input:focus {
        border: 1px solid var(--main-font-color);
        outline: none;
    }
    

    .main_query_input:focus + .main_query_results {
        display: flex;
    }

    .main_query_results {
        box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
        display: none;
        flex-direction: column;
        position: absolute;
        z-index: 15;
        width: 175px;
        background-color: var(--main-color);
    }

    .document_item {
        background-color: var(--main-color);
        color: var(--main-font-color);
        padding: 10px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align:top;
    }
    .document_item:hover {
        color: var(--soft-text);
    }
    .selected {
        background-color: var(--main-accent); 
        color: #fff !important;
        font-weight: bold;
        padding: 10px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
    }
    
</style>
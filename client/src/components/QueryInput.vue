<template>
    <div class="query_input_container"> 
        <input @input="queryData()" ref="input_ref" class="main_query_input" :placeholder="placeholder">
        <div class="main_query_results">
            <p @click="addUser(document.username)" v-for="document in documents" :key="document.username" class="document_item">{{ document.username }}</p>

            <!-- <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="100%" /> -->
        </div>
    </div>
</template>

<script>
import GraphQLService from '../services/graphql.service';
export default {
    data() {
        return {
            documents: []
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
    methods: {
        getValue() {
            return this.$refs.input_ref.value;
        },
        clearValue() {
            this.$refs.input_ref.value = "";
        },

        // NEED TO OPTIMIZE HOW OFTEN IF QUERIES THE SERVER AS THE USER TYPES, RIGHT NOW EVERY KEY THEY PRESS QUERIES THE SERVER
        queryData() {
            if (this.$refs.input_ref.value != "" && this.$refs.input_ref.value != null && this.$refs.input_ref.value.length > 2) {
                if (this.searchFor === "users") {
                    GraphQLService.fetchUserByPartial(this.$refs.input_ref.value).then((res) => {
                        this.documents = res.data.partial_user;
                    });
                }
            } else {
                this.documents = [];
            }
        },

        addUser(value) {
            console.log(value);
            this.$parent.add_entry(value);
        }
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
    }

    .document_item {
        background-color: var(--main-color);
        color: var(--main-font-color);
        padding: 10px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
    }
    .document_item:hover {
        color: var(--soft-text);
    }
</style>
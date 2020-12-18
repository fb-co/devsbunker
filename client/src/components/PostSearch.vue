<!-- 
    IMPORTANT: THE PARENT COMPONENT NEEDS TO a updateSearchComponent() function that takes a parm of some posts and renders them as cards
               and you will need to render the component as you see fit in the parent. To conditionally render it based on whether the user
               is searching, use the isSearching() method on this component to return a boolean for that use.

               CONSIDER MOVING THAT FUNCTION TO A MIXIN
-->

<template>
    <div class="post_search_bar" :style="cssProps">
        <input @input="queryData()" ref="general_input" class="post_search_input" placeholder='search...'>

        <div class="form_line_container">
            <div class="bottom_line"></div>
        </div>
    </div>
</template>

<script>
import GraphQLService from '@/services/graphql.service';

export default {
    data() {
        return {
            documents: [],
            selectedDocument: -1,
            queryThresh: 1000, // amount of time in between query queue times
            queryQueued: false, // flag to make sure queries are not spammed

            //canClose: false // Important because you need to make sure when you blur the input that the click binding on the options can be triggered
        }
    },
    props: {
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
    methods: {
        queryData() {
            if (this.$refs.general_input.value != "" && this.$refs.general_input.value.length > 2) {
                if (!this.queryQueued) {
                    this.queryQueued = true;

                    setTimeout(() => {
                        if (this.$refs.general_input.value != "") {
                            GraphQLService.fetchPostsByPartial(this.$refs.general_input.value, this.$store.getters.accessToken).then((res) => {
                                this.documents = res.data.partial_post;
                                this.$parent.updateSearchComponent(this.documents);
                            });
                        }
                        this.queryQueued = false;
                    }, this.queryThresh);
                }
            } else {
                this.$parent.updateSearchComponent([], true); // update the parent component to go back to original feed
                this.documents = [];
            }
        },
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

    .post_search_bar {
        width: var(--width);
    }

    .post_search_input {
        width: 98%;
        border: none;
        padding: 3px;
        background-color: var(--main-color);
        margin: 0px auto 5px auto; 
        font-family: rubik;
        color: var(--main-font-color);
        text-align: left;
        font-size: 15px;
    }
    .post_search_input:focus {
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
    .post_search_bar input:focus + .form_line_container > div {
        animation: form_field_animation 1s;
        width: 100%;
        height: 1.5px;
    }
</style>
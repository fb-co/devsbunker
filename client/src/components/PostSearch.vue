<!-- 
    IMPORTANT: THE PARENT COMPONENT NEEDS TO have a updateSearchComponent() function that takes a parm of some posts and renders them as cards
               and you will need to render the component as you see fit in the parent. 

               Commonly they will be this (not 100% of the time):
               
               updateSearchComponent(documents, fetchedAllSearched, closeResults) {
                    this.fetchedAllSearchResults = fetchedAllSearched;
                    this.searchResults = documents;

                    if (closeResults) {
                        this.showSearchResults = false;
                    } else {
                        this.showSearchResults = true;
                    }
                }, 

                # this means that you will need to have a searchResults -> Array, and showSearchResults -> Bool, and conditionally render
                * between the posts on that page, and the posts from search results 

               CONSIDER MOVING THAT FUNCTION TO A MIXIN
-->

<template>
    <div class="post_search_bar" :style="cssProps">
        <div class="input_loading_cont">
            <SpicyInput class="post_search">
                <input @input="queryData()" class="main_input" ref="general_input" placeholder='search...'>
                <svg 
                    v-if="moreOptions"
                    @click.stop=""
                    @focus.stop="moreOptionsMenu = true"
                    @blur="moreOptionsMenu = false" 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="icon icon-tabler icon-tabler-dots-vertical" 
                    width="25" 
                    height="25" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="var(--main-font-color)" 
                    fill="none" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="19" r="1" />
                    <circle cx="12" cy="5" r="1" />
                </svg>
            </SpicyInput>
            
            <div>
                <div v-if="moreOptionsMenu" class="more_options">
                    <p class="list_title">Search By:</p>
                    <p class="more_option" @mousedown.stop="addToInput('tag:')">Tag</p>
                    <p class="more_option" @mousedown.stop="addToInput('author:')">Author</p>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
import GraphQLService from '@/services/graphql.service';
import SpicyInput from "@/components/global/SpicyInput.vue";

export default {
    data() {
        return {
            moreOptionsMenu: false,
            documents: [],
            fetchedAllResults: false,
            selectedDocument: -1,
            queryThresh: 1000, // amount of time in between query queue times
            queryQueued: false, // flag to make sure queries are not spammed
            userToFilter: this.userToFilterProp || this.$store.getters.username

            //canClose: false // Important because you need to make sure when you blur the input that the click binding on the options can be triggered
        }
    },
    props: {
        width: {
            type: String,
            default: "100%"
        },
        // its VERY important the filter is wired up to the root components filter so it will always be synced with the dropdown label, even if it seems simpler to get it from localStorage
        filter: {
            type: String,
            default: "none"
        },
        userToFilterProp: String,
        sortingType: {
            type: String,
            default: "Newest"
        },
        moreOptions: {
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
    components: {
        SpicyInput
    },
    methods: {
        queryData() {
            this.documents = [];
            if (this.$refs.general_input.value != "" && this.$refs.general_input.value.length > 2) {
                if (!this.queryQueued) {
                    this.queryQueued = true;
                    this.$emit("loading");
                    
                    setTimeout(() => {
                        if (this.$refs.general_input.value != "") {
                            GraphQLService.fetchPostsByPartial(
                                this.$refs.general_input.value, 
                                this.filter, 
                                this.userToFilter, 
                                this.sortingType, 
                                this.documents.length > 0 ? this.documents[this.documents.length-1].id : 0,  // last post id
                                this.documents.length > 0 ? this.documents[this.documents.length-1].likeAmt : -1, // last unique field (only for most popular queries)
                                this.$store.getters.accessToken
                            ).then((res) => {
                                this.fetchedAllResults = res.data.partial_post.fetchedAll;
                                this.documents = res.data.partial_post.posts;
                                this.$parent.updateSearchComponent(this.documents, this.fetchedAllResults);
                            });
                        }
                        this.queryQueued = false;
                        this.$emit("doneLoading");
                    }, this.queryThresh);
                }
            } else {
                this.$parent.updateSearchComponent([], true, true); // update the parent component to go back to original feed (find the function to understand parms)
                this.documents = [];
            }
        },

        // this will clear the documents and does not abide by the queryData cooldown
        updateFilter(filter) {
            this.documents = [];

            if (this.$refs.general_input.value != "" && this.$refs.general_input.value.length > 2) {
                GraphQLService.fetchPostsByPartial(
                    this.$refs.general_input.value, 
                    this.filter, 
                    this.userToFilter, 
                    filter, 
                    0,  // last post id
                    -1, // last unique field (only for most popular queries)
                    this.$store.getters.accessToken
                ).then((res) => {
                    this.fetchedAllResults = res.data.partial_post.fetchedAll;
                    this.documents = res.data.partial_post.posts;
                    this.$parent.updateSearchComponent(this.documents, this.fetchedAllResults);
                });
            }
        },
        loadMoreResults() {
            GraphQLService.fetchPostsByPartial(
                this.$refs.general_input.value, 
                this.filter, 
                this.userToFilter, 
                this.sortingType, 
                this.documents.length > 0 ? this.documents[this.documents.length-1].id : 0,  // last post id
                this.documents.length > 0 ? this.documents[this.documents.length-1].likeAmt : -1, // last unique field (only for most popular queries)
                this.$store.getters.accessToken
            ).then((res) => {
                console.log(res);
                this.fetchedAllResults = res.data.partial_post.fetchedAll;
                this.documents = this.documents.concat(res.data.partial_post.posts);
                this.$parent.updateSearchComponent(this.documents, this.fetchedAllResults);
            });
        },
        getSearchedPhrase() {
            return this.$refs.general_input.value;
        },
        addToInput(value) {
            this.$refs.general_input.value = value;
            setTimeout(() => {this.$refs.general_input.focus(); }, 100); // since the binding is on keydown you need to do this (I know its a little janky)
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
    .input_loading_cont {
        display: flex;
        flex-direction: row;
    }

    .post_search_bar {
        width: var(--width);
    }

    .loading_gif {
        display: inline-block;
        margin: 0 auto;
    }

    .list_title {
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 15px;
        color: var(--main-font-color);
    }
    .more_options {
        position: absolute;
        border-radius: 5px;
        width: 200px;
        background-color: var(--secondary-color);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }
    .more_option {
        margin-top: 15px;
        margin-bottom: 15px;
        cursor: pointer;
        color: var(--main-font-color);
    }
    .more_option:hover {
        color: var(--soft-text);
    }
    .main_input {
        font-size: 18px;
    }

</style>
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
                    ref="moreOptionsIcon"
                    @click.stop="openMoreMenu()"
                    @blur="moreOptionsMenu = false;"
                    tabindex="0"
                    xmlns="http://www.w3.org/2000/svg" 
                    class="icon icon-tabler icon-tabler-dots-vertical moreOptionsSelector" 
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
            
            <div v-if="!$store.getters.mobile" style="position: relative;">
                <div v-if="moreOptionsMenu" class="more_options">
                    <div class="more_opt_header">
                        <div class="mark_container">
                            <InformativePopup title="Search help">
                                <p>The tag option allows you to find posts which include one or more tags.</p>
                                <p style="margin-top: 15px; margin-bottom: 5px"><strong>Ex.</strong></p>
                                <p style="font-size: 18px;">tag: java, python</p>
                                <div class="line" style="width: 100%; margin-top: 20px; margin-bottom: 20px;" />
                                <p>The author option allows you to find posts created by a certain author.</p>
                                <p style="margin-top: 15px; margin-bottom: 5px"><strong>Ex.</strong></p>
                                <p style="font-size: 18px;">author: John</p>
                            </InformativePopup>
                        </div>
                        <p class="list_title vertical_flex_center">Search By:</p>
                        <div style="width: 40px;" />
                    </div>
                    <p class="more_option" @mousedown.stop="addToInput('tag:')">Tag</p>
                    <p class="more_option" @mousedown.stop="addToInput('author:')">Author</p>
                </div>
            </div>
            <div v-else>
                <div v-if="moreOptionsMenu" class="more_options_mobile">
                    <div class="more_opt_header" style="margin-top: 20px;">
                        <div class="mark_container vertical_flex_center" style="width: 60px;">
                            <InformativePopup title="Search help" style="margin: 0 auto;">
                                <p>The tag option allows you to find posts which include one or more tags.</p>
                                <p style="margin-top: 15px; margin-bottom: 5px"><strong>Ex.</strong></p>
                                <p style="font-size: 18px;">tag: java, python</p>
                                <div class="line" style="width: 100%; margin-top: 20px; margin-bottom: 20px;" />
                                <p>The author option allows you to find posts created by a certain author.</p>
                                <p style="margin-top: 15px; margin-bottom: 5px"><strong>Ex.</strong></p>
                                <p style="font-size: 18px;">author: John</p>
                            </InformativePopup>
                        </div>
                        <p class="list_title vertical_flex_center" style="color: var(--main-color)">Search By:</p>
                        <div style="width: 60px;" />
                    </div>
                    <p @mousedown.stop="addToInput('tag:')">Tag</p>
                    <p @mousedown.stop="addToInput('author:')">Author</p>
                </div>
                <div v-if="moreOptionsMenu" class="more_options_backdrop" @click.stop=""></div>
            </div>
        </div>      
    </div>
</template>

<script>
import GraphQLService from '@/services/graphql.service';
import SpicyInput from "@/components/global/SpicyInput.vue";
import InformativePopup from "@/components/Popups/InformativePopup.vue";
//import ScreenType from "@/utils/screenType.js";

export default {
    data() {
        return {
            moreOptionsMenu: false,
            documents: [],
            fetchedAllResults: false,
            selectedDocument: -1,
            queryThresh: 1000, // amount of time in between query queue times
            queryQueued: false, // flag to make sure queries are not spammed
            userToFilter: this.userToFilterProp || this.$store.getters.username,

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
        SpicyInput,
        InformativePopup
    },
    methods: {
        // needs to be a function because safari has tabindex disabled by default
        openMoreMenu() {
            this.moreOptionsMenu = true;
            this.$refs.moreOptionsIcon.focus();
        },
        queryData() {
            this.documents = [];
            if (this.$refs.general_input.value != "" && this.$refs.general_input.value.length > 2) {
                if (!this.queryQueued) {
                    this.queryQueued = true;
                    this.$emit("loading");
                    
                    setTimeout(() => {
                        if (this.$refs.general_input.value != "") {
                            const initialSearchPhrase = this.$refs.general_input.value;
                            GraphQLService.fetchPostsByPartial(
                                this.$refs.general_input.value, 
                                this.filter, 
                                this.userToFilter, 
                                this.sortingType, 
                                this.documents.length > 0 ? this.documents[this.documents.length-1].id : 0,  // last post id
                                this.documents.length > 0 ? this.documents[this.documents.length-1].likeAmt : -1, // last unique field (only for most popular queries)
                                this.$store.getters.accessToken
                            ).then((res) => {
                                this.$emit("highlightPhrases", initialSearchPhrase);

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
                const initialSearchPhrase = this.$refs.general_input.value;
                GraphQLService.fetchPostsByPartial(
                    this.$refs.general_input.value, 
                    this.filter, 
                    this.userToFilter, 
                    filter, 
                    0,  // last post id
                    -1, // last unique field (only for most popular queries)
                    this.$store.getters.accessToken
                ).then((res) => {
                    this.$emit("highlightPhrases", initialSearchPhrase);

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
    @keyframes moreOptionsSlider {
        from {
            bottom: -100%;
        }
        to {
            bottom: 0px;
        }
    }
    .input_loading_cont {
        display: flex;
        flex-direction: row;
    }

    .post_search_bar {
        width: var(--width);
    }

    .moreOptionsSelector:focus {
        outline: 1px solid var(--soft-text);
    }

    .loading_gif {
        display: inline-block;
        margin: 0 auto;
    }

    .list_title {
        font-weight: bold;
        color: var(--main-font-color);
        flex-grow: 1;
        text-align: center;
    }
    .mark_container {
        display: flex; 
        justify-content: center; 
        width: 40px; 
    }
    .more_options {
        position: absolute;
        border-radius: 5px;
        width: 200px;
        background-color: var(--secondary-color);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        z-index: 50;
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
    .more_opt_header {
        display: flex;
        margin-top: 10px;
    }
    .main_input {
        font-size: 18px;
    }

    .more_options_mobile {
        position: fixed;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--burger-menu-bg);
        bottom: 0px;
        right: 0px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding-bottom: 40px;
        z-index: 13;
        animation: moreOptionsSlider 0.4s;
    }
    .more_options_mobile > h4 {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .more_options_mobile > p {
        cursor: pointer;
        width: 100%;
        padding-top: 13px;
        padding-bottom: 13px;
        color: var(--main-color);
    }
    .more_options_backdrop {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: 9;
        background-color: rgba(0, 0, 0, 0.5);
    }

</style>
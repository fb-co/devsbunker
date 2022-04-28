<!-- 
    IMPORTANT: THE PARENT COMPONENT NEEDS TO a updateSearchComponent() function that takes a parm of some posts and renders them as cards
               and you will need to render the component as you see fit in the parent. 

               Commonly they will be this (not 100% of the time):
               
               updateSearchComponent(documents, closeResults) {
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
            <input @input="queryData()" ref="general_input" class="post_search_input" placeholder="search for people..." />

            <div class="loading_gif">
                <svg
                    v-if="queryQueued"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="margin: auto; background: none; display: block"
                    width="30px"
                    height="30px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <g transform="rotate(0 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.9166666666666666s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(30 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.8333333333333334s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(60 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                        </rect>
                    </g>
                    <g transform="rotate(90 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.6666666666666666s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(120 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.5833333333333334s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(150 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                        </rect>
                    </g>
                    <g transform="rotate(180 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.4166666666666667s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(210 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.3333333333333333s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(240 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                        </rect>
                    </g>
                    <g transform="rotate(270 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.16666666666666666s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(300 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.08333333333333333s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(330 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                        </rect>
                    </g>
                </svg>
            </div>
        </div>

        <div class="form_line_container">
            <div class="bottom_line"></div>
        </div>
    </div>
</template>

<script>
import GraphQLUserService from "@/services/graphql/gql.user.service.js";

export default {
    data() {
        return {
            documents: [],
            selectedDocument: -1,
            queryThresh: 1000, // amount of time in between query queue times
            queryQueued: false, // flag to make sure queries are not spammed

            sortingType: "Most Popular",
            fetchedAllResults: false,

            //canClose: false // Important because you need to make sure when you blur the input that the click binding on the options can be triggered
        };
    },
    props: {
        width: {
            type: String,
            default: "100%",
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
        queryData() {
            if (this.$refs.general_input.value != "" && this.$refs.general_input.value.length > 2) {
                if (!this.queryQueued) {
                    this.queryQueued = true;

                    setTimeout(() => {
                        if (this.$refs.general_input.value != "") {
                            GraphQLUserService.fetchUserByPartial(
                                this.$refs.general_input.value,
                                this.sortingType,
                                0,
                                -1,
                                ["id", "username", "desc", "followerAmt", "followingAmt", "isFollowing"], // requesting only these fields
                                this.$store.getters.accessToken
                            ).then((res) => {
                                this.documents = res.data.partialUser.users;
                                this.fetchedAllResults = res.data.partialUser.fetchedAll;
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
        loadMoreResults() {
            GraphQLUserService.fetchUserByPartial(
                this.$refs.general_input.value,
                this.sortingType,
                this.getLastUserId(),
                this.getLastUniqueField(),
                ["id", "username", "desc", "followerAmt", "followingAmt", "isFollowing"], // requesting only these fields
                this.$store.getters.accessToken
            ).then((res) => {
                this.fetchedAllResults = res.data.partialUser.fetchedAll;
                this.documents = this.documents.concat(res.data.partialUser.users);
                this.$parent.updateSearchComponent(this.documents);
            });
        },
        getLastUserId() {
            return this.documents.length > 0 ? this.documents[this.documents.length - 1].id : 0;
        },
        getLastUniqueField() {
            return this.documents.length > 0 ? this.documents[this.documents.length - 1].followerAmt : -1;
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
.input_loading_cont {
    display: flex;
    flex-direction: row;
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
    background-image: linear-gradient(to right, var(--secondary-color) 0%, var(--main-font-color) 2%, var(--main-font-color) 98%, var(--secondary-color) 100%);
    opacity: 0.3;
}
.post_search_bar input:focus + .form_line_container > div {
    animation: form_field_animation 1s;
    width: 100%;
    height: 1.5px;
}

.loading_gif {
    display: inline-block;
    margin: 0 auto;
}
</style>

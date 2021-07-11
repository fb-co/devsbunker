<template>
    <div
        :class="{ hide: deleted }"
        @click="
            $router.push({
                path: `/post/${projectData.id}`,
            })
        "
        id="card_container"
        class="main_container no_select"
        :style="style"
    >
        <div class="card_text_container">
            <div class="author_container">
                <router-link @click.native.stop :to="'user/' + projectData.author" class="author card_text highlightable">{{ projectData.author }}</router-link>
            </div>
            <p class="proj_name card_text highlightable">{{ projectData.title }}</p>

            <div style="position: relative;">
                <div class="desc_fade"></div>
                <p class="proj_desc card_text highlightable">{{ projectData.description }}</p>
            </div>
            <div style="flex-grow: 1"></div>
            <div class="likes_container">
                <!--Un-filled icon -->
                <div v-if="hasLikeBtn" @click.stop="likePost(projectData.id)" class="icon_container">
                    <div v-if="!projectData.isLiked">
                        <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-heart" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                            />
                        </svg>
                    </div>
                    <div v-else>
                        <svg
                            @click.stop="unlikePost(projectData.id)"
                            width="25"
                            height="25"
                            viewBox="0 0 16 16"
                            class="bi bi-heart-fill"
                            fill="#eb4034"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    </div>
                </div>
                <svg v-else width="23" height="23" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>

                <div class="vertical_flex_center">
                    <p class="likes card_text">{{ projectData.likeAmt }}</p>
                </div>

                <div class="save_post_container icon_container">
                    <svg
                        @click.stop="savePost(projectData.id)"
                        v-if="!projectData.isSaved"
                        width="20"
                        height="20"
                        stroke-width="0.7"
                        stroke="var(--ssoft-text)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark save_btn"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                        />
                    </svg>
                    <svg
                        @click.stop="unsavePost(projectData.id)"
                        v-else
                        width="18"
                        height="18"
                        stroke-width="0.7"
                        stroke="var(--ssoft-text)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark-fill save_btn"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z" />
                    </svg>
                </div>

                <div
                    class="vertical_flex_center more_options_button"
                    style="margin-left: 5px;"
                    tabindex="0"
                    @click.stop=""
                    @focus.stop="moreOptions = true"
                    @blur="moreOptions = false"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-dots-vertical"
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="var(--soft-text)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="19" r="1" />
                        <circle cx="12" cy="5" r="1" />
                    </svg>
                </div>
                <div style="position: relative;">
                    <!-- make a relative wrapper so absolute works better -->
                    <!--More Options -->
                    <div :class="{ darkThemeMore: darkTheme, lightThemeMore: !darkTheme }" class="more_options no_select" v-if="moreOptions">
                        <div class="op_wrapper" @mousedown.stop="sharePost()">
                            <div class="op_icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-share"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="var(--main-font-color)"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="6" r="3" />
                                    <circle cx="18" cy="18" r="3" />
                                    <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
                                    <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
                                </svg>
                            </div>
                            <div class="op_label_container">
                                <p class="op_label">Share</p>
                            </div>
                        </div>
                        <div class="op_wrapper" v-if="projectData.author === $store.getters.username" @mousedown.stop="deletePost()">
                            <div class="op_icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-trash"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="var(--main-font-color)"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <line x1="4" y1="7" x2="20" y2="7" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </div>
                            <div class="op_label_container">
                                <p class="op_label">Delete</p>
                            </div>
                        </div>
                        <div class="op_line"></div>
                    </div>
                </div>

                <div class="vertical_flex_center">
                    <p class="price_text" v-if="projectData.price != 0 && projectData.price != null">| ${{ projectData.price }}</p>
                </div>
                <div class="vertical_flex_center">
                    <p class="bunker_tag">{{ projectData.tags[0] }}</p>
                </div>
            </div>
        </div>
        <div class="card_img_container">
            <DynamicPicture :image_link="getThumbnail()" class="card_img" />
        </div>
    </div>
</template>

<script>
import ProjectCardUtils from "@/mixins/project_card.mixin.js";
import DynamicPicture from "@/components/DynamicPicture.vue";
import GraphQLService from "../../services/graphql.service";
import GeneralMixin from "../../mixins/general.mixin";

export default {
    props: {
        projectData: Object,
        hasLikeBtn: {
            type: Boolean,
            default: true,
        },
        width: {
            type: String,
            default: "100%",
        },
        highlight_phrase: String,
    },
    methods: {
        getThumbnail() {
            if (this.projectData.thumbnail) {
                return this.projectData.thumbnail;
            }
            return "../../../uploads/profile_pics/profilePlaceholder.png";
        },
        // highlights the given prop called "highlight_phrase" to any occurance under any html content with the class "highlightable"
        highlightPhrases() {
            if (this.highlight_phrase != null) {
                const elements = document.getElementsByClassName("highlightable");

                for (let i = 0; i < elements.length; i++) {
                    elements[i].innerHTML = elements[i].innerText.replace(new RegExp(this.highlight_phrase, "ig"), `<mark>${this.highlight_phrase}</mark>`);
                }
            } else {
                // remove all highlights if the highlight phrase is null
                const elements = document.getElementsByClassName("highlightable");

                for (let i = 0; i < elements.length; i++) {
                    elements[i].innerHTML = elements[i].innerText.replace(new RegExp("<mark>", "ig"), "");
                    elements[i].innerHTML = elements[i].innerText.replace(new RegExp("</mark>", "ig"), "");
                }
            }
        },
        sharePost() {
            console.log("post id:", this.projectData.id);
        },
        deletePost() {
            GraphQLService.deletePostbyId(this.projectData.id, this.$store.getters.accessToken).then((res) => {
                if (res.errors) {
                    console.error(res.errors);
                } else if (!res.data.deletePost.success) {
                    console.error(res.data.deletePost.message);
                } else {
                    this.moreOptions = !this.moreOptions;
                    this.deleted = true;
                }
            });
        },
    },
    mixins: [ProjectCardUtils, GeneralMixin],
    data() {
        return {
            moreOptions: false,
            deleted: false,
        };
    },
    mounted() {
        this.highlightPhrases();
    },
    computed: {
        style() {
            return "width: " + this.width;
        },
    },
    watch: {
        highlight_phrase: function() {
            this.highlightPhrases();
        },
    },
    components: {
        DynamicPicture,
    },
};
</script>

<style scoped>
#card_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    padding: 15px;
    background-color: var(--secondary-color);
    cursor: pointer;
    border: 2px solid transparent;
}
.main_container:hover {
    border: 2px solid var(--main-accent) !important;
}
.hide {
    display: none !important;
}
.likeAmt {
    margin-left: 10px;
    font-weight: bold;
}
.card_text_container {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    width: 6%;
    flex-grow: 1;
}
.author_container {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
.author {
    color: var(--soft-text);
    text-decoration: none;
}
.author:hover {
    text-decoration: underline;
}
.proj_name {
    font-weight: bold;
    font-size: 18px;
}
.proj_desc {
    margin-bottom: 10px;
    color: var(--soft-text);
    font-size: 11.5px;
    overflow: hidden;
    max-height: 100px;
}
.desc_fade {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 20%, var(--secondary-color) 90%);
}
.icon_container {
    display: flex;
}
.icon_container svg {
    height: 100%;
}
.likes_container {
    display: flex;
    flex-direction: row;
    margin-top: 7px;
}
.likes {
    color: var(--soft-text);
    font-size: 11px;
    margin-left: 10px;
}
.price_text {
    color: var(--soft-text);
    font-size: 11px;
    margin-left: 5px;
}
.bunker_tag {
    color: var(--soft-text);
    font-size: 11px;
    margin-left: 10px;
}
.card_text {
    text-align: left;
}
.card_text_container p:not(:first-child) {
    margin-top: 7px;
}
.card_img_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 35%;
    max-height: 250px;
    overflow: hidden;
}
.card_img {
    width: 100%;
    max-height: 100%;
    border-radius: 5px;
    object-fit: contain;
}

.save_post_container {
    padding-left: 10px;
}

@media only screen and (max-width: 300px) {
    .card_text_container {
        width: 100%;
    }
    .card_img_container {
        display: none;
    }
}

@media only screen and (min-width: 1200px) {
    .author {
        font-size: 18px;
    }
    .proj_name {
        font-size: 25px;
    }
    .proj_desc {
        font-size: 16px;
    }

    .likes,
    .price_text,
    .bunker_tag {
        font-size: 15px;
    }
}

.more_options {
    position: absolute;

    width: 150px;
    background-color: var(--main-color);

    border-radius: 5px;

    display: flex;
    flex-direction: column;
}

/*
.more_options_button {
    outline: none;
}
*/

.op_wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    padding: 15px;
}
.op_wrapper:hover + .op_label {
    color: var(--soft-text);
}

.op_icon {
    width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.op_icon > svg {
    margin: 0 auto;
}
.op_label {
    margin-top: 2px;
    display: flex;
    flex-grow: 1;
    justify-content: center;
}
.op_label_container {
    flex-grow: 1;
}
.op_label:hover {
    color: var(--soft-text);
}

/* This is for the more dropdown on different themes */
.darkThemeMore {
    box-shadow: 0 2px 4px 0 rgba(215, 280, 220, 0.2);
}
.lightThemeMore {
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
}

/* DOESNT WORK */
/* .op_line {
    width: 100%;
    height: 1px;
    background-color: var(--soft-text);
} */

.op_wrapper:hover {
    color: var(--main-font-color);
    transition: 0.5s;
}
</style>

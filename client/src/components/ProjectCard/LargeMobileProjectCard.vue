<template>
    <div v-if="!deleted" class="project_box" ref="image_div" @click="$router.push({ path: `/post/${projectData.id}` })" :class="{ default_image: isDefault }">
        <div @click.stop="" class="top_text_container" ref="icons">
            <!--Not filled icon -->
            <div class="icon_container">
                <svg
                    v-if="!projectData.isLiked"
                    @click.stop="likePost(projectData.id)"
                    width="35"
                    height="35"
                    viewBox="0 0 16 16"
                    class="bi bi-heart"
                    fill="#eb4034"
                    xmlns="http://www.w3.org/2000/svg"
                    style="margin-top: 3px"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                </svg>
                <svg
                    v-else
                    @click.stop="unlikePost(projectData.id)"
                    width="35"
                    height="35"
                    viewBox="0 0 16 16"
                    class="bi bi-heart-fill"
                    fill="#eb4034"
                    xmlns="http://www.w3.org/2000/svg"
                    style="margin-top: 3px"
                >
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
            </div>
            <div class="icon_container">
                <svg
                    @click.stop="savePost(projectData.id)"
                    v-if="!projectData.isSaved"
                    width="30"
                    height="30"
                    stroke-width="0.7"
                    stroke="var(--soft-text)"
                    viewBox="0 0 16 16"
                    class="bi bi-bookmark save_btn"
                    fill="#fff"
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
                    width="30"
                    height="30"
                    stroke-width="0.7"
                    stroke="var(--soft-text)"
                    viewBox="0 0 16 16"
                    class="bi bi-bookmark-fill save_btn"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z" />
                </svg>
            </div>
        </div>
        <div class="text_container">
            <div class="text">
                <p class="title highlightable">{{ projectData.title }}</p>
                <p class="author">By: {{ projectData.author }}</p>
                <div class="like_amount_container">
                    <div class="vertical_flex_center">
                        <svg
                            @click.stop="unlikePost(projectData.id)"
                            width="15"
                            height="15"
                            viewBox="0 0 16 16"
                            class="bi bi-heart-fill"
                            fill="#eb4034"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    </div>
                    <p>{{ projectData.likeAmt }}</p>
                </div>
            </div>
            <div class="placeholder" />
            <div class="more_options_container" @click.stop="openMoreOptions()" ref="moreOptionsIcon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-dots-vertical"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#fff"
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
        </div>
        <MobileMoreOptions ref="more_options_menu" @mousedown.stop="">
            <div @mousedown.stop="copyPostLink()">
                <div class="vertical_flex_center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-share"
                        width="25"
                        height="25"
                        style="margin-top: 1px;"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="var(--main-color)"
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
                <p>Share</p>
            </div>
            <div @click.stop="openDeleteConfirmation()">
                <div class="vertical_flex_center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-trash"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="var(--main-color)"
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
                <p>Delete Post</p>
            </div>
        </MobileMoreOptions>
        <ConfirmationPopup 
            ref="delete_confirmation" 
            msg="Are you sure you want to delete this post?" 
            @confirm="deletePost()"
        />
    </div>
</template>

<script>
import ProjectCardUtils from "@/mixins/project_card.mixin.js";
import GraphQLService from "../../services/graphql.service";
import MobileMoreOptions from "@/components/Popups/MobileMoreOptions.vue";
import ConfirmationPopup from "@/components/Popups/ConfirmationPopup.vue";

export default {
    data() {
        return {
            thumbnail_link: undefined,
            isDefault: false,
            deleted: false,
        };
    },
    mixins: [ProjectCardUtils],
    components: {
        MobileMoreOptions,
        ConfirmationPopup
    },
    props: {
        projectData: Object,
        highlight_phrase: String,
        search_phrase: String,
    },
    created() {
        if (this.projectData.thumbnail === "@/assets/project_img_placeholder.png") {
            this.isDefault = true;
        } else {
            this.thumbnail_link = `${process.env.VUE_APP_IMG_STATIC_ASSETS}${this.projectData.thumbnail}`;
        }
    },
    mounted() {
        if (!this.isDefault) {
            this.$refs.image_div.style.backgroundImage = `url('${this.thumbnail_link}')`;
        }
    },
    methods: {
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

        openMoreOptions() {
            this.$refs.more_options_menu.openMenu();
        },
        closeMoreOptions() {
            this.$refs.more_options_menu.closeMenu();
        },
        openDeleteConfirmation() {
            this.$refs.delete_confirmation.open();
        },

        deletePost() {
            this.closeMoreOptions();
            GraphQLService.deletePostbyId(this.projectData.id, this.$store.getters.accessToken).then((res) => {
                if (res.errors) {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Something went wrong deleting post" });
                } else if (!res.data.deletePost.success) {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Something went wrong deleting post" });
                } else {
                    this.deleted = true;
                    this.$store.dispatch("alertUser", { type: "success", title: "Success", msg: "Deleted post" });
                }
            });
        },
        copyPostLink() {
            this.closeMoreOptions();
            this.$store.dispatch("alertUser", { type: "success", title: "Copied link to clipboard" });
        }
    },
    watch: {
        projectData: function(newVal) {
            this.thumbnail_link = newVal.thumbnail || "@/assets/project_img_placeholder.png";
        },
        highlight_phrase: function() {
            this.highlightPhrases();
        },
    },
};
</script>

<style scoped>
@keyframes hover_animation {
    from {
        background-color: rgba(0, 0, 0, 0);
    }
    to {
        background-color: rgba(0, 0, 0, 0.3);
    }
}

.project_box {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 10px;
    flex: 1; /* Makes it stretch to fill container */
    box-shadow: 0px 0px 7px var(--drop-shadow);
    
    /*
    min-width: 250px;
    max-width: 300px;
    min-height: 250px;
    */
    min-width: 300px;
    min-height: 300px;

    background-size: cover;
    background-position: center;

}
.default_image {
    background-color: var(--accent);
}
.hover_overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0); 
    cursor: pointer;
}
.hover_overlay:hover {
    animation: hover_animation 0.4s;
    background-color: rgba(0, 0, 0, 0.3); 
}
.text_container:hover ~ .hover_overlay {
    animation: hover_animation 0.4s;
    background-color: rgba(0, 0, 0, 0.3); 
}
.top_text_container:hover ~ .hover_overlay {
    animation: hover_animation 0.4s;
    background-color: rgba(0, 0, 0, 0.3); 
}
.hover_overlay:hover ~ .top_text_container {
    display: flex;
}
.top_text_container {
    display: flex;
    position: absolute;
    top: 0px;
    z-index: 1;
    border-radius: 5px;
    margin: 5px;
    flex-direction: row;
    background-color: rgba(0, 0, 0, 0.8);
}
.icon_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
}
.text_container {
    /* position absolute so the overlay wont darken the text or icons */
    position: absolute;
    bottom: 0px;
    z-index: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 75px;
    background-color: rgba(0, 0, 0, 0.8);
}
.text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 80%;
}
.title {
    color: #fff;
    font-size: 17px;
    font-weight: bold;
    padding: 10px 8px 8px 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
.author {
    color: rgb(189, 189, 189);
    font-size: 13px;
    padding: 5px 8px 10px 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
.more_options_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid transparent;
    cursor: pointer;
}
.more_options_container:focus {
    border: 1px solid #fff;
}
.like_amount_container {
    display: flex;
    text-align: left;
}
.like_amount_container svg {
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 5px;
}
.like_amount_container p {
    font-size: 12px;
    color: rgb(189, 189, 189);
}
</style>

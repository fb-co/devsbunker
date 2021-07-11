<template>
    <div
        v-if="!deleted"
        class="main_container"
        :class="{ main_container_lock: /@\/assets/.test(projectData.thumbnail) }"
        @click="$router.push({ path: `/post/${projectData.id}` })"
    >
        <div class="top_container">
            <div class="icons_container">
                <div class="icon_box" style="margin-bottom: 10px;">
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
                <div class="icon_box">
                    <svg
                        @click.stop="savePost(projectData.id)"
                        v-if="!projectData.isSaved"
                        width="30"
                        height="30"
                        stroke-width="0.2"
                        stroke="var(--soft-text)"
                        fill="var(--main-font-color)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark save_btn"
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
                        stroke-width="0.2"
                        stroke="var(--soft-text)"
                        fill="var(--main-font-color)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark-fill save_btn"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z" />
                    </svg>
                </div>
                <div class="more_options_container" @click.stop="" @focus="openMoreOptions()" @blur="closeMoreOptions()" tabindex="0" ref="moreOptionsIcon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-dots"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="var(--main-font-color)"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="5" cy="12" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                    </svg>
                </div>
                <div v-if="moreOptions" class="more_options" :class="{ move_down_for_small_post: /@\/assets/.test(projectData.thumbnail) }">
                    <div class="option_container" @mousedown="copyPostLink()">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-share"
                            width="16"
                            height="16"
                            style="margin-top: 1px;"
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
                        <p>Share</p>
                    </div>
                    <div v-if="projectData.author === this.$store.getters.username" class="option_container" @mousedown.stop="openDeleteConfirmation()">
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
                        <p>Delete Post</p>
                    </div>
                </div>
            </div>
            <div class="main_text_container">
                <p class="title highlightable">{{ projectData.title }}</p>
                <p class="tag" :style="cssProps">{{ projectData.tags[0] }}</p>
                <div style="position: relative">
                    <div class="desc_fade"></div>
                    <pre class="preserveText"><p class="description">{{ projectData.description }}</p></pre>
                </div>
                <DynamicPicture v-if="!/@\/assets/.test(projectData.thumbnail)" class="thumbnail" :image_link="projectData.thumbnail" />
            </div>
        </div>
        <div class="seperator_line" />
        <div class="bottom_container">
            <div class="left">
                <ProfilePicture :username="projectData.author" wrapperSize="30px" class="author_pfp" />
                <p class="by">by:</p>
                <p class="author">{{ projectData.author }}</p>
            </div>
            <div class="right">
                <p class="like_amt">{{ projectData.likeAmt }}</p>
                <svg width="18" height="18" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
            </div>
        </div>
        <ConfirmationPopup ref="delete_confirmation" msg="Are you sure you want to delete this post?" @confirm="deletePost()" />
    </div>
</template>

<script>
import DynamicPicture from "@/components/DynamicPicture.vue";
import ProfilePicture from "@/components/User/ProfilePicture.vue";
import ProjectCardUtils from "@/mixins/project_card.mixin.js";
import Languages from "@/templates/Languages.js";
import ConfirmationPopup from "@/components/Popups/ConfirmationPopup.vue";
import GraphQLService from "../../services/graphql.service";

export default {
    data() {
        return {
            moreOptions: false,
            deleted: false,
        };
    },
    props: {
        projectData: Object,
        highlight_phrase: String,
        search_phrase: String,
    },
    mixins: [ProjectCardUtils],
    components: {
        DynamicPicture,
        ProfilePicture,
        ConfirmationPopup,
    },
    computed: {
        cssProps() {
            return {
                "--card-color": Languages.getColor(this.projectData.tags[0]) || "var(--main-font-color)",
            };
        },
    },
    methods: {
        openMoreOptions() {
            this.moreOptions = true;
            this.$refs.moreOptionsIcon.focus();
        },
        closeMoreOptions() {
            this.moreOptions = false;
        },
        copyPostLink() {
            // there's also a ClipBoard API but it doesnt work on firefox
            // ! NOTE: this still doesnt work

            const tmp = document.createElement("input");
            tmp.value = `${process.env.VUE_APP_MAIN_URL}/post/${this.projectData.id}`;

            tmp.select();
            tmp.setSelectionRange(0, 99999); // this junk is needed for mobile devices and I dont know why

            document.execCommand("copy");

            this.$store.dispatch("alertUser", { type: "success", title: "Copied link to clipboard" });
        },
        openDeleteConfirmation() {
            this.$refs.delete_confirmation.open();
        },
        deletePost() {
            GraphQLService.deletePostbyId(this.projectData.id, this.$store.getters.accessToken).then((res) => {
                if (res.errors) {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Something went wrong deleting post" });
                } else if (!res.data.deletePost.success) {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Something went wrong deleting post" });
                } else {
                    this.moreOptions = !this.moreOptions;
                    this.deleted = true;
                    this.$store.dispatch("alertUser", { type: "success", title: "Success", msg: "Deleted post" });
                }
            });
        },
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
.main_container {
    position: relative;

    padding-top: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 20px;
    width: 510px;

    /* version 1 */
    background-color: var(--detailed-projcard-bg);
    border: 1px solid var(--detailed-projcard-border);

    /* version 2 */
    /* background-color: var(--secondary-color); */
}

.main_container_lock {
    max-height: 463px;
}

.main_container:hover {
    border: 1px solid #545555;
}

.top_container {
    display: flex;
    flex-direction: row;
    padding: 10px;
}
.icons_container {
    width: 50px;
    height: 80px;
    display: flex;
    flex-direction: column;
}
.icon_box {
    width: 100%;
    cursor: pointer;
}
.main_text_container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 15px;
    width: 90%;
}
.title {
    font-weight: 800;
    /* padding: 5px 10px 5px 10px; */

    text-align: left;
    font-size: 32px;

    /* fix me */
    margin-top: -5.5px;
    margin-left: 10px;

    word-wrap: break-word;
}
.description {
    color: var(--soft-text);
    text-align: left;
    padding: 25px 10px 20px 10px;

    word-wrap: break-word;
}

.desc_fade {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 20%, var(--detailed-projcard-bg) 90%);
}
.preserveText {
    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */

    font-family: "Rubik";
}
.thumbnail {
    width: 380px;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
    margin: 10px;
}
.seperator_line {
    width: 90%;
    height: 2px;
    margin: auto;
    margin-top: 20px;
    /* background-color: #343536; */
}
.bottom_container {
    display: flex;
    flex-direction: row;
    width: 100%;

    margin-top: 10px;
}

.left {
    display: flex;
    flex-direction: row;
    width: 70%;
    height: 100%;
}

.right {
    width: 30%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
}

.like_amt {
    font-size: 20px;
    margin-right: 5px;
}

.author_pfp {
    margin: 10px 10px 10px 20px;
}
.author {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
}
.by {
    color: var(--soft-text);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 10px;
}

.tag {
    color: var(--card-color);
    text-align: left;
    font-weight: 700;
    font-size: 18px;

    margin-left: 10px;
    margin-top: 15px;
}
.more_options_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    cursor: pointer;

    margin-top: 20px;
}
.more_options_container:focus {
    border: 1px solid #fff;
}
.more_options {
    position: absolute;
    top: 30%;
    z-index: 50;
    background-color: var(--secondary-color);
    border-radius: 3px;
    padding: 5px 15px 5px 15px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--soft-text);
}

.move_down_for_small_post {
    top: 39%;
}
.option_container {
    display: flex;
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
}
.option_container svg {
    margin-right: 10px;
}
.option_container:hover > p {
    color: var(--soft-text);
}
</style>

<template>
    <div>
        <div class="main_container" v-if="projectData">
            <LeftContent class="left_content" />
            <div class="left_content_placeholder" />
            <div class="center_content">
                <div class="header_actions">
                    <div class="back_arrow_container" @click="back()">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-arrow-left"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            stroke-width="1.2"
                            stroke="var(--main-font-color)"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <line x1="5" y1="12" x2="11" y2="18" />
                            <line x1="5" y1="12" x2="11" y2="6" />
                        </svg>
                    </div>

                    <!-- Placeholder -->
                    <div style="flex-grow: 1"></div>

                    <div class="actions_container fix_random_highlights">
                        <div class="save_post_container">
                            <svg
                                @click="savePost(projectData.id)"
                                v-if="!projectData.isSaved"
                                width="35"
                                height="35"
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
                                @click="unsavePost(projectData.id)"
                                v-else
                                width="35"
                                height="35"
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
                        <svg
                            v-if="!projectData.isLiked"
                            @click="likePost(projectData.id)"
                            width="40"
                            height="40"
                            viewBox="0 0 16 16"
                            class="bi bi-heart"
                            fill="#eb4034"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                            />
                        </svg>
                        <svg 
                            v-else 
                            @click="unlikePost(projectData.id)" 
                            width="40" 
                            height="40" 
                            viewBox="0 0 16 16"
                            class="bi bi-heart-fill" 
                            fill="#eb4034" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    </div>
                </div>

                <p class="timestamp">{{ usableTimestamp }}</p>

                <div class="tags_container">
                    <CreateTag v-for="tag in projectData.tags" :key="tag" :label="tag" tagType="lang" />
                </div>

                <!--<h3 id="tags">{{ projectData.tags }}</h3>-->
                <h1 id="title">{{ projectData.title }}</h1>

                <div class="likeAmt_container">
                    <svg   
                            width="30" 
                            height="30" 
                            viewBox="0 0 16 16"
                            class="bi bi-heart-fill" 
                            fill="#eb4034" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    <p class="vertical_flex_center">{{ projectData.likeAmt }}</p>
                </div>

                <AuthorDisplay v-if="authorData" :username="projectData.author" :followerAmt="authorData.followerAmt" :isFollowing="authorData.isFollowing" @followAction="followAuthor" />

                <h2 v-if="projectData.collaborators.length > 0" style="margin-top: 10px; margin-bottom: 20px;">Other Contributers</h2>
                
                <div>
                    <!--<AuthorDisplay v-for="(contributer, index) in projectData.collaborators" :key="index" :username="contributer" :showFollowerAmt="false" :showFollowButton="false" /> -->
                    <SecondaryAuthorDisplay v-for="(contributer, index) in projectData.collaborators" :key="index" :username="contributer" />
                </div>
                <p id="description"><pre>{{ projectData.description }}</pre></p>
                
                <div v-if="projectData.links.length > 0">
                    <p class="links_label">Links</p>
                    <div class="links_container">
                        <Link v-for="(link, index) in projectData.links" :key="index" :link="link" :hoverEffect="true" class="desktop_link" />
                    </div>
                </div>

                <Carousel v-if="projectData.images.length > 0" class="main_carousel" :images="postImages" minWidth="100%" />

                <CommentSection 
                    @postComment="$parent.postComment"
                    @loadMoreComments="$parent.getMoreComments" 
                    :comments="projectData.comments"
                    :fetchedAllComments="projectData.fetchedAllComments" 
                />
            </div>
            <RightContent class="right_content" />
            <div class="right_content_placeholder" />
        </div>
    </div>
</template>

<script>
import CreateTag from "@/components/NewPost/CreateTag.vue";
import CommentSection from "@/components/Comments/CommentSection.vue";
import Carousel from "@/components/Carousel/Carousel.vue";
import Link from "./Link.vue";
import AuthorDisplay from "./AuthorDisplay.vue";
import SecondaryAuthorDisplay from "./SecondaryAuthorDisplay.vue";

import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";

import CommonUtils from "@/utils/common_utils.js";
import UserUtils from "@/mixins/user_card.mixin.js";
import ProjectCardUtils from "@/mixins/project_card.mixin.js";
import TimestampService from "@/services/timestamp.service.js";

export default {
    props: {
        projectData: Object,
        authorData: Object,
    },
    components: {
        RightContent,
        LeftContent,
        CreateTag,
        Carousel,
        CommentSection,
        Link,
        AuthorDisplay,
        SecondaryAuthorDisplay
    },
    data() {
        return {
            thumbnail: undefined,
            postImages: [],
            usableTimestamp: TimestampService.convertToDate(this.projectData.createdAt, true, false, true),
        };
    },
    created() {
        if (this.projectData.images.length > 0) {
            this.thumbnail = `${process.env.VUE_APP_IMG_STATIC_ASSETS}/${this.projectData.images[0].dbname}`;

            // avoiding to push the thumbnail
            for (let i = 0; i < this.projectData.images.length; i++) {
                if (this.projectData.images[i].dbname) {
                    this.postImages.push(
                        `${process.env.VUE_APP_IMG_STATIC_ASSETS}/${this.projectData.images[i].dbname}`
                    );
                }
            }
        }

        // make sure you are not one of the collaborators
        for (let i = 0; i < this.projectData.collaborators.length; i++) {
            if (this.projectData.collaborators[i] == this.$store.getters.username) {
                this.projectData.collaborators.splice(i, 1);
                break;
            }
        }
    },
    mixins: [UserUtils, ProjectCardUtils],
    methods: {
        back() {
            this.$router.go(-1);
        },
        renderUsername(username, maxLen) {
            return CommonUtils.renderUsername(username, maxLen);
        },
        followAuthor() {
            if (this.$store.getters.accessToken) {
                if (!this.authorData.isFollowing) {
                    this.followUser(this.projectData.author);
                } else {
                    this.unfollowUser(this.projectData.author);
                }
            } else {
                this.$router.push("/login");
                this.$store.dispatch("alertUser", { type: "error", msg: "Login to follow people" });
            }
        }
    }
};
</script>

<style scoped>
.main_container {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
}

.center_content {
    width: 55%;
    margin: auto;
    -ms-overflow-style: none; /* IE and Edge (scrollbar hide)*/
    scrollbar-width: none; /* Firefox (scrollbar hide)*/

    display: flex;
    flex-direction: column;
    flex-grow: 1;

    text-align: left;
    margin-top: 42px;
}
.left_content {
    position: fixed;
    width: 20%;
    min-width: 150px;
    max-width: 250px;
}
.right_content {
    position: fixed;
    right: 0px;
    min-width: 150px;
    max-width: 250px;
    width: 20%;
}

.left_content_placeholder {
    width: 20%;
    min-width: 150px;
    max-width: 250px;
}
.right_content_placeholder {
    min-width: 150px;
    max-width: 250px;
    width: 20%;
}

.header_actions {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
    padding-right: 10px;
    max-width: 1200px;
}
.post_header_details {
    display: flex;
    flex-direction: column;
    text-align: left;
    color: #fff;
}

.save_post_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
}
.back_arrow_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: var(--secondary-color);
    box-shadow: 0px 0px 1px var(--drop-shadow);
    cursor: pointer;
}
.back_arrow_container:hover {
    box-shadow: 0px 0px 5px var(--drop-shadow);
}
.back_arrow_container > svg {
    margin: 0 auto;
}
.actions_container {
    display: flex;
    flex-direction: row;
    padding: 15px;
    border-radius: 10px;
    background-color: var(--secondary-color);
    box-shadow: 0px 0px 5px var(--drop-shadow);
}

#title {
    font-size: 45px;
    font-weight: 700;
    word-wrap: break-word;
}

.likeAmt_container {
    margin-top: 15px;
    display: flex;
}
.likeAmt_container p {
    padding-left: 15px;
}

#author span {
    font-weight: 100;
    color: var(--soft-text);
    font-size: 20px;
}

#author {
    font-weight: 500;
    font-size: 20px;

    margin-bottom: 10px;

    overflow: hidden;
    text-overflow: ellipsis;
}

.timestamp {
    margin-bottom: 20px;
    padding-left: 5px;
    color: var(--soft-text);
    font-size: 13px;
}

.tags_container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

#description {
    color: var(--soft-text);
    margin-top: 60px;
    text-align: justify;
    font-size: 23px;
    line-height: 30px;
}
#description pre {
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */

    font-family: "Rubik";
}
/* this is causing issues
#description::first-letter {
    color: var(--secondary-color);
    background-color: var(--main-font-color);
    border-radius: 2px;
    box-shadow: 3px 3px 0 var(--main-accent);
    font-size: 250%;
    padding: 6px 3px;
    margin-right: 6px;
    margin-right: 10px;
    float: left;
}
*/

.main_carousel {
    margin-left: 50%;
    transform: translateX(-50%);
}
.other_info_card {
    max-width: 500px;
    height: 100px;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: row;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid transparent;
    color: var(--main-font-color);
    text-decoration: none;
}
.other_info_card:hover {
    cursor: pointer;
    border: 1px solid var(--main-accent);
}
.author_info_card {
    max-width: 700px;
    height: 100px;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: row;
    padding: 20px;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid transparent;
    color: var(--main-font-color);
    text-decoration: none;
}
.author_info_card:hover {
    cursor: pointer;
    border: 1px solid var(--main-accent);
}
.author_info_text {
    flex-grow: 1;
    
    display: flex;
    flex-direction: column;
    margin-left: 25px;
}
.author_followerAmt {
    color: var(--soft-text);
}
.desktop_link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100px;
}
.links_container {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
.links_label {
    margin-top: 75px;
    text-align: center;
    font-size: 19px;
    color: var(--soft-text);
    font-weight: bold;
}
#thumbnail {
    width: 100%;
    height: 200px;

    margin-top: 70px;
}

#thumbnail img {
    width: 100%;
    height: 100%;
}
</style>

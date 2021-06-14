<template>
    <div>
        <div class="main_container" v-if="projectData">
            <LeftContent class="left_content" />
            <div class="left_content_placeholder" />
            <div class="center_content">
                <div class="tags_container">
                    <CreateTag v-for="tag in projectData.tags" :key="tag" :label="tag" tagType="lang" />
                </div>

                <!--<h3 id="tags">{{ projectData.tags }}</h3>-->
                <h1 id="title">{{ projectData.title }}</h1>

                <AuthorDisplay v-if="authorData" :username="projectData.author" :followerAmt="authorData.followerAmt" :isFollowing="authorData.isFollowing" @followAction="followAuthor" />

                <h2 v-if="projectData.collaborators.length > 0" style="margin-top: 10px; margin-bottom: 20px;">Contributers</h2>
                
                <div>
                    <AuthorDisplay v-for="(contributer, index) in projectData.collaborators" :key="index" :username="contributer" :showFollowerAmt="false" :showFollowButton="false" />
                </div>
                <p id="description"><pre>{{ projectData.description }}</pre></p>
                
                <p class="links_label">Links</p>
                <div class="links_container">
                    <Link v-for="(link, index) in projectData.links" :key="index" :link="link" class="desktop_link" />
                </div>

                <Carousel class="main_carousel" :images="postImages" minWidth="150%" />

                <CommentSection @postComment="$parent.postComment" :comments="projectData.comments" />
            </div>
            <!-- at the moment im passing an empty array, we should avoid re-fetching the notification object tho (maybe we can put it in the store) -->
            <RightContent class="right_content" :notifications="notifications" />
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

import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";

import CommonUtils from "@/utils/common_utils.js";
import UserUtils from "@/mixins/user_card.mixin.js";

export default {
    props: {
        projectData: Object,
        authorData: Object,
        notifications: Array,
    },
    components: {
        RightContent,
        LeftContent,
        CreateTag,
        Carousel,
        CommentSection,
        Link,
        AuthorDisplay,
    },
    data() {
        return {
            thumbnail: undefined,
            postImages: [],
        };
    },
    created() {
        this.thumbnail = `${process.env.VUE_APP_IMG_STATIC_ASSETS}/${this.projectData.images[0].dbname}`;

        // avoiding to push the thumbnail
        for (let i = 0; i < this.projectData.images.length; i++) {
            if (this.projectData.images[i].dbname) {
                this.postImages.push(
                    `${process.env.VUE_APP_IMG_STATIC_ASSETS}/${this.projectData.images[i].dbname}`
                );
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
    mixins: [UserUtils],
    methods: {
        renderUsername(username, maxLen) {
            return CommonUtils.renderUsername(username, maxLen);
        },
        followAuthor() {
            if (!this.authorData.isFollowing) {
                this.followUser(this.projectData.author);
            } else {
                this.unfollowUser(this.projectData.author);
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

#title {
    font-size: 45px;
    font-weight: 700;
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
    background-color: blue;
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
    background-color: green;
}
.author_followerAmt {
    color: var(--soft-text);
}
.follow_btn_container {
    background-color: red;
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

<template>
    <div>
        <div class="main_container" v-if="projectData">
            <LeftContent />
            <div class="center_content">
                <div class="tags_container">
                    <CreateTag v-for="tag in projectData.tags" :key="tag" :label="tag" tagType="lang" />
                </div>

                <!--<h3 id="tags">{{ projectData.tags }}</h3>-->
                <h1 id="title">{{ projectData.title }}</h1>

                <div class="author_info_card" v-if="authorData">
                    <ProfilePicture :username="projectData.author" wrapperSize="70px" />
                    <div class="author_info_text">
                        <h2 id="author">
                            {{ projectData.author }}
                            <span>{{ projectData.createdAt }}</span>
                        </h2>
                        <p class="author_followerAmt">
                            {{
                            authorData.followerAmt +
                            (authorData.followerAmt == 1
                            ? " follower"
                            : " follwers")
                            }}
                        </p>
                        <div style="flex-grow: 1"></div>
                        <!-- Placeholder -->
                        <div class="follow_btn_container">
                            <FollowButton :initialState="authorData.isFollowing" :username="projectData.author" v-if="projectData.author != this.$store.getters.username" />
                        </div>
                    </div>
                </div>

                <p id="description">
                    {{ projectData.description }}
                    <br />Et sed maxime maiores harum nulla et voluptatem expedita.
                    Laboriosam quia provident corporis cum doloremque esse non.
                    Facilis nisi omnis id voluptates natus. Eum distinctio
                    molestias sed aspernatur aut. Ea blanditiis ab aut quia hi
                </p>

                <Carousel class="main_carousel" :images="postImages" minWidth="150%" />

                <div class="comment_section" v-if="projectData.comments">
                    <p class="comments_title">{{ projectData.comments.length + (projectData.comments.length == 1 ? " Comment" : " Comments") }}</p>
                    <div v-if="$store.getters.accessToken">
                        <GeneralInput ref="comment_input" :labelIsPlaceholder="true" :isQuery="false" label="Leave a comment" width="100%" class="comment_field" />

                        <button @click="postComment()" class="leave_comment_button">Post</button>
                    </div>
                    <Comment v-for="(comment, index) in projectData.comments" :key="index" :commentData="comment" />
                </div>
                <div v-else>
                    <p class="comments_title">0 comments</p>

                    <GeneralInput ref="comment_input" :labelIsPlaceholder="true" :isQuery="false" label="Leave a comment" width="100%" class="comment_field" />

                    <button @click="postComment()" class="leave_comment_button">Post</button>
                </div>
            </div>
            <!-- at the moment im passing an empty array, we should avoid re-fetching the notification object tho (maybe we can put it in the store) -->
            <RightContent :notifications="notifications" />
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/ProfilePicture.vue";
import CreateTag from "@/components/NewPost/CreateTag.vue";
import Comment from "@/components/Comment.vue";
import FollowButton from "@/components/FollowButton.vue";
import Carousel from "@/components/Carousel.vue";
import GeneralInput from "@/components/global/GeneralInput.vue";

import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";

export default {
    props: {
        projectData: Object,
        authorData: Object,
        notifications: Array,
    },
    components: {
        RightContent,
        LeftContent,
        ProfilePicture,
        CreateTag,
        FollowButton,
        Carousel,
        Comment,
        GeneralInput
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
    },
    methods: {
        postComment() {
            const comment = this.$refs.comment_input.getValue();

            if (comment != "" && comment != null) { // the null check is done also server side
                this.$emit("postComment", comment);
                this.$refs.comment_input.clearValue();
            }
        }
    },
};
</script>

<style scoped>
.main_container {
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
}

.tags_container {
    display: flex;
    margin-bottom: 20px;
}

#description {
    color: var(--soft-text);
    margin-top: 60px;
    text-align: justify;
    font-size: 23px;
    line-height: 30px;
}

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

.main_carousel {
    margin-left: 50%;
    transform: translateX(-50%);
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
}
.author_info_text {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 25px;
    flex-grow: 1;
}
.author_followerAmt {
    color: var(--soft-text);
}
.follow_btn_container {
    text-align: right;
    width: 100%;

    margin-top: -35px;
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

.comment_section {
    width: 60%;
    min-width: 700px;
    margin: 75px auto 50px auto;
    /*
    margin-left: 50%;
    transform: translateX(-50%);
    */
}
.comments_title {
    font-size: 25px;
    color: var(--main-font-color);
    margin-bottom: 25px;
}
.comment_field {
    margin-bottom: 25px;
    max-width: 500px;
}

.leave_comment_button {
    background-color: var(--main-accent);
    border: none;
    outline: none;
    border-radius: 12px;
    width: 100px;
    height: 40px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 40px;
    margin-left: 5px;
    cursor: pointer;
}
.leave_comment_button:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}
</style>

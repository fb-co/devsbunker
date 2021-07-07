<template>
    <div :class="{ comment_section_desktop: !mobile, comment_section_mobile: mobile }" v-if="comments">
        <p class="comments_title">{{ commentAmt + (commentAmt == 1 ? " Comment" : " Comments") }}</p>
        <div v-if="$store.getters.accessToken">
            <GeneralInput ref="comment_input" :labelIsPlaceholder="true" :isQuery="false" label="Leave a comment" width="100%" class="comment_field" />
            <button v-if="!loadingNewComment" @click="postComment()" class="leave_comment_button">Post</button>
            <LoadingGif v-else :show="true" style="margin: 0;" />
        </div>
        <router-link to="/login" class="login_prompt" v-else>Login</router-link>
        <div style="margin-top: 20px;">
            <Comment v-for="(comment, index) in comments" :key="index" :commentData="comment" />
            <div v-if="!fetchedAllComments">
                <button v-if="!loading" @click="$emit('loadMoreComments')" class="load_more_comments">Show More Comments</button>
                <LoadingGif v-else :show="true" style="margin: 0;" />
            </div>
        </div>
    </div>
    <div v-else>
        <p class="comments_title">0 comments</p>
        <GeneralInput ref="comment_input" :labelIsPlaceholder="true" :isQuery="false" label="Leave a comment" width="100%" class="comment_field" />
        
        <button v-if="!loadingNewComment" @click="postComment()" class="leave_comment_button">Post</button>
        <LoadingGif v-else :show="true" style="margin: 0;" />
    </div>
</template>

<script>
import Comment from "@/components/Comments/Comment.vue";
import GeneralInput from "@/components/global/GeneralInput.vue";
import LoadingGif from "@/components/global/LoadingGif.vue";

export default {
    data() {
        return {
            loadingNewComment: false,
            loading: false,
        }
    },
    props: {
        comments: Array,
        fetchedAllComments: {
            type: Boolean,
            default: false,
        },
        commentAmt: {
            type: Number,
            default: 0,
        },
        mobile: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Comment,
        GeneralInput,
        LoadingGif,
    },
    methods: {
        postComment() {
            if (!this.loading) {
                this.loading = true;
                const comment = this.$refs.comment_input.getValue();

                if (comment != "" && comment != null) {
                    // the null check is done also server side
                    this.loadingNewComment = true;
                    this.$emit("postComment", comment);
                    this.$refs.comment_input.clearValue();
                }
            }
        },
    },
    watch: {
        // little janky, but basically when you try and make a new comment, it waits for the array to change before setting the loading gif back to false
        comments: function() {
            this.loadingNewComment = false;
            this.loading = false;
        }
    }
};
</script>

<style scoped>
.comment_section_desktop {
    width: 100%;
    min-width: 700px;
    margin: 75px auto 50px auto;
    /*
        margin-left: 50%;
        transform: translateX(-50%);
        */
}
.comment_section_mobile {
    width: 100%;
    padding: 15px;
    text-align: left;
}
.comments_title {
    font-size: 25px;
    color: var(--main-font-color);
    margin-bottom: 30px;
    text-align: left;
    padding-left: 10px;
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

.login_prompt {
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
    margin-left: 10px;
    cursor: pointer;
    text-decoration: none;
    padding: 10px;
}
.login_prompt:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}

.load_more_comments {
    padding: 5px 15px 5px 15px;
    background-color: var(--main-accent);
    color: #fff;
    margin: 0 auto;
    border: none;
    border-radius: 3px;
    margin-top: 40px;
    margin-bottom: 20px;
    margin-left: 20px;
}
.load_more_comments:hover {
    box-shadow: 0px 0px 10px var(--main-accent);
    cursor: pointer;
}
</style>

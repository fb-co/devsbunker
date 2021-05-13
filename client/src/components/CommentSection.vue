<template>
    <div :class="{ comment_section_desktop: !mobile, comment_section_mobile: mobile }" v-if="comments">
        <p class="comments_title">{{ comments.length + (comments.length == 1 ? " Comment" : " Comments") }}</p>
        <div v-if="$store.getters.accessToken">
            <GeneralInput ref="comment_input" :labelIsPlaceholder="true" :isQuery="false" label="Leave a comment" width="100%" class="comment_field" />
            <button @click="postComment()" class="leave_comment_button">Post</button>
        </div>
        <router-link to="/login" class="login_prompt" v-else>Login</router-link>
        <div style="margin-top: 20px;">
            <Comment v-for="(comment, index) in comments" :key="index" :commentData="comment" />
        </div>
    </div>
    <div v-else>
        <p class="comments_title">0 comments</p>
        <GeneralInput ref="comment_input" :labelIsPlaceholder="true" :isQuery="false" label="Leave a comment" width="100%" class="comment_field" />
        <button @click="postComment()" class="leave_comment_button">Post</button>
    </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import GeneralInput from "@/components/global/GeneralInput.vue";

export default {
    props: {
        comments: Array,
        mobile: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Comment,
        GeneralInput
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
}
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
</style>
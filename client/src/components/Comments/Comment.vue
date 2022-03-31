<template>
    <div class="comment_container" v-if="loaded">
        <div class="commentPFP_container">
            <ProfilePicture :username="username" :wrapperSize="mobile ? '40px' : '60px'" />
        </div>
        <div class="commentMessage_container">
            <div class="comment_header">
                <p class="vertical_flex_center" :class="{ comment_author: mobile, comment_author_desktop: !mobile }">
                    {{ username }}
                </p>
                <div class="timestamp vertical_flex_center">{{ usableTimestamp }}</div>
            </div>
            <p :class="{ comment_message: mobile, comment_message_desktop: !mobile }">{{ commentData.payload }}</p>
            <div class="placeholder" />
            <div class="more_options" :class="{ more_options_desktop: !mobile }">
                <div class="more_option">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-corner-down-left"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="var(--soft-text)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" />
                    </svg>
                    <p @click="createReply()" class="vertical_flex_center">Reply</p>
                </div>
            </div>
            <div class="reply_input" ref="reply_field_container">
                <ProfilePicture v-if="$store.getters.username" :username="this.$store.getters.username" :wrapperSize="mobile ? '30px' : '40px'" />
                <div class="input_container">
                    <input placeholder="Type your reply..." ref="reply_field" />
                    <div class="reply_line" />
                    <div class="reply_actions">
                        <button @click="cancelReply()" class="reply_cancel">Cancel</button>
                        <button @click="postReply()" class="reply_confirm">Reply</button>
                    </div>
                </div>
            </div>
            <div class="replies_container">
                <div v-for="(reply, index) in commentData.replies" :key="index" class="reply">
                    <ProfilePicture :username="reply.replier" :wrapperSize="mobile ? '30px' : '40px'" />
                    <div class="reply_text_container">
                        <p class="reply_author">{{ reply.replier }}</p>
                        <p class="vertical_flex_center reply_body">{{ reply.reply }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/User/ProfilePicture.vue";
import TimeStampService from "@/services/timestamp.service.js";
import GraphQLPostsService from "@/services/graphql/gql.posts.service.js";

export default {
    data() {
        return {
            mobile: this.$store.getters.mobile,
            username: null,
            loaded: false,
            usableTimestamp: this.commentData.createdAt,
        };
    },
    props: {
        commentData: Object,
    },
    async created() {
        this.usableTimestamp = TimeStampService.convertToDate(this.commentData.createdAt, true, false, true);
        this.username = this.commentData.createdBy;
        this.loaded = true;
    },
    components: {
        ProfilePicture,
    },
    methods: {
        createReply() {
            if (this.$store.getters.isLoggedIn) {
                this.$refs.reply_field_container.style.display = "flex";
                this.$refs.reply_field.focus();
            } else {
                this.$store.dispatch("alertUser", { title: "Alert", type: "neutral", msg: "Login to reply" });
            }
        },
        cancelReply() {
            this.$refs.reply_field_container.style.display = "none";
            this.$refs.reply_field.value = "";
        },
        postReply() {
            if (this.$refs.reply_field.value !== "" && this.$refs.reply_field.value != null) {
                if (this.$refs.reply_field.value.length > 5000) {
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Comment length must be less than 5,000 characters" });
                } else {
                    GraphQLPostsService.replyToComment(this.$store.getters.accessToken, this.commentData.id, this.$refs.reply_field.value).then((res) => {
                        if (!res.errors) {
                            const reply = res.data.replyToComment;
                            this.commentData.replies.push(reply);

                            this.cancelReply();
                        } else {
                            this.$store.dispatch("alertUser", { msg: res.errors[0].message, type: "error", title: "Error" });
                        }
                    });
                }
            }
        },
    },
};
</script>

<style scoped>
@keyframes lineSlide {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}

.comment_container {
    display: flex;
    flex-direction: row;

    padding: 15px 15px 0px 15px;
    width: 100%;
    margin-bottom: 5px;
}
.commentPFP_container {
    max-width: 6%;
}
.commentMessage_container {
    text-align: left;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    width: 90%;
}
.comment_header {
    display: flex;
    width: 100%;
}
.comment_author {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 15px;
    max-width: calc(100% - 115px); /* Make sure it doesnt crush the timestamp */
    overflow: hidden;
    text-overflow: ellipsis;
}
.comment_author_desktop {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 15px;
    height: 100%;
}
.timestamp {
    font-weight: normal;
    color: var(--soft-text);
    font-size: 12px;
    width: 100px;
    margin-left: 15px;
}
.comment_message {
    color: var(--soft-text);
    overflow-wrap: break-word;
    word-wrap: break-word;
    padding-left: 15px;
    font-size: 13px;
}
.comment_message_desktop {
    color: var(--soft-text);
    overflow-wrap: break-word;
    word-wrap: break-word;
    padding-left: 15px;
    font-size: 17px;
}
.more_options {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 10px;
}
.more_option {
    position: relative;
    display: flex;
    border-radius: 3px;
    padding: 5px;
    cursor: pointer;
}
.more_option:hover {
    font-weight: bold;
}
.more_option svg {
    margin-left: 15px;
}
.more_option p {
    margin-left: 5px;
    margin-right: 15px;
    font-size: 14px;
    color: var(--soft-text);
}
.reply_input {
    display: none;
}
.reply_input input {
    background-color: transparent;
    border: none;
    color: var(--min-font-color);
    flex-grow: 1;
    font-size: 15px;
    padding-top: 7px;
    padding-bottom: 7px;
    margin-bottom: 3px;
}
.reply_input input:focus {
    outline: none;
}
.input_container {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    width: 350px;
}

.reply_line {
    height: 1.5px;
    background-color: var(--soft-text);
    width: 100%;
    animation: lineSlide 0.5s;
    border-radius: 5px;
}

.reply_actions {
    text-align: right;
}
.reply_actions button {
    padding: 5px 10px 5px 10px;
    margin-left: 10px;
    margin-top: 5px;
    border: none;
    color: #fff;
    cursor: pointer;
}
.reply_cancel {
    background-color: var(--error-red);
}
.reply_cancel:hover {
    box-shadow: 0px 0px 10px var(--error-red);
}
.reply_confirm {
    background-color: var(--main-accent);
}
.reply_confirm:hover {
    box-shadow: 0px 0px 10px var(--main-accent);
}

/* Replies */
.replies_container {
    display: flex;
    flex-direction: column;
}
.reply {
    display: flex;
    margin-bottom: 20px;
}
.reply_author {
    margin-left: 15px;
    color: var(--main-font-color);
    font-weight: bold;
}
.reply_body {
    margin-left: 15px;
    color: var(--soft-text);
}
</style>

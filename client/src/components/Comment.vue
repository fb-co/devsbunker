<template>
    <div class="comment_container">
        <div class="commentPFP_container">
            <ProfilePicture :username="commentData.commenter" :wrapperSize="mobile ? '40px' : '60px'" />
        </div>
        <div class="commentMessage_container">
            <p :class="{ comment_author: mobile, comment_author_desktop: !mobile }">{{ commentData.commenter }} <span class="timestamp">{{ commentData.timestamp }}</span></p>
            <p :class="{ comment_message: mobile, comment_message_desktop: !mobile }">{{ commentData.comment }}</p>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/ProfilePicture.vue";
import CommonUtils from "@/utils/common_utils.js";

export default {
    data() {
        return {
            mobile: this.$store.getters.mobile
        }
    },
    props: {
        commentData: Object
    },
    components: {
        ProfilePicture,
    },
    methods: {
        renderUsername(username, max) {
            return CommonUtils.renderUsername(username, max);
        }
    }
}
</script>

<style scoped>
.comment_container {
    display: flex;
    flex-direction: row;
    
    padding: 15px;
    width: 100%;
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
.comment_author {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.comment_author_desktop {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 15px;
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
    font-size: 15px;
}
.timestamp {
    font-weight: normal;
    color: var(--soft-text);
    font-size: 12px;
    margin-left: 10px;
}
</style>
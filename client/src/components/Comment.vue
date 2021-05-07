<template>
    <div class="comment_container">
        <div class="commentPFP_container">
            <ProfilePicture :username="commentData.commenter" wrapperSize="60px" />
        </div>
        <div class="commentMessage_container">
            <p class="comment_author">{{ commentData.commenter}} <span class="timestamp">{{ commentData.timestamp }}</span></p>
            <p class="comment_message">{{ commentData.comment }}</p>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/ProfilePicture.vue";

export default {
    props: {
        commentData: Object
    },
    components: {
        ProfilePicture
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
    max-width: 10%;
}
.commentMessage_container {
    text-align: left;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    width: 90%;
}
.comment_author {
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 15px;
}
.comment_message {
    color: var(--soft-text);
    overflow-wrap: break-word;
    word-wrap: break-word;
    padding-left: 15px;
}
.timestamp {
    font-weight: normal;
    color: var(--soft-text);
    font-size: 13px;
    margin-left: 10px;
}
</style>
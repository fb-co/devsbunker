<template>
    <div class="comment_container" v-if="loaded">
        <div class="commentPFP_container">
            <ProfilePicture :username="username" :wrapperSize="mobile ? '40px' : '60px'" />
        </div>
        <div class="commentMessage_container">
            <div class="comment_header">
                <p :class="{ comment_author: mobile, comment_author_desktop: !mobile }">
                    {{ username }}
                </p>
                <div class="timestamp">{{ usableTimestamp }}</div>
            </div>
            <p :class="{ comment_message: mobile, comment_message_desktop: !mobile }">{{ commentData.payload }}</p>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/User/ProfilePicture.vue";
import GraphQLService from "@/services/graphql.service.js";
import TimeStampService from "@/services/timestamp.service.js";

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
        const res = await GraphQLService.fetchUserById(this.commentData.userId, ["username"]);
        this.username = res.data.getUserById.username;
        this.loaded = true;
    },
    components: {
        ProfilePicture,
    },
};
</script>

<style scoped>
.comment_container {
    display: flex;
    flex-direction: row;

    padding: 15px;
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
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 15px;
    max-width: calc(100% - 110px); /* Make sure it doesnt crush the timestamp */
    overflow: hidden;
    text-overflow: ellipsis;
}
.timestamp {
    font-weight: normal;
    color: var(--soft-text);
    font-size: 12px;
    width: 100px;
    margin-left: 10px;
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
</style>

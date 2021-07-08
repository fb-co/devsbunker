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
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-corner-down-left" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--soft-text)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" />
                    </svg>
                    <p class="vertical_flex_center">Reply</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/User/ProfilePicture.vue";
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
        this.username = this.commentData.createdBy;
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
.comment_container:hover .more_options {
    visibility: visible;
}
.more_options {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 10px;
}
.more_options_desktop {
    visibility: hidden;
}
.more_option {
    display: flex;
    border-radius: 3px;
    padding: 5px;
    cursor: pointer;
}
.more_option:hover {
    background-color: var(--secondary-color);
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
</style>

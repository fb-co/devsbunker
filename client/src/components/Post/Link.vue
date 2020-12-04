<template>
    <a :href="usableLink" target="_blank" class="new_link_item">
        <img v-if="!isGithubLink" :src="'https://api.statvoo.com/favicon/?url=' + link" class="link_item">
        <img v-else src="@/assets/github-logo.png" class="link_item">
    </a>
</template>

<script>
export default {
    data() {
        return {
            usableLink: this.link,
            isGithubLink: false
        }
    },
    props: {
        link: String
    },
    created() {
        if (this.link.toLowerCase().includes("github")) {
            this.isGithubLink = true;
        }
        if (!this.link.toLowerCase().includes("http://") && !this.link.toLowerCase().includes("https://")) {
            this.usableLink = 'http://' + this.usableLink;
        }
    }
}
</script>

<style scoped>
    .new_link_item > img {
        height: 40px;
    }
</style>
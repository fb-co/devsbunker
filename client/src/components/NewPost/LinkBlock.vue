<template>
    <div class="link_block_container">
        <img class="link_logo" v-if="!github_link" :src="'https://api.statvoo.com/favicon/?url=' + link">
        <img class="link_logo" v-else src="@/assets/github-logo.png">

        <a :href="usableLink" target="_blank" class="link_text">{{ link }}</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            github_link: false,
            usableLink: this.link,
        }
    },
    props: {
        link: String,
    },
    created() {
        if (this.link.includes("github.com")) {
            this.github_link = true; 
        }
        if (!this.link.toLowerCase().includes("http://") && !this.link.toLowerCase().includes("https://")) {
            this.usableLink = 'http://' + this.usableLink;
        }
    }
}
</script>

<style scoped>
    .link_block_container {
        display: flex;
        flex-direction: row;
        margin-bottom: 15px;
    }
    .link_logo {
        width: 40px;
        object-fit: contain;
    }
    .link_block_container > a {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
        text-align: left;
        font-size: 15px;
        font-weight: bold;
        color: var(--main-font-color);
        margin-left: 20px;
        overflow: hidden;
    }
    .link_text {
        overflow: hidden;
        text-overflow: ellipsis;
    } 
</style>
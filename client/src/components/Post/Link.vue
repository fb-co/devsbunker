<template>
    <div style="position: relative;">
        <a @mouseover="showLink()" @mouseleave="hideLink()" :href="usableLink" target="_blank" class="new_link_item">
            <img v-if="!isGithubLink" :src="'https://api.statvoo.com/favicon/?url=' + link" class="link_item">
            <img v-else src="@/assets/github-logo.png" class="link_item">
        </a>
        <div v-if="hoverEffect && showLinkOnHover" class="shownLink">
            <div></div>
            <p>{{ link }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usableLink: this.link,
            isGithubLink: false,
            showLinkOnHover: false
        }
    },
    props: {
        link: String,
        // toggles if you can see the link on hover
        hoverEffect: {
            type: Boolean,
            default: false
        }
    },
    created() {
        if (this.link.toLowerCase().includes("github")) {
            this.isGithubLink = true;
        }
        if (!this.link.toLowerCase().includes("http://") && !this.link.toLowerCase().includes("https://")) {
            this.usableLink = 'http://' + this.usableLink;
        }
    },
    methods: {
        showLink() {
            this.showLinkOnHover = true;
        },
        hideLink() {
            this.showLinkOnHover = false;
        }
    }
}
</script>

<style scoped>
    .new_link_item > img {
        height: 40px;
    }
    .shownLink {
        position: absolute;
        top: 50px;
    }
    .shownLink p {
        background-color: var(--secondary-color);
        padding: 10px;
        border-radius: 5px;
        color: var(--main-font-color);
    }
    .shownLink div {
        margin: 0 auto;
        border-bottom: 10px solid var(--secondary-color);
        border-left: 25px solid transparent;
        border-right: 25px solid transparent;
        width: 50px;
    }
</style>
<template>
    <div style="position: relative;">
        <div @mouseover="showLink()" @mouseleave="hideLink()" @click.stop="openConfirmation()" target="_blank" class="new_link_item">
            <img v-if="!isGithubLink" :src="'https://api.statvoo.com/favicon/?url=' + link" class="link_item" @load="doneLoading=true">
            <img v-else src="@/assets/github-logo.png" class="link_item" @load="doneLoading=true">
            <LoadingGif v-if="!doneLoading" :show="true" size="50px" class="loading_gif" />
        </div>

        <div v-if="hoverEffect && showLinkOnHover" class="shownLink">
            <div></div>
            <p>{{ link }}</p>
        </div>

        <ConfirmationPopup 
            ref="confirmRedirect"
            title="Warning" 
            msg="The intended destination is not part of this site. Proceed at your own risk."
            :subMsg="link"
            confirmButton="Proceed"
            @confirm="redirect()"
        />
    </div>
</template>

<script>
import ConfirmationPopup from "@/components/Popups/ConfirmationPopup.vue";
import LoadingGif from "@/components/global/LoadingGif.vue";

export default {
    data() {
        return {
            usableLink: this.link,
            isGithubLink: false,
            showLinkOnHover: false,
            doneLoading: false,
        }
    },
    components: {
        ConfirmationPopup,
        LoadingGif
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
        },
        openConfirmation() {
            this.$refs.confirmRedirect.open();
        },
        redirect() {
            this.$refs.confirmRedirect.close();
            window.open(this.usableLink, '_blank')
        }
    }
}
</script>

<style scoped>
    .new_link_item > img {
        height: 40px;
    }
    .new_link_item:hover {
        cursor: pointer;
    }
    .shownLink {
        position: absolute;
        z-index: 50;
        top: 50px;
        max-width: 500px;
        word-wrap: break-word;
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

    .loading_gif {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
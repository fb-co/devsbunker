<template>
    <div class="mobile_post_container">
        <div class="custom_header_container" ref="image_div">
            <div class="header_actions">
                <svg
                    @click="back()"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-arrow-left"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    stroke-width="1.2"
                    stroke="var(--main-font-color)"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="5" y1="12" x2="11" y2="18" />
                    <line x1="5" y1="12" x2="11" y2="6" />
                </svg>
                <div style="flex-grow: 1"></div>
                <!-- Placeholder -->
                <div class="save_post_container">
                    <svg
                        @click="savePost(projectData.id)"
                        v-if="!projectData.isSaved"
                        width="25"
                        height="25"
                        stroke-width="0.7"
                        stroke="var(--ssoft-text)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark save_btn"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                        />
                    </svg>
                    <svg
                        @click="unsavePost(projectData.id)"
                        v-else
                        width="25"
                        height="25"
                        stroke-width="0.7"
                        stroke="var(--ssoft-text)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark-fill save_btn"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z" />
                    </svg>
                </div>

                <svg v-if="!projectData.isLiked" @click="likePost(projectData.id)" width="30" height="30" viewBox="0 0 16 16" class="bi bi-heart" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                </svg>
                <svg v-else @click="unlikePost(projectData.id)" width="30" height="30" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
            </div>
            <div class="placeholder">
                
            </div>
            <!-- Placeholder -->
            <div class="post_header_details">
                <p class="postname">{{ projectData.title }}</p>
                <p>
                    <span>By:</span>
                    {{ projectData.author }}
                </p>
            </div>
        </div>
        <p class="newPostTag">Tags</p>
        <div ref="tags" class="tag_container" v-if="tags">
            <p v-for="tag in tags" :key="tag" class="tag_item">{{ tag }}</p>
        </div>
        <p class="newPostTag">Description</p>
        <p class="post_description">{{ projectData.description }}</p>
        <p class="newPostTag">Links</p>
        <div class="links_container">
            <LinkItem v-for="link in projectData.links" :key="link" :link="link" class="link_item" />
        </div>
    </div>
</template>

<script>
import ProjectCardUtils from "@/mixins/project_card.mixin.js";
import LinkItem from "./Link.vue";

export default {
    data() {
        return {
            tags: undefined,
            postThumbnail: undefined,
        };
    },
    props: {
        projectData: Object,
    },
    mixins: [ProjectCardUtils],
    components: {
        LinkItem,
    },
    created() {
        this.tags = Object.values(this.projectData.tags);

        this.postThumbnail = `${process.env.VUE_APP_IMG_STATIC_ASSETS}/${this.projectData.images[0].dbname}`;
    },
    mounted() {
        this.$refs.image_div.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) ), url('${ this.postThumbnail }')`;
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
    },
};
</script>

<style scoped>
.mobile_post_container {
    width: 100%;
}
.placeholder {
    margin-top: 40px;
    height: 150px;
    width: 100%;
}

.custom_header_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--secondary-color);
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    padding: 30px 30px 40px 30px;
    box-shadow: 0px -8px 20px var(--main-font-color);
    background-size: cover;
}
.header_actions {
    width: 100%;
    display: flex;
    flex-direction: row;
}
.post_header_details {
    display: flex;
    flex-direction: column;
    text-align: left;
    color: #fff;
}
.save_post_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 30px;
    margin-right: 20px;
    
}
.postname {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
.newPostTag {
    padding: 15px 30px 15px 30px;
    text-align: left;
    font-weight: bold;
}
.post_description {
    color: var(--main-font-color);
    text-align: left;
    font-size: 13px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 15px;
}
.icon:hover {
    stroke-width: 2.5;
}
.tag_container {
    display: flex;
    flex-direction: row;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 15px;
}
.tag_container {
    margin-right: 10px;
    margin-left: 10px;
}
.tag_item {
    font-size: 12px;
    color: green;
    display: inline-block;
    text-align: left;
    padding: 5px 15px 5px 15px;
    border-radius: 20px;
    border: 1px solid green;
    margin-right: 5px;
}
.tag_item:not(:first-child) {
    margin-left: 5px;
}
.links_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100px;
    padding-left: 30px;
    padding-right: 30px;
}
.link_item {
    display: inline-block;
    margin-left: 4%;
    margin-right: 4%;
}
</style>

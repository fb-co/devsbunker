<template>
    <!-- 
        Its a bit janky, but the reason the mouseover and leave event is binding in three places is because the overlay 
        falls beneath the text and icons. As a result, if you only binded it to the overlay, the icons would be hidden
        every time you hovered over the text container or the icons parent itself
    -->
    <div class="project_box" ref="image_div" @click="$router.push({ path: `/post/${projectData.id}` })">
        <div @click.stop="" class="top_text_container" ref="icons" @mouseover="showIcons()" @mouseleave="hideIcons()">
            <!--Not filled icon -->
            <div class="icon_container">
                <svg 
                    v-if="!projectData.isLiked" 
                    @click.stop="likePost(projectData.id)"
                    width="35" 
                    height="35" 
                    viewBox="0 0 16 16" 
                    class="bi bi-heart"
                    fill="#eb4034" 
                    xmlns="http://www.w3.org/2000/svg"
                    style="margin-top: 3px"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                </svg>
                <svg
                    v-else
                    @click.stop="unlikePost(projectData.id)"
                    width="35"
                    height="35"
                    viewBox="0 0 16 16"
                    class="bi bi-heart-fill"
                    fill="#eb4034"
                    xmlns="http://www.w3.org/2000/svg"
                    style="margin-top: 3px"
                >
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
            </div>
            <div class="icon_container">
                <svg
                    @click.stop="savePost(projectData.id)"
                    v-if="!projectData.isSaved"
                    width="30"
                    height="30"
                    stroke-width="0.7"
                    stroke="var(--soft-text)"
                    viewBox="0 0 16 16"
                    class="bi bi-bookmark save_btn"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                    />
                </svg>
                <svg
                    @click.stop="unsavePost(projectData.id)"
                    v-else
                    width="30"
                    height="30"
                    stroke-width="0.7"
                    stroke="var(--soft-text)"
                    viewBox="0 0 16 16"
                    class="bi bi-bookmark-fill save_btn"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z" />
                </svg>
            </div>
        </div>
        <div class="text_container" @mouseover="showIcons()" @mouseleave="hideIcons()">
            <div class="text">
                <p class="title">{{ projectData.title }}</p>
                <p class="author">By: {{ projectData.author }}</p>
            </div>
        </div>
        <!-- Because of the structure of the html, we need to use js to show the icons when you hover over the overlay -->
        <div @mouseover="showIcons()" @mouseleave="hideIcons()" class="hover_overlay" />
    </div>    
</template>

<script>
import ProjectCardUtils from "@/mixins/project_card.mixin.js";

export default {
    data() {
        return {
            thumbnail_link: undefined
        }
    },
    mixins: [ProjectCardUtils],
    props: {
        projectData: Object,
    },
    created() {
        this.thumbnail_link = `${process.env.VUE_APP_IMG_STATIC_ASSETS}/${this.projectData.thumbnail}`;
    },
    mounted() {
        this.$refs.image_div.style.backgroundImage = `url('${this.thumbnail_link}')`;
    },
    methods: {
        showIcons() {
            this.$refs.icons.style.display = "flex";
        },
        hideIcons() {
            this.$refs.icons.style.display = "none";
        }
    },
    watch: {
        projectData: function(newVal) {
            this.thumbnail_link = newVal.thumbnail || "../../../uploads/profile_pics/profilePlaceholder.png";
        },
    },
}
</script>

<style scoped>
@keyframes hover_animation {
    from {
        background-color: rgba(0, 0, 0, 0);
    }
    to {
        background-color: rgba(0, 0, 0, 0.3);
    }
}

.project_box {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 5px;
    flex: 1; /* Makes it stretch to fill container */
    
    min-width: 250px;
    min-height: 250px;

    background-size: cover;
    background-position: center;
}
.hover_overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0); 
    cursor: pointer;
}
.hover_overlay:hover {
    animation: hover_animation 0.4s;
    background-color: rgba(0, 0, 0, 0.3); 
}
.text_container:hover ~ .hover_overlay {
    animation: hover_animation 0.4s;
    background-color: rgba(0, 0, 0, 0.3); 
}
.top_text_container:hover ~ .hover_overlay {
    animation: hover_animation 0.4s;
    background-color: rgba(0, 0, 0, 0.3); 
}
.hover_overlay:hover ~ .top_text_container {
    display: flex;
}
.top_text_container {
    display: none;
    position: absolute;
    top: 0px;
    z-index: 1;
    border-radius: 5px;
    margin: 5px;
    flex-direction: row;
    background-color: rgba(0, 0, 0, 0.8);
}
.icon_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
}
.text_container {
    /* position absolute so the overlay wont darken the text or icons */
    position: absolute;
    bottom: 0px;
    z-index: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70px;
    background-color: rgba(0, 0, 0, 0.8);
}
.text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 80%;
}
.title {
    color: #fff;
    font-size: 17px;
    font-weight: bold;
    padding: 15px 8px 5px 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
.author {
    color: rgb(189, 189, 189);
    font-size: 13px;
    padding: 5px 8px 15px 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
</style>
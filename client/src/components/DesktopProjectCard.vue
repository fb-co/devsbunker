<template>
    <div class="proj_card_main_container" @click="$router.push('/post/' + projectData.id)">
        <div class="text_container">
            <router-link @click.native.stop="" :to="'user/' + projectData.author" class="author">{{ projectData.author }}</router-link>
            <p class="title">{{ projectData.title }}</p>
            <p class="desc">{{ projectData.description }}</p>

            <div style="flex-grow:1;"></div>
            <!--placeholder so info_container sinks to bottom -->

            <div class="info_container">
                <div v-if="!projectData.isLiked" @click.stop="likePost(projectData.id)" class="vertical_flex_center">
                    <!--Not filled icon -->
                    <svg
                        @mouseover="likeIsActive = true"
                        v-if="!likeIsActive"
                        width="23"
                        height="23"
                        viewBox="0 0 16 16"
                        class="bi bi-heart"
                        fill="#eb4034"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                        />
                    </svg>

                    <!-- Filled icon -->
                    <svg
                        @mouseleave="likeIsActive = false"
                        v-else
                        width="23"
                        height="23"
                        viewBox="0 0 16 16"
                        class="bi bi-heart-fill"
                        fill="#eb4034"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                </div>
                <div v-else class="vertical_flex_center">
                    <!-- Filled icon -->
                    <svg
                        @click.stop="unlikePost(projectData.id)"
                        width="23"
                        height="23"
                        viewBox="0 0 16 16"
                        class="bi bi-heart-fill"
                        fill="#eb4034"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                </div>
                <div class="vertical_flex_center likeAmt">
                    <p>{{ projectData.likeAmt }} -</p>
                </div>

                <div class="vertical_flex_center">
                    <!--
                    <svg
                        @click.stop="savePost(projectData.id)"
                        v-if="!projectData.isSaved"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-device-floppy save_btn"
                        width="27"
                        height="27"
                        viewBox="0 0 24 24"
                        stroke-width="1.2"
                        stroke="var(--main-font-color)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                        <circle cx="12" cy="14" r="2" />
                        <polyline points="14 4 14 8 8 8 8 4" />
                    </svg>
                    <p @click.stop="unsavePost(projectData.id)" class="saved_link" v-else>Unsave -</p>
                    -->
                    <svg 
                        @click.stop="savePost(projectData.id)"
                        v-if="!projectData.isSaved" 
                        width="18" 
                        height="18" 
                        stroke-width="0.7" 
                        stroke="var(--ssoft-text)" 
                        viewBox="0 0 16 16" 
                        class="bi bi-bookmark save_btn" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                            <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                    <svg 
                        @click.stop="unsavePost(projectData.id)"
                        v-else
                        width="18" 
                        height="18" 
                        stroke-width="0.7" 
                        stroke="var(--ssoft-text)"
                        viewBox="0 0 16 16" 
                        class="bi bi-bookmark-fill save_btn" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z"/>
                    </svg>
                </div>

                <div class="vertical_flex_center">
                    <p class="language">{{ projectData.bunkerTag }}</p>
                </div>
                <div class="spacer" v-if="projectData.price != 0 && projectData.price != null">
                    -
                </div>
                <p class="price_text" v-if="projectData.price != 0 && projectData.price != null">${{ projectData.price }}</p>
            </div>
        </div>
        <div class="image_container">
            <DynamicPicture :image_link="getThumbnail()" class="card_image" />

            <!--
            <img
                :src="@/assets/project_img_placeholder.png"
                class="card_image"
            />
            -->
        </div>
    </div>
</template>

<script>
import ProjectCardUtils from "@/mixins/project_card.mixin.js";
import DynamicPicture from "@/components/DynamicPicture.vue";

export default {
    data() {
        return {
            likeIsActive: false,
        };
    },
    props: {
        projectData: Object,
        width: {
            type: String,
            default: "200px",
        },
    },
    mixins: [ProjectCardUtils],
    components: {
        DynamicPicture,
    },
    methods: {
        getThumbnail() {
            if (this.projectData.images) {
                if (this.projectData.images.length > 0) {
                    return this.projectData.images[0].dbname;
                }
            }
            return "../../../uploads/profile_pics/profilePlaceholder.png";
        },
    },
};
</script>

<style scoped>
.proj_card_main_container {
    display: flex;
    flex-direction: row;
    height: auto;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}
.text_container {
    display: flex;
    flex-direction: column;
    min-width: 65%;
    text-align: left;
    padding: 10px;
}
.save_btn {
    margin-left: 10px;
}
.save_btn:hover {
    stroke: var(--main-font-color);
}
.likeAmt {
    margin-left: 10px;
    font-weight: bold;
}
.author {
    margin-bottom: 5px;
    font-size: 15px;
    color: var(--soft-text);
    text-decoration: none;
}
.author:hover {
    text-decoration: underline;
}
.title {
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: bold;
}
.desc {
    font-size: 16px;
    margin-bottom: 15px;
}
.language {
    margin-left: 10px;
}
.info_container {
    display: flex;
    flex-direction: row;
    color: var(--soft-text);
    margin-bottom: 10px;
}
.info_container > svg {
    cursor: pointer;
}
.image_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
}
.card_image {
    border-radius: 5px;
    width: 100%;
}
.spacer {
    padding-right: 10px;
    padding-left: 10px;
}
</style>

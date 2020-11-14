<template>
    <div class="proj_card_main_container" @click="$router.push('/post/' + projectData.id)">
        <div class="text_container">
            <router-link @click.native.stop="" :to='"user/" + projectData.author' class="author">{{ projectData.author }}</router-link>
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
                        <path
                            fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
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
                        <path
                            fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                    </svg>
                </div>
                <div class="vertical_flex_center likeAmt">
                    <p>{{ projectData.likeAmt }} -</p>
                </div>

                <div class="vertical_flex_center">
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                            <circle cx="12" cy="14" r="2" />
                            <polyline points="14 4 14 8 8 8 8 4" />
                    </svg>
                    <p @click.stop="unsavePost(projectData.id)" class="saved_link" v-else>Unsave - </p>
                </div>

                <div class="vertical_flex_center">
                    <p class="language">{{ projectData.bunkerTag }}</p>
                </div>
                <div
                    class="spacer"
                    v-if="projectData.price != 0 && projectData.price != null"
                >
                    -
                </div>
                <p
                    class="price_text"
                    v-if="projectData.price != 0 && projectData.price != null"
                >
                    ${{ projectData.price }}
                </p>
            </div>
        </div>
        <div class="image_container">
            <img
                src="@/assets/project_img_placeholder.png"
                class="card_image"
            />
        </div>
    </div>
</template>

<script>
import ProjectCardUtils from "@/mixins/project_card.mixin.js";

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
    mixins: [
        ProjectCardUtils
    ],
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
    stroke-width: 1.8;
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
    width: 100%;
}
.spacer {
    padding-right: 10px;
    padding-left: 10px;
}
.saved_link {
    margin-left: 5px;
    color: var(--soft-text);
}
.saved_link:hover {
    margin-left: 5px;
    color: var(--main-font-color);
}
</style>

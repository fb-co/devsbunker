<template>
    <div class="proj_card_main_container">
        <div class="text_container">
            <p class="author">{{ projectData.author }}</p>
            <p class="title">{{ projectData.name }}</p>
            <p class="desc">{{ projectData.desc }}</p>

            <div class="info_container">
                <div class="vertical_flex_center">
                    <!--Not filled icon -->
                    <svg @mouseover="likeIsActive=true" v-if="!likeIsActive" width="23" height="23" viewBox="0 0 16 16" class="bi bi-heart" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>

                    <!-- Filled icon -->
                    <svg @mouseleave="likeIsActive=false" v-else width="23" height="23" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </div>
                <div class="vertical_flex_center">
                    <p class="language">{{ projectData.category }}</p>
                </div>
                <div class="spacer">-</div>

                <p class="price_text" v-if="projectData.price!=0">${{ projectData.price }}</p>
                <p class="price_text" v-else>Free</p>
            </div>
        </div>
        <div class="image_container">
            <img src="@/assets/project_img_placeholder.png" class="card_image">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            likeIsActive: false
        }
    },
    props: {
        projectData: Object,
        width: {
            type: String,
            default: "200px"
        }
    }
}
</script>

<style scoped>
    .proj_card_main_container {
        display: flex;
        flex-direction: row;
        height: auto;  
    }
    .text_container {
        min-width: 65%;
        text-align: left;
        padding: 10px;
    }
    .author {
        margin-bottom: 5px;
        font-size: 15px;
        color: var(--soft-text);
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
    }
    .info_container > SVG {
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
</style>
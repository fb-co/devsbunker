<template>
    <div id="card_container" class="main_container no_select" :style="style">
        <div class="card_text_container">
            <p class="author card_text">{{ projectData.author }}</p>
            <p class="proj_name card_text">{{ projectData.name }}</p>
            <p class="proj_desc card_text">{{ projectData.desc }}</p>
            <div style="flex-grow: 1;"></div>
            <div class="likes_container">
                <!--Not filled icon -->
                <svg @mouseover="likeIsActive=true" v-if="!likeIsActive" width="17" height="17" viewBox="0 0 16 16" class="bi bi-heart" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>

                <!-- Filled icon -->
                <svg @mouseleave="likeIsActive=false" v-else width="17" height="17" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>

                <div class="vertical_flex_center">
                    <p class="likes card_text">{{ projectData.likes }}</p>
                </div>
                <div class="vertical_flex_center">
                    <p class="price_text" v-if="projectData.price!=0"> | ${{ projectData.price }}</p>
                    <p class="price_text" v-else> | Free</p>
                </div>
            </div>
        </div>
        <div class="card_img_container">
            <img src="@/assets/project_img_placeholder.png" class="card_img">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        projectData: Object,
        width: String
    },
    data() {
        return {
            likeIsActive: false
        }
    },
    computed: {
        style() {
            return "width: " + this.width;
        }
    }
}
</script>

<style scoped>
    #card_container{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: auto;
        margin-bottom: 20px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 15px;
        background-color: var(--general-card);
        cursor: pointer;
        border: 2px solid transparent;
    }
    .main_container:hover {
        border: 2px solid grey !important;
    }
    .card_text_container{
        display: flex;
        flex-direction: column;
        width: 70%;
        height: 100%;
    }
    .author{
        color: var(--soft-text);
    }
    .proj_name{
        font-weight: bold;
        font-size: 18px;
    }
    .proj_desc{
        color: var(--soft-text);
        font-size: 11px;
    }
    .likes_container{
        display: flex;
        flex-direction: row;
        margin-top: 7px;
    }
    .likes{
        color: var(--soft-text);
        font-size: 11px;
        margin-left: 10px;
    }
    .price_text{
        color: var(--soft-text);
        font-size: 11px;
        margin-left: 5px;
    }
    .card_text{
        text-align: left;
    }
    .card_text_container p:not(:first-child) {
        margin-top: 7px;
    }
    .card_img_container{
        width:30%;
    }
    .card_img{
        width: 100%;
    }

    @media only screen and (max-width: 500px) {
        .card_text_container{
            width: 100%;
        }  
        .card_img_container{
            display: none;
        }  
    }

</style>
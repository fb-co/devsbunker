<template>
    <div id="card_container" class="main_container">
        <div class="card_text_container">
            <p class="author card_text">{{ projectData.author }}</p>
            <p class="proj_name card_text">{{ projectData.name }}</p>
            <p class="proj_desc card_text">{{ projectData.desc }}</p>
            <div class="likes_container">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.50015 3.11444L7.73831 2.27918C5.95007 0.318521 2.67109 0.995119 1.48743 3.46011C0.931729 4.61951 0.80635 6.29343 1.82107 8.42976C2.7986 10.4868 4.83229 12.9506 8.50015 15.6343C12.168 12.9506 14.2006 10.4868 15.1792 8.42976C16.1939 6.2923 16.0696 4.61951 15.5129 3.46011C14.3292 0.995119 11.0502 0.317387 9.26198 2.27805L8.50015 3.11444ZM8.50015 17C-7.79166 5.5171 3.48393 -3.44527 8.31314 1.29545C8.37689 1.35778 8.43958 1.42238 8.50015 1.48925C8.5601 1.42244 8.62248 1.35817 8.68715 1.29658C13.5153 -3.44753 24.792 5.51597 8.50015 17Z" fill="#FF5A5A"/>
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
        projectData: Object
    }
}
</script>

<style scoped>
    #card_container{
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-bottom: 20px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 15px;
        background-color: var(--general-card);
        cursor: pointer;
        border: 2px solid transparent;
    }
    .main_container:hover{
        border: 2px solid grey !important;
    }
    .card_text_container{
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
<template> 
    <div class="head_foot_container">
        <div class="header_container">
            <p>{{ header }}</p>
        </div>
        <div class="arrow_container">
            <div class="arrow">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-left arrowSVG" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <polyline points="17 0 12 12 17 24" />
                </svg>
            </div>
            <div class="carousel_container_compo">
                <div class="images_container">
                    <img class="second_img" :src="image0" />
                    <img class="main_img" :src="image1" />
                    <img class="second_img" :src="image2" />
                </div>
            </div>
            <div class="arrow">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-right arrowSVG" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <polyline points="7 0 12 12 7 24" />
                </svg>
            </div>
        </div>
        <div class="indicator">
            <!-- Will move this to a v-for when I get the carousel to swtich images right -->
            <div class="indicator_bubble"></div>
            <div class="indicator_bubble"></div>
            <div class="indicator_bubble active_bubble"></div>
            <div class="indicator_bubble"></div>
            <div class="indicator_bubble"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            header: "Images"
        }
    },
    props: {
        image0: String,
        image1: String,
        image2: String,
        // it will eventually be the max amount of pics in a post
    },
};
</script>

<style scoped>
.head_foot_container {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    margin-top: 100px;
}
.header_container {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: var(--soft-text);
}
.arrow_container {
    display: flex;
    flex-direction: row;
}
.carousel_container_compo {
    width: 100%;
    display: flex;
    flex-direction: row;
    
    margin: 20px;
}
.images_container {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
}
.arrow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 10;
}
.arrowSVG {
    cursor: pointer;
    margin: 0 auto;
}
.main_img {
    max-width: 80%;
    object-fit: contain;
    margin: 15px;
    margin-bottom: 20px;
    
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
}
.second_img {
    max-width: 40%;
    object-fit: contain;
}
.indicator {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.indicator_bubble {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--soft-text);
    margin-right: 5px;
    margin-left: 5px;
}
.active_bubble {
    background-color: var(--main-font-color) !important;
}
</style>
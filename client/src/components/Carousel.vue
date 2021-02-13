<template>
    <div class="carousel_container_compo">
        <div class="arrow">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="var(--main-font-color)"
                class="bi bi-caret-left arrowSVG"
                viewBox="0 0 16 16"
            >
                <path
                    d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"
                />
            </svg>
        </div>
        <div class="images_container">
            <img class="second_img" :src="image0" />
            <img class="main_img" :src="image1" />
            <img class="second_img" :src="image2" />
        </div>
        <div class="arrow">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="var(--main-font-color)"
                class="bi bi-caret-right arrowSVG"
                viewBox="0 0 16 16"
            >
                <path
                    d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
                />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image0: String,
        image1: String,
        image2: String,
        // it will eventually be the max amount of pics in a post
    },
};
</script>

<style scoped>
.carousel_container_compo {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: var(--secondary-color);
    margin-top: 40px;
    margin-bottom: 40px;
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
    width: 100px;
    padding-left: 20px;
    padding-right: 20px;
    z-index: 10;
}
.arrow:hover {
    cursor: pointer;
    background-color: var(--general-card);
}
.main_img {
    max-width: 80%;
    object-fit: contain;
    margin-right: 10px;
    margin-left: 10px;
    padding: 10px;
}
.second_img {
    max-width: 400px;
    object-fit: contain;
}
</style>
<template> 
    <div class="head_foot_container no_select">
        <div class="header_container">
            <p>{{ header }}</p>
        </div>
        <div class="arrow_container">
            <div class="arrow" style="width: 70px;">
                <svg 
                    v-if="selectedImage!==0"
                    @click="switchLeft()" xmlns="http://www.w3.org/2000/svg" 
                    class="icon icon-tabler icon-tabler-chevrons-left arrowSVG" 
                    width="60" 
                    height="60" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="var(--main-font-color)" 
                    fill="none" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <polyline points="17 0 12 12 17 24" />
                </svg>
            </div>
            <div class="carousel_container_compo">
                <div ref="images" class="images_container">
                    <div class="individual_img_container" v-for="image in images" :key="image" :src="image">
                        <img :src="image" class="image" />
                    </div>
                </div>
            </div>
            <div class="arrow" style="width: 70px;">
                <svg 
                    v-if="selectedImage!=images.length-1"
                    @click="switchRight()" 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="icon icon-tabler icon-tabler-chevrons-right arrowSVG" 
                    width="60" 
                    height="60" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="var(--main-font-color)" 
                    fill="none" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <polyline points="7 0 12 12 7 24" />
                </svg>
            </div>
        </div>
        <div class="indicator">
            <!-- Will move this to a v-for when I get the carousel to swtich images right -->
            <div 
                v-for="(image, index) in images" 
                :key="index" 
                v-bind:class="{ active_bubble: selectedImage==index }" 
                class="indicator_bubble" 
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            header: "Images",
            selectedImage: 0,
        }
    },
    props: {
        images: Array,
        // it will eventually be the max amount of pics in a post
    },
    methods: {
        // The switch right and left methods will compute how much it has already slid and add or subtract more

        switchLeft() {
            // since all children will have the same slide, you can assume the slide of the first child will be the slide for all
            const currentSlide = getComputedStyle(this.$refs.images.children[0]).left;

            // trigger animation switch
            for (let i = 0; i < this.$refs.images.children.length; i++) {
                this.$refs.images.children[i].animate([
                    // keyframes
                    { left: currentSlide },
                    { left: `calc(${currentSlide} + 100%)` }
                ], {
                    duration: 300,
                    iterations: 1
                });

                this.$refs.images.children[i].style.left = `calc(${currentSlide} + 100%)`;
            }

            this.selectedImage--;
        },  
        switchRight() {
            const currentSlide = getComputedStyle(this.$refs.images.children[0]).left;

            // trigger animation switch
            for (let i = 0; i < this.$refs.images.children.length; i++) {
                this.$refs.images.children[i].animate([
                    // keyframes
                    { left: currentSlide },
                    { left: `calc(${currentSlide} - 100%)` }
                ], {
                    duration: 300,
                    iterations: 1
                });

                this.$refs.images.children[i].style.left = `calc(${currentSlide} - 100%)`;
            }

            this.selectedImage++;
            
        }
    }
};
</script>

<style scoped>
/* animation */
@keyframes slideOver {
    from {
        left: 0%;
    }
    to {
        left: 100%;
    }
}

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
    display: flex;
    flex-direction: row;
    overflow: hidden;
}
.image {
    margin: 0 auto;
    object-fit: contain;
    width: 100%;
}
.individual_img_container {
    position: relative;
    left: 0%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 100%;
    max-width: 100%;
    width: 100%;
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
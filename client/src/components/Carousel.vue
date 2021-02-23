<template> 
    <div class="head_foot_container no_select">
        <div class="header_container">
            <p>{{ header }}</p>
        </div>
        <div class="arrow_container">
            <div class="arrow" style="width: 70px;">
                <svg 
                    v-if="currentImage!==0"
                    @click="switchImage('left')" xmlns="http://www.w3.org/2000/svg" 
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
                    v-if="currentImage!=images.length-1"
                    @click="switchImage('right')" 
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
        <div ref="dots" class="indicator">
            <!-- Will move this to a v-for when I get the carousel to swtich images right -->
            <div 
                v-for="(image, index) in images" 
                :key="index" 
                v-bind:class="{ active_bubble: currentImage==index }"
                @click="switchImageTo(index)" 
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
            currentImage: 0,
        }
    },
    props: {
        images: Array,
        // it will eventually be the max amount of pics in a post
    },
    mounted() {
        this.showImages();
    },
    methods: {
        // switches the current image
        switchImage(direction) {
            // change the currentImage variable
            if (direction == 'right') {
                this.currentImage++;
            } else if (direction == 'left') {
                this.currentImage--;
            }
            
            // constrain the index bounds
            if (this.currentImage > this.images.length-1) {
                this.currentImage = 0;
            } else if (this.currentImage < 0) {
                this.currentImage = this.images.length-1;
            }

            // render the new image configuation
            this.showImages(this.currentImage);
        },

        // renders the images (run this everytime you switch the currentImage variable)
        showImages() {
            const slides = this.$refs.images.children;
            //const dots = this.$refs.dots.children;

            // hide all the images
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            slides[this.currentImage].style.display = "block";
        },

        // this swithces the variable to some given index, and updates the display
        switchImageTo(index) {
            this.currentImage = index;
            this.showImages();
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
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
}
.individual_img_container {
    margin: 0 auto;
}
.image {
    display: flex;
    object-fit: contain;
    width: 100%;
    max-height: 100%;
    height: 100%;
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
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--soft-text);
    margin-right: 5px;
    margin-left: 5px;
    cursor: pointer;
}
.active_bubble {
    background-color: var(--main-font-color) !important;
}
</style>
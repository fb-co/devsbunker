<template>
    <div style="background-color: var(--secondary-color); padding-top: 10px;">
        <p class="header">{{ header+' ( '+(index+1)+'/'+images.length+' )' }}</p>
        <div class="mobile_car_container" ref="mainContainer">
            <div class="ind_img_cont" v-for="image in images" :key="image">
                <img :src="image" />
            </div>
        </div>
        <div class="indicator">
            <div 
                v-for="(image, currentIndex) in images" 
                :key="currentIndex" 
                v-bind:class="{ active_bubble: index==currentIndex }"
                class="indicator_bubble" 
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        images: Array,
        header: {
            type: String,
            default: "Images"
        }
    },
    data() {
        return {
            container: undefined,
            containerChildrenAmt: undefined,
            xCoord: null,
            index: 0,
            locked: false,
            width: undefined,

            carouselIsMoving: false
        }
    },
    methods: {
        size() {
            this.width = window.innerWidth;
        },
        lock(event) {
            this.startingMouseCoords = [this.connect(event).clientX, this.connect(event).clientY]; // set mouse coords to calc angle
            this.xCoord = this.connect(event).clientX;
            this.container.classList.toggle('smoothTransition', !(this.locked = true));
            this.carouselIsMoving = false;
        },
        move(event) {
            if (this.locked) {
                let changeX = this.connect(event).clientX - this.xCoord, s = Math.sign(changeX);
                let factor = +(s*changeX/this.width).toFixed(2);

                // forgive me for these variable names, but they are just "flags" so I dont know what to call them
                if (( this.index > 0 || s < 0 ) && (this.index < this.containerChildrenAmt-1  || s > 0) && factor > 0.2) {
                    this.container.style.setProperty('--i', this.index -= s);
                    factor = 1 - factor;
                }
                this.container.style.setProperty('--tx', '0px');
                this.container.style.setProperty('--f', factor);
                this.container.classList.toggle('smoothTransition', !(this.locked=false));

                this.xCoord = null;
            }
        },
        connect(event) {
            return event.changedTouches ? event.changedTouches[0] : event;
        },
        // To understand this function you need to understand the unit circle
        drag(event) {      
            if (this.locked) {
                if (this.xCoord || this.xCoord === 0) {
                    this.carouselIsMoving = true;
                    this.container.style.setProperty('--tx', `${Math.round(this.connect(event).clientX - this.xCoord)}px`);
                }
            }
        },
    },
    mounted() {
        window.addEventListener('resize', this.size, false);
        this.size();

        this.container = this.$refs.mainContainer;
        this.containerChildrenAmt = this.container.children.length;

        this.container.addEventListener('mousedown', this.lock, false);
        this.container.addEventListener('touchstart', this.lock, false);

        this.container.addEventListener('mouseup', this.move, false);
        this.container.addEventListener('touchend', this.move, false);
        
        //document.addEventListener('scroll', this.preventMovement, false);
        this.container.addEventListener('touchmove', event => { event.preventDefault() }, false);

        this.container.addEventListener('mousemove', this.drag, false);
        this.container.addEventListener('touchmove', this.drag, false);

        this.container.style.setProperty('--n', this.containerChildrenAmt);
    },
    // remove all the listeners when you change pages or leave
    destroyed() {
        window.removeEventListener('resize', () => {});

        this.container.removeEventListener('mousedown', () => {});
        this.container.removeEventListener('touchstart', () => {});

        this.container.removeEventListener('mouseup', () => {});
        this.container.removeEventListener('touchend', () => {});

        //document.removeEventListener('scroll', () => {}); // If you ever have scrolling issues, it might be this line removing your event listener
        this.container.removeEventListener('touchmove', () => {});

        this.container.removeEventListener('mousemove', () => {});
        this.container.removeEventListener('touchmove', () => {});
    }
}
</script>

<style scoped>
    .header {
        text-align: left;
        padding: 15px 30px 15px 30px;
        font-weight: bold;
        color: var(--main-font-color);
    }
    .mobile_car_container {
        --n: 1;
        display: flex;
        flex-direction: row;
        width: calc( var(--n) * 100% );
        height: 400px;
        overflow: hidden;
        transform: translate( calc( var(--i, 0)/var(--n)*-100% + var(--tx, 0px) ) );
    }
    .ind_img_cont {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: calc(100%/var(--n));
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    .ind_img_cont img {
        max-width: 100%;
    }
    
    .smoothTransition {
        transition: transform calc(var(--f, 1)*0.5s) ease-out;
    }

    
    .indicator {
        padding-top: 30px;
        padding-bottom: 30px;
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
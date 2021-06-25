<template>
    <div class="more_information_container" @mousedown.prevent="open()">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
            <line x1="12" y1="19" x2="12" y2="19.01" />
        </svg>
        <div @click.stop="close()" v-if="informationOpen" class="backdrop" />
        <div @click.stop="" v-if="informationOpen" class="information_container" :class="{ information_container_desktop: !this.$store.getters.mobile, information_container_mobile: this.$store.getters.mobile }">
            <div class="cont_header">
                <div class="close_btn_container vertical_flex_center">
                    <svg @click="close()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <h4 class="vertical_flex_center">{{ title }}</h4>
                <div style="width: 50px;" /> <!-- Placeholder -->
            </div>
            <div class="main_cont">    
                <slot>
                    <!-- Add the information you want to add here (wherever your adding the component, not literally here) -->
                </slot>
                <div class="horizontal_flex_center">
                    <button @click="close()" class="general_button" style="margin: 30px auto 0px auto;">Ok</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            informationOpen: false,
        }
    },
    props: {
        title: {
            type: String,
            default: "Information"
        },
    },
    methods: {
        close() {
            this.informationOpen = false;
        },
        open() {
            this.informationOpen = true;
        }
    }
}
</script>

<style scoped>
@keyframes slideAnimation {
    from {
        top: -100%;
    }
    to {
        top: 50%;
    }
}

.more_information_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: var(--main-accent);
}
.more_information_container:hover {
    box-shadow: 0px 0px 15px var(--main-accent);
}

.more_information_container svg {
    margin: 0 auto;
}


.information_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 13;
    overflow-y: auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
    box-shadow: 0px 0px 15px var(--drop-shadow);
    animation: slideAnimation 0.4s;
}
.information_container_mobile {
    width: 95%;
    max-width: 400px;
    max-height: 95vh;
    min-height: 300px;
}
.information_container_desktop {
    width: 40%;
    min-width: 600px;
    max-width: 600px;
    max-height: 80vh;
    min-height: 300px;
}

.cont_header {
    display: flex;
    flex-direction: row;
}
.cont_header h4 {
    font-size: 23px;
    flex-grow: 1;
}
.close_btn_container {
    padding: 10px;
    width: 50px;
}
.close_btn_container svg:hover {
    stroke-width: 2px;
}
.main_cont {
    width: 70%;
    margin: 20px auto 20px auto;
    text-align: justify;
}
.main_cont p {
    color: var(--soft-text);
    font-size: 16px;
}
</style>
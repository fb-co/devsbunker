<template>
    <div v-if="isOpen" @click="close()" class="popup_background">
        <div class="popup_container" v-on:click.stop=""> <!-- you need this click event to stop the click propogation to the parent element -->
            <p>{{ label }}</p>
            <input class="searcher" placeholder="Search for contributers...">

            <!--<CreateTag v-for="contributer in contributers" :key="contributer" :label="contributer" />-->
            <div v-for="contributer in selected_contributers" :key="contributer" class="contributer">
                <p>{{ contributer }}</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: true,
            selected_contributers: ["John", "Billy"]
        }
    },
    props: {
        label: String,
    },
    methods: {
        close() {
            this.isOpen = false;
        },
        open() {
            this.isOpen = true;
        }
    }
}
</script>

<style scoped>
    .popup_background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);   
    }
    .popup_container {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 350px;
        z-index: 11;
        padding-bottom: 10px;
        
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
        background-color: var(--secondary-color);
        border-radius: 7px;
    }
    .popup_container > p {
        margin: 10px;
        font-weight: bold;
        color: var(--main-font-color);
    }
    .searcher {
        width: 175px;
        border: 1px solid var(--soft-text);
        background-color: var(--secondary-color);
        padding: 5px;
        border-radius: 5px;
        margin-top: 15px;
        margin-bottom: 20px;
        font-family: rubik;
    }
    .searcher:focus {
        border: 1px solid var(--main-font-color);
        outline: none;
    }
    .contributer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 10px;
    }
    .contributer > p {
        margin-right: 15px;
    }
</style>
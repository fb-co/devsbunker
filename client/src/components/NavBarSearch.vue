<template>
    <div class='main_container'>
        <div class='input_container'>
            <input class='main_input' id='search_input' v-on:blur="closeSearch()">
        </div>
        <div class='icon_container'>
            <svg @click="openSearch()" xmlns="http://www.w3.org/2000/svg" id='search_icon' class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
            </svg> 
        </div>
    </div>
</template>

<script>
export default {   
    methods: {
        openSearch() {
            const mainInput = document.getElementById('search_input');
            this.searchIsOpen = true;
            
            mainInput.style.display = "block";
            mainInput.style.width = "200px";
            mainInput.focus();
        },
        closeSearch() {
            if (!document.getElementById('search_icon').matches(':hover')){ //make sure the search icon is not hovered when you try to close the menu
                const mainInput = document.getElementById('search_input');
                this.searchIsOpen = false;
                
                mainInput.value = "";
                mainInput.style.display = "none";
                mainInput.style.width = "0px";
            } 
        }
    } 
}
</script>

<style scoped>
    @keyframes input_animation {
        from {
            width: 0px;
        }
        to {
            width: 200px;
        }
    }

    .main_container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .icon_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50px;
    }
    .icon_container svg:hover {
        stroke-width: 2px;
    }
    .icon_container svg {
        width:25px;
        height: 25px;
        margin: 0 auto;
    }
    .input_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .main_input {
        display: none;
        background-color: var(--main-color);
        box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.2);
        width: 0px;
        height: 25px;
        border-radius: 3px;
        padding: 7px;
        border: none;
        animation: input_animation 0.7s;
    }
    .main_input:focus {
        outline: none;
    }
    #search_input {
        font-family: "rubik";
    }

    /* Keep search open if the input is in focus */
    #search_input:focus {
        display: block;
        width: 200px;
    }

</style>
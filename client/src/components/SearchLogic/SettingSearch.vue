<template>
    <div class="main_container">
        <CustomInput>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
            <input type="text" name="search" id="setting_search" placeholder="Search a setting...">
        </CustomInput> 
        <div class="results">

        </div>
    </div>  
</template>

<script>
import CustomInput from "./global/CustomInput.vue";

export default {
    components: {
        CustomInput
    }
}
</script>

<style scoped>
    .main_container {
        width: 100%;
        position: relative;
    }
    .results {
        position: absolute;
        width: 100%;
        background-color: red;
    }
</style>
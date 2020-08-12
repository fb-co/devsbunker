<template>
    <div id="component_container" :style='cssProps'> 
        <div class='button_container'>
            <div>
                <p class='relative_vertical_center main_label'>{{ label }}</p>
            </div>
            <svg class="inline-icon-spacer relative_vertical_center" width="8" height="8" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="var(--main-font-color)" />
            </svg>
        </div>
        <div class='dropdown_container'>
            <ul class='main_list'>
                <slot>

                </slot>
            </ul>    
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        label: String, // label to be shown
        spacing: {     // amount of space between links
            type: String,
            default: '10px'
        }
    },
    computed: {
        cssProps() {
            return {
                '--link-spacing': this.spacing
            }
        }
    }
}
</script>

<style scoped>
    .button_container:hover > div > .main_label {
        font-weight: bold;    
    }
    .button_container:hover + .dropdown_container {
        display: flex;
    }
    .dropdown_container:hover {
        display: flex;
    }

    .button_container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .dropdown_container {
        display: none;
        flex-direction: row;
        justify-content: center;
        background-color: var(--secondary-color);
        width: 100%;
    }
    .main_list {
        display: block;
        flex-direction: column;
        list-style: none;
        width: 100%;
        height: 100%;
    }
    .main_list li {
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        padding: var(--link-spacing);
    }
    .main_list li a {
        display: inline-block;
        text-decoration: none;
        width: 100%;
    }
    
</style>
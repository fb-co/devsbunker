<template>
    <div id="component_container" :style="cssProps"> 
        <div id = "dropdown_btn">
            <p id="main_label">{{ label }}
                <svg class="inline-icon-spacer" width="8" height="8" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="var(--main-font-color)" />
                </svg>
            </p>
            <div id="links_container">
                <ul id="main_list">
                    <li v-for="link in links" :key="link.destination"> <!-- Not really sure what the :key part is -->
                        <router-link :to="link.destination" class="list_item">{{ link.text }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        label: String, // label to be shown
        height: Number, // I really want to find a way to calculate this within the component, but I cant figure it out (height of menu in px)
        spacing: String, // spacing in between the links
        links: Array // all the links in the dropdown
    },
    computed: {
        cssProps() {
            return {
                '--height': this.height,
                '--custom-spacing': this.spacing
            }
        }
    }
}
</script>

<style scoped>
    /* Ids */
    #main_label {
        line-height: var(--height);
    }
    #links_container {
        display: none;
        background-color: var(--secondary-color);
    }
    #main_list {
        list-style: none;
        line-height: var(--custom-spacing);
    }

    /* Classes */

    .list_item {
        display: inline-block;
        text-decoration: none;
        color: var(--main-font-color);
        width: 100%;
        height: 100%;
    }
    .list_item:hover {
        font-weight: bold;
    }

    /* Functionality */
    #dropdown_btn:hover > div {
        display: block;    
    }
</style>
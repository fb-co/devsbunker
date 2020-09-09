<!-- As of now the content box cannot contain any p tags -->
<!-- Dont enter a label prop and the component will assume the lable as the innerText of the first element in the dropdown -->
<template>
    <div class="component_container" @mouseleave="show = false" :style='cssProps'>
        <div class="label_container" @mouseover="show = true">
            <p class="label" id="main_label">{{ activeLabel }}</p>
            <div class="vertical_flex_center">
                <svg class="inline-icon-spacer" width="8" height="8" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="var(--main-font-color)" />
                </svg>
            </div>
        </div>
        <div class="content" id="content_id" :class="{showContent: show}" @click="handleClick">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: String, // label to be shown
        spacing: {
            // amount of space between links
            type: String,
            default: "25px",
        },
    },
    computed: {
        cssProps() {
            return {
                "--link-spacing": this.spacing,
            };
        },
    },

    data() {
        return {
            show: false,
            activeLabel: null // gets assigned in the mounted hook
        };
    },

    mounted() {
        this.activeLabel = this.label || document.getElementById("content_id").firstChild.innerText;
    },

    methods: {
        // changes label based on what you click
        handleClick(e) {
            this.show = !this.show;

            document.getElementById('main_label').innerText = e.target.innerText;            
        }
    }
};
</script>

<style scoped>
.label_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    z-index: 3;
}
.label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 0;
}
.content {
    display: none;
    background: var(--main-color);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 1;

    border-radius: 10px;
}

/* Functionality */
.label_container:hover {
    font-weight: bold;
}

.showContent {
    display: block;
}

.content > * {
    height: var(--link-spacing);
    width: 100%;
    border: none;
    text-align: center;
    font-size: 15px;
    font-family: rubik;
    background-color: transparent;
    color: var(--soft-text);
}
.content > *:hover {
    color: var(--main-font-color);
    cursor: pointer;
}
.content > *:focus {
    outline: none;
}

.component_container:hover {
    font-weight: bold;
    cursor: pointer;
}
</style>
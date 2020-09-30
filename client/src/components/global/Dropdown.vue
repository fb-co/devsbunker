<!-- As of now the content box cannot contain any p tags -->
<!-- Label prop is now REQUIRED -->
<template>
    <div class="component_container" @mouseleave="show = false" :style='cssProps'>
        <div class="label_container" @mouseover="show = true">
            <p class="label">{{ activeLabel }}</p>
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
        
        // amount of space between links
        spacing: {
            type: String,
            default: "25px",
        },
        
        // optional prop
        fontSize: {
            type: String,
            default: "15px"
        },

        dynamicSwitch: {
            type: Boolean,
            default: true
        },

        justify: {
            type: String,
            default: "center"
        },

        border_radius: {
            type: String,
            default: "10px"
        }
    },
    computed: {
        cssProps() {
            return {
                "--link-spacing": this.spacing,
                "--custom-fontsize": this.fontSize,
                "--justify-label": this.justify,
                "--radius": this.borderRadius
            };
        },
    },

    data() {
        return {
            show: false,
            activeLabel: this.label,
            shouldSwitch: this.dynamicSwitch
        };
    },
    methods: {
        // changes label based on what you click
        handleClick(e) {
            this.show = !this.show;

            if (this.shouldSwitch) {
                this.activeLabel = e.target.innerText;
            }
        }
    }
};
</script>

<style scoped>
.label_container {
    display: flex;
    flex-direction: row;
    justify-content: var(--justify-label);
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
    position: absolute;
    width: inherit;
    z-index: 1;

    border-radius: var(--radius);
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
    font-size: var(--custom-fontsize);
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
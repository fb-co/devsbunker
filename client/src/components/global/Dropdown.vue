<!-- As of now the content box cannot contain any p tags -->
<template>
    <div class="component_container" :style='cssProps'>
        <div class="label_container">
            <p class="label">{{ label }}</p>
            <svg class="inline-icon-spacer relative_vertical_center" width="8" height="8" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="var(--main-font-color)" />
            </svg>
        </div>
        <div class="content">
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
            default: "10px",
        },
    },
    computed: {
        cssProps() {
            return {
                "--link-spacing": this.spacing,
            };
        },
    },
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
}
.label {
    display: flex;
    flex-direction: column;
    justify-content: center;
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

.content:hover {
    display: block;
}
.label_container:hover + .content {
    display: block;
}
.label_container:hover {
    font-weight: bold;
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
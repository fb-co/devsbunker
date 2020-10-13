<template>
    <div @click="openMenu()" class="menu no_select" :style="cssProps">
        <p>{{ title }}</p>
        <svg width="8" height="8" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="var(--main-font-color)" />
        </svg>
        <div class="menu_cont" name="services">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },
    props: {
        title: {
            type: String,
            default: "New Dropdown"
        },
        height: {
            type: String,
            default: "auto"
        },
        openOn: {
            type: String,
            default: "click"
        },
        linkSize: { /* Refers to text size */
            type: String,
            default: "15px"
        },
        linkHeight: {
            type: String,
            default: "auto"
        },
        borderRadius: {
            type: String,
            default: "3px"
        }
    },
    methods: {
        openMenu() {
            if (!this.isOpen) {
                document.getElementsByName("services")[0].style.display = "flex";
            }else {
                document.getElementsByName("services")[0].style.display = "none";
            }
            this.isOpen = !this.isOpen;
        }
    },
    computed: {
        cssProps() {
            return {
                "--link-size": this.linkSize,
                "--border-radius": this.borderRadius,
                "--main-height": this.height,
                "--link-spacing": this.linkHeight
            };
        },
    },
}
</script>

<style scoped>
.menu {
    position: relative;
    cursor: pointer;
    border-radius: var(--border-radius);
}
.menu > p {
    display: inline-block;
    height: var(--main-height);
    line-height: var(--main-height); /* I have bad expereince with line-height, so if your having strange errors, try and remove this */
}
.menu > p:hover {
    font-weight: bold;
}
.menu svg {
    width: 10px;
    margin-left: 10px;
}
.menu .menu_cont {
    position: absolute;
}
.menu_cont {
    display: none;
    flex-direction: column;
    width: 100%;
}
.menu_cont > * {
    border: none;
    font-family: rubik;
    font-size: var(--link-size);
    height: var(--link-spacing);
    cursor: pointer;
}
.menu_cont > *:hover {
    color: var(--soft-text);
}
</style>
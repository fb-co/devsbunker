<template>
    <div @mouseleave="closeMenu()" class="menu no_select" :style="cssProps">
        <div @click="openMenu('click')" @mouseover="openMenu('hover')" class="label_wrapper">
            <p>{{ activeLabel }}</p>
            <div class="vertical_flex_center">
                <svg width="8" height="8" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="var(--main-font-color)" />
                </svg>
            </div>
        </div>
        <div @click="handleClick" class="menu_cont" name="services">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeLabel: this.label
        }
    },
    props: {
        label: {
            type: String,
            default: "New Dropdown"
        },
        dynamicLabel: {
            type: Boolean,
            default: true
        },
        height: {
            type: String,
            default: "auto"
        },
        openOn: {
            type: String,
            default: "click"
        },
        fontSize: { 
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
        openMenu(from) {
            if (from != null) {
                if (from==="click" && this.openOn==="click" || from==="hover" && this.openOn==="hover") {
                    document.getElementsByName("services")[0].style.display = "flex";
                }
            }else {
                document.getElementsByName("services")[0].style.display = "flex";
            }
        },
        closeMenu() {
            document.getElementsByName("services")[0].style.display = "none";
        },
        handleClick(e) {
            this.activeLabel = e.target.innerText;
            this.closeMenu();
        }
    },
    computed: {
        cssProps() {
            return {
                "--font-size": this.fontSize,
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
.label_wrapper {
    display: flex;
    justify-content: center;
    height: var(--main-height);
    line-height: var(--main-height); /* I have bad expereince with line-height, so if your having strange errors, try and remove this */
}
.menu > p {
    display: inline-block;
}
.label_wrapper:hover > p {
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
    font-size: var(--font-size);
    height: var(--link-spacing);
    cursor: pointer;
}
.menu_cont > *:hover {
    color: var(--soft-text);
}
.menu_cont > *:focus {
    outline: none;
}
</style>
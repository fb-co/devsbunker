<template>
    <div @mouseleave="closeMenu()" class="menu no_select" :style="cssProps">
        <div 
            
            ref="focusableElement"
            @click.stop="openMenu('click')" 
            @mouseover="openMenu('hover')" 
            @blur="closeMenu()"
            tabindex="0"
            class="label_wrapper"
        >
            <p>{{ activeLabel }}</p>
            <div class="vertical_flex_center">
                <svg width="8" height="8" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="var(--main-font-color)" />
                </svg>
            </div>
        </div>
        <div @mousedown="handleClick" class="menu_cont" ref="options">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeLabel: this.label,
            isOpen: false
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
        },
        justifyLabel: {
            type: String,
            default: "center"
        }
    },
    methods: {
        openMenu(from) {
            if (from != null) {
                if (from==="click" && this.openOn==="click") {
                    if (this.isOpen) {
                        this.closeMenu();
                    } else {
                        this.$el.getElementsByClassName('menu_cont')[0].style.display = "flex";
                        this.isOpen = true;
                    }
                } else if (from==="hover" && this.openOn==="hover") {
                    this.$el.getElementsByClassName('menu_cont')[0].style.display = "flex";
                    this.isOpen = true;
                }
            }else {
                this.$el.getElementsByClassName('menu_cont')[0].style.display = "flex";
                this.isOpen = true;
            }
            this.$refs.focusableElement.focus(); // for safari users
        },
        closeMenu() {
            this.$el.getElementsByClassName('menu_cont')[0].style.display = "none";
            this.isOpen = false;
        },
        handleClick(e) {
            // only bold the option that is selected (clear all then assign bold to the one)
            for (let i = 0; i < this.$refs.options.children.length; i++) {
                this.$refs.options.children[i].style.fontWeight = "normal";
            }
            e.target.style.fontWeight = "bold";


            this.activeLabel = e.target.innerText;
            this.$emit('itemSelected', this.activeLabel);
            this.closeMenu();
        },
    },
    mounted() {
        // bold the option if its the same as the initial label
        for (let i = 0; i < this.$refs.options.children.length; i++) {
            if (this.$refs.options.children[i].innerText == this.label) {
                this.$refs.options.children[i].style.fontWeight = "bold";
                break;
            }
        }
    },
    created() {
        // this is so the blur event works on mobile
        document.body.addEventListener("touchend", () => { 
            this.closeMenu(); 
            this.$refs.options.blur(); 
        });
    },
    computed: {
        cssProps() {
            return {
                "--font-size": this.fontSize,
                "--border-radius": this.borderRadius,
                "--main-height": this.height,
                "--link-spacing": this.linkHeight,
                "--justify-label": this.justifyLabel
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
    justify-content: var(--justify-label);
    height: var(--main-height);
    line-height: var(--main-height); /* I have bad expereince with line-height, so if your having strange errors, try and remove this */
}
.label_wrapper:focus {
    outline: none;
} 
.label_wrapper:hover > p {
    font-weight: bold;
}
.menu > p {
    display: inline-block;
}
.menu svg {
    width: 10px;
    margin-left: 10px;
}
.menu .menu_cont {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 15;
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
    background-color: #efefef;
}
.menu_cont > *:hover {
    color: var(--dropdown-hover-color);
}
.menu_cont > *:focus {
    outline: none;
}

.currentSelected {
    font-weight: bold;
}
</style>
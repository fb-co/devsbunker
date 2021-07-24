<template>
    <div @mousedown.stop="close()" @keyup.stop="nextDocument" v-if="isOpen" class="backdrop">
        <div @mousedown.stop="" class="cust_tag_popup">
            <div class="popup_header">
                <div class="close_btn_container" @click="close()">
                    <svg @click="close()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <p class="vertical_flex_center" style="font-size: 20px;">Add custom tags</p>
                <div style="width: 50px;" />
            </div>
            <p class="warning">Note: This feature is only enabled for users with a minimum of five posts</p>
            <input @input="updatefield()" placeholder="Custom tag..." class="cust_tag_input" ref="tag_input" />
            <button @click="addTag()" class="add_cust_tag_btn" ref="add_btn">Add</button>
            <div class="cust_tag_list">
                <p v-if="addedTags.length > 0" style="width: 200px; text-align: left; margin: 0 auto 20px auto;">Added Tags:</p>
                <div v-for="(tag, index) in addedTags" :key="index" class="contributer">
                    <CreateTag tagType="lang" :label="tag" />
                    <div class="remove_cont_container">
                        <svg
                            @click="remove_entry(tag)"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-x contributer_close"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="var(--main-font-color)"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateTag from "./CreateTag";

export default {
    data() {
        return {
            isOpen: false,
            customAddedTags: [],
        }
    },
    components: {
        CreateTag,
    },
    props: {
        addedTags: Array,
    },
    methods: {
        open() {
            this.isOpen = true;

            // neeed to wait for the html to render before accessing the ref
            setTimeout(() => {
                this.$refs.tag_input.focus();
            }, 200);
        },
        close() {
            this.isOpen = false;
        },
        updatefield() {
            const val = this.$refs.tag_input.value;

            if (val != "") {
                this.$refs.add_btn.style.visibility = 'visible';
            } else {
                this.$refs.add_btn.style.visibility = 'hidden';
            }
        },
        addTag() {
            const val = this.$refs.tag_input.value;

            if (val != "" && val != null) {
                this.customAddedTags.push(val);
                this.$emit("addedTag", val);
                this.$refs.tag_input.value = "";
                this.$refs.add_btn.style.visibility = 'hidden';
                this.$refs.tag_input.focus();
            }
        },
        remove_entry(tag) {
            for (let i = 0; i < this.customAddedTags.length; i++) {
                if (this.customAddedTags[i] === tag) {
                    this.customAddedTags.splice(i, 1);
                    return;
                }
            }
        },
        nextDocument() {
            // handle for pressing enter
            if (event.keyCode == 13) {
                const val = this.$refs.tag_input.value;

                if (val != "" && val != null) {
                    this.addTag()
                }
            }
        },
    },
}
</script>

<style scoped>
@keyframes slideAnimation {
    from {
        top: -100%;
    }
    to {
        top: 50%;
    }
}


.cust_tag_popup {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 50%;
    min-width: 350px;
    max-width: 550px;
    max-height: 95vh;
    overflow: auto;
    animation: slideAnimation 0.5s;
    border-radius: 10px;
    background-color: var(--secondary-color);
}

.popup_header {
    display: flex;
}
.popup_header > p {
    flex-grow: 1;
    font-weight: bold;
    font-size: 18px;
}
.close_btn_container {
    width: 50px;
}
.close_btn_container:hover > svg {
    stroke-width: 2px;
}

.warning {
    width: 250px;
    margin: 20px auto 10px auto;
    font-size: 12px;
    font-style: italic;
}

.cust_tag_input {
    width: 200px;
    border: 1px solid var(--soft-text);
    background-color: var(--secondary-color);
    padding: 5px;
    border-radius: 5px;
    margin-top: 15px;
    font-family: rubik;
    color: var(--main-font-color);
}
.cust_tag_input:focus {
    border: 1px solid var(--main-font-color);
    outline: none;
}

.add_cust_tag_btn {
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    width: 125px;
    margin: 15px auto 15px auto;
    border: none;
    border-radius: 3px;
    padding: 5px;
    background-color: var(--main-accent);
    cursor: pointer;
    visibility: hidden;
}
.add_cust_tag_btn:hover {
    box-shadow: 0px 0px 10px var(--main-accent);
}
.cust_tag_list {
    margin-bottom: 25px;
}
.contributer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 5px;
    margin-top: 5px;
}
.contributer_close:hover {
    stroke-width: 2.2px;
}
.entry-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-right: 10px;
}
.remove_cont_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
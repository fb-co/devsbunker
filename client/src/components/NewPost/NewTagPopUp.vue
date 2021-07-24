<!-- This component is dependant on its parent (Eventully we should combine this with the NewTags.vue component to make like a "global" one) -->
<template>
    <div v-if="isOpen" @mousedown="close()" class="popup_background">
        <div class="popup_container" @click.stop @mousedown.stop>
            <!-- you need this click event to stop the click propogation to the parent element -->
            <div class="header_container">
                <svg
                    @click="close()"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-x"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="var(--main-font-color)"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <p>{{ label }}</p>
                <div></div>
                <!--placeholder-->
            </div>

            <QueryInput ref="tag_search" :placeholder="inputPlaceholder" :searchFor="searchFor" />
            <p class="add_cust_tag_btn">Add Custom Tag</p>
            <button @click="add_entry()" v-if="searchFor==='links'" class="add_link_btn">Add</button>

            <div v-for="entry in selected_entries" :key="entry" class="contributer">
                <CreateTag tagType="lang" :label="entry"  v-if="searchFor === 'languages'" />
                <div v-else>
                    <p class="entry-text" v-if="entry.length < 20">{{ entry }}</p>
                    <p class="entry-text" v-else>{{ entry.slice(0, 20) + "..." }}</p>
                </div>
                <div class="remove_cont_container">
                    <svg
                        @click="remove_entry(entry)"
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
</template>

<script>
import QueryInput from "@/components/QueryInput.vue";
import CreateTag from "./CreateTag";

export default {
    data() {
        return {
            isOpen: false,
            selected_entries: this.entries,
        };
    },
    components: {
        QueryInput,
        CreateTag,
    },
    props: {
        name: String,
        label: String,
        entries: {
            type: Array,
        },
        searchFor: {
            type: String,
            default: "users",
        },
        inputPlaceholder: {
            type: String,
            default: "Search...",
        },
    },
    methods: {
        close() {
            if (this.name === "add_contributers") {
                this.$parent.set_contributers(this.selected_entries);
            } else if (this.name === "add_tags") {
                this.$parent.set_tags(this.selected_entries);
            } else if (this.name === "add_links") {
                this.$parent.set_links(this.selected_entries);
            }

            this.isOpen = false;
            //document.body.style.overflowY = "auto";
        },
        open() {
            this.isOpen = true;
            //document.body.style.overflowY = "hidden"; // temporarily disable main page scrolling
        },
        remove_entry(element) {
            for (let i = 0; i < this.selected_entries.length; i++) {
                if (this.selected_entries[i] == element) {
                    this.selected_entries.splice(i, 1);
                    break;
                }
            }
        },

        add_entry(value) {
            let duplicate = false;

            if (!value) {
                value = this.$refs.tag_search.getValue();
            }
            if (value !== "" && value != null) {
                for (let i = 0; i < this.selected_entries.length; i++) {
                    if (this.selected_entries[i] == value) {
                        duplicate = true;
                    }
                }

                if (!duplicate) {
                    this.$refs.tag_search.queryData();
                    this.selected_entries.push(value);
                    this.$refs.tag_search.clearValue();
                }
            }
        },
    },
};
</script>

<style scoped>
.popup_background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.popup_container {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 350px;
    z-index: 2;
    padding-bottom: 10px;
    height: 300px;
    max-height: 50vh;
    overflow-y: scroll;

    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    background-color: var(--secondary-color);
    border-radius: 7px;
}
.header_container {
    width: 100%;
    display: flex;
}
.header_container > div {
    width: 20%;
}
.header_container > svg {
    margin-top: 5px;
    width: 20%;
}
.header_container > svg:hover {
    stroke-width: 2.2px;
}
.header_container > p {
    flex-grow: 1;
    margin: 10px;
    font-weight: bold;
    color: var(--main-font-color);
}

.contributer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 20px;
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

.add_link_btn {
    color: #fff;
    margin-top: 15px;
    border: none;
    border-radius: 3px;
    width: 60px;
    padding: 5px;
    background-color: var(--main-accent);
}
.add_link_btn:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}

.add_cust_tag_btn {
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    width: 125px;
    margin: 15px auto 0px auto;
    border: none;
    border-radius: 3px;
    padding: 5px;
    background-color: var(--main-accent);
    cursor: pointer;
}
.add_cust_tag_btn:hover {
    box-shadow: 0px 0px 10px var(--main-accent);
}

.remove_cont_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Scrollbar */

.popup_container::-webkit-scrollbar {
    width: 7px;
}

/* Handle */
.popup_container::-webkit-scrollbar-thumb {
    background: var(--soft-text);
    margin: 5px;
    border-radius: 10px;
}

/* Handle on hover */
.popup_container::-webkit-scrollbar-thumb:hover {
    background: var(--main-font-color);
}
</style>
<!-- This component is dependant on its parent (Eventully we should combine this with the NewTags.vue component to make like a "global" one) -->
<template>
    <div v-if="isOpen" @click="close()" class="popup_background">
        <div class="popup_container" v-on:click.stop=""> <!-- you need this click event to stop the click propogation to the parent element -->
            <div class="header_container">
                <svg @click="close()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <p>{{ label }}</p>
                <div></div> <!--placeholder-->
            </div>
            <!---->
            <DynamicInput>
                <input ref="tag_search" class="searcher" placeholder="Search for contributers...">
            </DynamicInput>
            <button @click="add_entry()">Add (test btn)</button>

            <div v-for="entry in selected_entries" :key="entry" class="contributer">
                <p v-if="entry.length < 20">{{ entry }}</p>
                <p v-else>{{ entry.slice(0, 20) + "..." }}</p>
                <svg @click="remove_entry(entry)" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x remove_cont" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import DynamicInput from "@/components/DynamicInput.vue";

export default {
    data() {
        return {
            isOpen: false,
            selected_entries: this.entries
        }
    },
    props: {
        name: String,
        label: String,
        entries: {
            type: Array
        }
    },
    methods: {
        close() {
            if (this.name === "add_contributers") {
                this.$parent.set_contributers(this.selected_entries);
            }else if (this.name === "add_tags") {
                this.$parent.set_tags(this.selected_entries);
            }else if (this.name === "add_links") {
                this.$parent.set_links(this.selected_entries);
            }
            
            this.isOpen = false;
        },
        open() {
            this.isOpen = true;
        },
        remove_entry(element) {
            for (let i = 0; i < this.selected_entries.length; i++) {
                if (this.selected_entries[i] == element) {
                    this.selected_entries.splice(i, 1)
                    break;
                }
            }
        },
        add_entry() {
            this.selected_entries.push(this.$refs.tag_search.value);
            this.$refs.tag_search.value = "";
        },
    },
    components: {
        DynamicInput
    }
}
</script>

<style scoped>
    .popup_background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);   
    }
    .popup_container {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 350px;
        z-index: 11;
        padding-bottom: 10px;
        max-height: 80vh;
        overflow-y: auto;
        
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
    .searcher {
        width: 175px;
        border: 1px solid var(--soft-text);
        background-color: var(--secondary-color);
        padding: 5px;
        border-radius: 5px;
        margin-top: 15px;
        margin-bottom: 20px;
        font-family: rubik;
        color: var(--main-font-color);
    }
    .searcher:focus {
        border: 1px solid var(--main-font-color);
        outline: none;
    }
    .contributer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 10px;
    }
    .contributer > p {
        margin-right: 15px;
    }
    .contributer > svg:hover {
        stroke-width: 2.2px;
    }
</style>
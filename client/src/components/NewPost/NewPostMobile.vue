<template>
    <div class="new_post_container">
        <div class="header">
            <svg @click="close()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <p>New Post</p>
        </div>
        <GeneralInput class="field" label="Post Title" />

        <GeneralInput class="field" label="Post Description" :isTextArea="true" />

        <div class="tag_container">
            <p>Images (0/5)</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-plus add_image" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="13" r="3" />
                <path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                <line x1="15" y1="6" x2="21" y2="6" />
                <line x1="18" y1="3" x2="18" y2="9" />
            </svg>
        </div>

        <div class="tag_container">
            <p>Add Collaborators</p>
            <div class="add_tags">
                <CreateTag v-for="contributer in contributers" :key="contributer" :label="contributer" />

                <svg @click="$refs.contrib_popup.open()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus add_tag_symbol" width="70" height="70" viewBox="0 0 24 24" stroke-width="0.4" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
            </div>
        </div>

        <div class="tag_container">
            <p>Add Tags</p>
            <div class="add_tags">
                <CreateTag v-for="tag in tags" :key="tag" :label="tag" />

                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus add_tag_symbol" width="70" height="70" viewBox="0 0 24 24" stroke-width="0.4" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
            </div>
        </div>

        <div class="tag_container">
            <p style="margin-bottom: 25px;">Add Links</p>
            <div class="link">
                <LinkBlock link="www.google.com" />
                <LinkBlock link="https://www.figma.com/file/3PE210hyAyBOdf4c8Yk037/devsBunker?node-id=321%3A0" />
                <LinkBlock link="https://www.github.com" />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus add_symbol" width="70" height="70" viewBox="0 0 24 24" stroke-width="0.4" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
            </div>
        </div>

        <button class="create_post_button">Post</button>

        <!-- Sub-Popups -->
        <NewTagPopUp ref="contrib_popup" label="Add Contributers"/>
    </div>  
</template>

<script>
import GeneralInput from "../global/GeneralInput.vue";
import CreateTag from "./CreateTag.vue";
import LinkBlock from "./LinkBlock.vue";
import NewTagPopUp from "./NewTagPopUp.vue";

export default {
    data() {
        return {
            images: [], // eventully we will have links to images here
            contributers: [
                "Jacopo",
                "Leonardo",
                "Some Scrub",
                "Bob"
            ],
            tags: [
                "Javascript",
                "Vuejs",
                "HTML/CSS"
            ],
            links: [

            ]
        }
    },
    methods: {
        close() {
            this.$parent.close();
        }
    },
    components: {
        GeneralInput,
        CreateTag,
        LinkBlock,
        NewTagPopUp
    }
}
</script>

<style scoped>
    .new_post_container {
        display: flex;
        flex-direction: column;
        width: 95%;
        max-width: 450px;
        border-radius: 25px;
        margin: 0px auto 20px auto;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        padding-right: 10px;
        padding-left: 10px;
    }
    .header {
        display: flex;
        flex-direction: row;
        padding-top: 35px;
        margin-bottom: 30px;
    }
    .header > svg {
        margin-left: 5px;
    }
    .header > svg:hover {
        stroke-width: 2.5px;
    }
    .header > p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        font-weight: bold;
        color: var(--main-font-color);
        transform: translateX(-14px);
    }
    .field {
        margin: 0px auto 50px auto;
        max-width: 400px;
    }

    .tag_container {
        width: 90%;
        max-width: 400px;
        margin: 0px auto 50px auto;
        padding: 5px;
    }
    .tag_container > p {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        color: var(--main-font-color);
        margin-bottom: 20px;
    }
    .add_tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }
    .add_tag_symbol {
        margin: 5px;
        cursor: pointer;
    }
    .add_symbol:hover {
        stroke-width: 0.7px;
        cursor: pointer;
    }
    .add_tag_symbol:hover {
        stroke-width: 0.7px;
    }

    .link {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .create_post_button {
        background-color: var(--main-btn-color);
        border: none;
        outline: none;
        border-radius: 5px;
        width: 125px;
        height: 40px;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        margin: 0px auto 40px auto;
        cursor: pointer;
    }

    .add_image:hover {
        stroke-width: 2px;
        cursor: pointer;
    }
</style>
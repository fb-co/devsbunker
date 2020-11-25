<template>
    <div>
        <div ref="main_container" class="new_post_container">
            <div class="header">
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
                <p>New Post</p>
            </div>
            <GeneralInput ref="postTitle" class="field" label="Post Title" />

            <GeneralInput class="field" label="Post Description" ref="postDesc" :isTextArea="true" />

            <div class="tag_container">
                <p>Images (0/5)</p>
                <input type="file" name="media" ref="imageInput" enctype="multipart/form-data">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-camera-plus add_image"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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

                    <div class="add_icon_container">
                        <svg
                            @click="$refs.contrib_popup.open()"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-edit add_symbol"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="0.7"
                            stroke="var(--main-font-color)"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="tag_container">
                <p>Add Tags</p>
                <div class="add_tags">
                    <CreateTag v-for="tag in tags" :key="tag" :label="tag" />

                    <div class="add_icon_container">
                        <svg
                            @click="$refs.tags_popup.open()"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-edit add_symbol"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="0.7"
                            stroke="var(--main-font-color)"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="tag_container">
                <p style="margin-bottom: 25px;">Add Links</p>
                <div class="link">
                    <LinkBlock v-for="link in links" :key="link" :link="link" />
                    <!--
                <LinkBlock link="https://www.figma.com/file/3PE210hyAyBOdf4c8Yk037/devsBunker?node-id=321%3A0" />
                <LinkBlock link="https://www.github.com" />
                -->
                    <div class="add_icon_container">
                        <svg
                            @click="$refs.links_popup.open()"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-edit add_symbol"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="0.7"
                            stroke="var(--main-font-color)"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                    </div>
                </div>
            </div>
            <!--
                <div class="add_store_container">
                    <button v-if="isOnStore" class="add_store_button">Add To Store</button>
                    <button v-else class="add_store_button">Remove From Store</button>
                </div>
                <div id="on_store_options">
                    
                </div>
            -->

            <button @click="createPost()" class="create_post_button">
                Post
            </button>
        </div>

        <!-- Sub-Popups -->
        <NewTagPopup ref="contrib_popup" label="Add Contributers" name="add_contributers" :entries="contributers" style="position: fixed;" />
        <NewTagPopup ref="tags_popup" label="Add Tags" name="add_tags" :entries="tags" style="position: fixed;" />
        <NewTagPopup ref="links_popup" label="Add Links" name="add_links" :entries="links" style="position: fixed;" />

        <ErrorPopUp v-if="error" @display-popup="error = $event" :msg="errmsg" />
        <SuccessPopUp v-if="success" message="Successfully created new post" />
    </div>
</template>

<script>
import GeneralInput from "../global/GeneralInput";
import CreateTag from "./CreateTag";
import LinkBlock from "./LinkBlock";
import NewTagPopup from "./NewTagPopUp";
import GraphQLService from "@/services/graphql.service";
import FileUploadService from "@/services/fileUpload.service.js";
import Languages from "../../templates/Languages";
import ErrorPopUp from "../ErrorPopUp";
import SuccessPopUp from "../SuccessPopUp";

export default {
    data() {
        return {
            images: [], // eventully we will have links to images here
            contributers: [],
            tags: [],
            links: [],
            error: false,
            errmsg: "Internal error. Please try again later.", // by default its a 500 err
            success: false,
            isOnStore: false,
        };
    },
    mounted() {
        this.$refs.main_container.style.transform = "translateY(0%)";
    },
    methods: {
        close() {
            this.$parent.close();
        },
        set_contributers(contributers) {
            this.contributers = contributers;
        },
        set_tags(tags) {
            this.tags = tags;
        },
        set_links(links) {
            this.links = links;
        },
        validatePostPayload(payload) {
            let valid = true;
            const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

            /*
                (https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})

                Will match the following cases

                    http://www.foufos.gr
                    https://www.foufos.gr
                    http://foufos.gr
                    http://www.foufos.gr/kino
                    http://werer.gr
                    www.foufos.gr
                    www.mp3.com
                    www.t.co
                    http://t.co
                    http://www.t.co
                    https://www.t.co
                    www.aa.com
                    http://aa.com
                    http://www.aa.com
                    https://www.aa.com

                Will NOT match the following

                    www.foufos
                    www.foufos-.gr
                    www.-foufos.gr
                    foufos.gr
                    http://www.foufos
                    http://foufos
                    www.mp3#.com

            */

            // had to break this down because of async pain (i think)
            let errmsg = null;
            if (payload.title && payload.description && payload.bunkerTag && payload.links.length && payload.tags.length) {
                for (const link of payload.links) {
                    valid = regex.test(link);
                }

                if (valid) {
                    for (const tag of payload.tags) {
                        valid = Languages.includes(tag);
                        if (!valid) {
                            errmsg = "Invalid tag. Please select a valid language";
                            break;
                        }
                    }
                } else {
                    errmsg = "The entered URL is not a valid URL.";
                }
            } else {
                errmsg = "Please fill in all the necessary fields.";
                valid = false;
            }

            return { success: valid, err: errmsg };
        },
        createPost() {
            const post = {
                title: this.$refs.postTitle.getValue(),
                description: this.$refs.postDesc.getValue(),
                thumbnail: "@/assets/project_img_placeholder.png", // eventully this should be a real image link
                images: this.images,
                links: this.links,
                collaborators: this.collaborators,
                tags: this.tags,
                bunkerTag: "DevsBunkerTag",
                clip: "Du fuq is a clip?",
            };

            const check = this.validatePostPayload(post);
            if (check.success) {
                GraphQLService.createNewPost(this.$store.getters.accessToken, post)
                    .then((returnPost) => {
                        console.log("Created Post: ");
                        console.log(returnPost);
                        this.success = true;

                        const images = this.$refs.imageInput.files[0];

                        FileUploadService.addPostImages(images, returnPost.data.makePost.id, this.$store.getters.accessToken).then((res) => {
                            console.log(res);
                        });
                        /*
                        setTimeout(() => {
                            // refresh the post feed, if we ever use this component somewhere else, we will need to rethink how to do this.
                            this.$parent.$parent.queryPosts();
                            this.close();
                        }, 1000);
                        */
                    })
                    .catch(() => {
                        this.error = true;
                    });
            } else {
                this.error = true;
                this.errmsg = check.err;
            }
        },
        toggleStoreState() {
            this.isOnStore = !this.isOnStore;
        },
    },
    components: {
        GeneralInput,
        CreateTag,
        LinkBlock,
        NewTagPopup,
        ErrorPopUp,
        SuccessPopUp,
    },
};
</script>

<style scoped>
/*
#on_store_options {
    display: none;
    background-color: var(--secondary-color);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    height: 200px;
    margin: 20px 20px 60px 20px;
}
.add_store_container {
    display: flex;
    flex-direction: row;
    justify-content: left;
    padding-left: 10px;
}
.add_store_container > button {
    background-color: var(--main-btn-color);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 150px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin: 0px auto 0px auto;
    cursor: pointer;
}
.add_store_container > button:hover {
    box-shadow: 0px 4px 20px var(--main-btn-color);
}
*/

@keyframes slide {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0%);
    }
}

.new_post_container {
    display: flex;
    flex-direction: column;
    width: 95%;
    max-width: 450px;
    border-radius: 25px;
    margin: 0px auto 20px auto;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    /*box-shadow: 0px 4px 20px var(--main-font-color);*/
    padding-right: 10px;
    padding-left: 10px;
    background-color: var(--main-color);
    margin-top: 20px;

    transform: translateY(-100%);
    animation: slide 0.3s;
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
.add_icon_container {
    display: flex;
    justify-content: left;
    width: 100%;
}
.add_symbol:hover {
    stroke-width: 1.1px;
    cursor: pointer;
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
.create_post_button:hover {
    box-shadow: 0px 4px 20px var(--main-btn-color);
}

.add_image:hover {
    stroke-width: 2px;
    cursor: pointer;
}

/* mobile styles */
@media only screen and (max-width: 950px) {
    .new_post_container {
        max-width: 450px;
    }
}
/* desktop styles */
@media only screen and (min-width: 950px) {
    .new_post_container {
        max-width: 600px;
    }
    .field {
        max-width: 550px;
    }
    .tag_container {
        max-width: 550px;
    }
}
</style>

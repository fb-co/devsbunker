<template>
    <div class="new_post_background">
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
            <GeneralInput :isQuery="false" ref="postTitle" class="field" label="Post Title" />

            <GeneralInput :isQuery="false" class="field" label="Post Description" ref="postDesc" :showLength="true" :isTextArea="true" />
            <div class="tag_container">
                <p style="margin-top: 20px;">Images</p>
            </div>
            <div class="upload-card">
                <form v-on:submit.prevent="createPost()" enctype="multipart/form-data">
                    <div v-if="!files.length" class="file-area" @click="extendInput('upload-link')">
                        <svg
                            id="upload-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-cloud-upload"
                            width="96"
                            height="96"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#979797"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                            <polyline points="9 15 12 12 15 15" />
                            <line x1="12" y1="12" x2="12" y2="21" />
                        </svg>

                        <div class="upload-text">
                            <input
                                class="input-file"
                                type="file"
                                name="files[]"
                                @change="handleFiles($event)"
                                id="file"
                                multiple
                                accept=".jpg, .png, .jpeg, .gif"
                            />
                            <label for="file">
                                <span id="upload-link">
                                    <strong>Choose</strong>
                                </span>
                                files.
                            </label>
                        </div>
                    </div>

                    <div v-if="files.length" class="file-uploaded">
                        <div class="folder-icon">
                            <svg
                                width="30px"
                                height="30px"
                                viewBox="0 0 16 16"
                                class="bi bi-folder-fill"
                                fill="var(--main-accent)"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"
                                />
                            </svg>
                        </div>

                        <h2 class="uploading-header">Your files</h2>

                        <div class="file" v-for="(file, index) in files" :key="index">
                            <div class="wrapper">
                                <div class="icon-container">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-file"
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="#3F3E3E"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                    </svg>
                                </div>

                                <div class="file-name">
                                    <p>{{ file.name }}</p>
                                </div>

                                <div class="remove-file" @click="removeFile(index)">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-trash"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="#F44336"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="add-file-area" v-if="files.length < 5" @click="extendInput('add-link')">
                            <svg
                                id="add-file"
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-file-plus"
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#979797"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                <line x1="12" y1="11" x2="12" y2="17" />
                                <line x1="9" y1="14" x2="15" y2="14" />
                            </svg>

                            <div class="upload-text">
                                <input
                                    class="add-file-input"
                                    type="file"
                                    name="addfiles[]"
                                    @change="handleFiles($event)"
                                    id="added-file"
                                    multiple
                                    accept=".jpg, .png, .jpeg, .gif"
                                />
                                <label for="added-file">
                                    <span id="add-link">
                                        <strong>Add</strong>
                                    </span>
                                    files.
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="tag_container">
                <div class="tag_header">
                    <p class="vertical_flex_center">Add Collaborators</p>
                    <QuestionMark style="margin-left: 20px;" @open="openInfo('contributers')" />
                </div>
                <div class="add_tags">
                    <CreateTag v-for="contributer in contributers" :key="contributer" :label="contributer" tagType="user" />

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
                <div class="tag_header">
                    <p class="vertical_flex_center">Add Tags</p>
                    <QuestionMark style="margin-left: 20px;" @open="$refs.tags_info.open()" />
                </div>
                <div class="add_tags">
                    <CreateTag v-for="tag in tags" :key="tag" :label="tag" tagType="lang" />

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
                <div class="tag_header">
                    <p class="vertical_flex_center">Add Links</p>
                    <QuestionMark style="margin-left: 20px;" @open="$refs.links_info.open()" />
                </div>
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

            <button v-if="!creatingPost" @click="createPost()" class="create_post_button">Post</button>
            <LoadingGif :show="true" v-else />
        </div>

        <!-- Sub-Popups -->
        <NewTagPopup ref="contrib_popup" label="Add Contributers" name="add_contributers" :entries="contributers" searchFor="users" style="position: fixed" />
        <NewTagPopup ref="tags_popup" label="Add Tags" name="add_tags" :entries="tags" searchFor="languages" style="position: fixed" />
        <NewTagPopup
            ref="links_popup"
            label="Add Links"
            name="add_links"
            :entries="links"
            searchFor="links"
            inputPlaceholder="Paste URL..."
            style="position: fixed"
        />

        <InformativePopupBare ref="contributer_info">
            <p>Include any other collaborators registered on the site to give them credit.</p>
        </InformativePopupBare>
        <InformativePopupBare ref="tags_info">
            <p>Include tags which help others find your project.</p>
            <br.<br>
            <p style="font-weight: bold;">Example:</p>
            <p>Javascript, HTML, CSS</p>
        </InformativePopupBare>
        <InformativePopupBare ref="links_info">
            <p>Include any links to repositories or relevant sites that pertain to your project.</p>
        </InformativePopupBare>

        <ConfirmationPopup ref="confirm_leave" title="Confirm" msg="Are you sure you want to leave? All progress on this post will be lost." />
    </div>
</template>

<script>
import GeneralInput from "../global/GeneralInput";
import CreateTag from "./CreateTag";
import LinkBlock from "./LinkBlock";
import NewTagPopup from "./NewTagPopUp";
import LoadingGif from "@/components/global/LoadingGif.vue";
import InformativePopupBare from "@/components/Popups/InformativePopupBare.vue";
import ConfirmationPopup from "@/components/Popups/ConfirmationPopup.vue";
import QuestionMark from "@/components/Popups/QuestionMark.vue";
import GraphQLService from "@/services/graphql.service";
import FileUploadService from "@/services/fileUpload.service.js";
import Languages from "../../templates/Languages";

import Compressor from "compressorjs";

export default {
    data() {
        return {
            contributers: [],
            tags: [],
            links: [],
            isOnStore: false,
            creatingPost: false,
            files: [],
            compressedFiles: [],
        };
    },
    components: {
        GeneralInput,
        CreateTag,
        LinkBlock,
        NewTagPopup,
        LoadingGif,
        InformativePopupBare,
        QuestionMark,
        ConfirmationPopup,
    },
    mounted() {
        this.$refs.postTitle.focusInput();
        this.$refs.main_container.style.transform = "translateY(0%)";
    },
    created() {
        if (!this.$store.getters.username) {
            this.close();
            this.$router.push("/login");
        }
    },
    methods: {
        openInfo(type) {
            switch (type) {
                case "tags":
                    this.$refs.tag_info.open()
                    break;
                case "contributers":
                    this.$refs.contributer_info.open();
                    break;
                case "links":
                    this.$refs.links_info.open();
                    break;
            }
        },
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
        extendInput(link) {
            document.getElementById(link).click();
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

            if (payload.title.length > 100) return { success: false, err: "The maximum length for the title is 100 chars." };
            if (payload.description.length > 20000) return { success: false, err: "The maximum length for the description is 20,000 chars." };

            // had to break this down because of async pain (i think)
            let errmsg = null;
            if (payload.title && payload.description && payload.links.length && payload.tags.length) {
                for (const link of payload.links) {
                    valid = regex.test(link);
                }

                if (valid) {
                    for (const tag of payload.tags) {
                        valid = Languages.check(tag);
                        if (!valid) {
                            errmsg = "Invalid tag. Please select a valid language";
                            break;
                        }
                    }
                    // let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
                    // if (findDuplicates(payload.tags).length) {
                    //     errmsg = "Duplicate tags are not allowed.";
                    // }
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
                images: [],
                links: this.links,
                collaborators: this.contributers,
                tags: this.tags,
            };

            const check = this.validatePostPayload(post);

            if (this.files.length > 5) {
                this.$store.dispatch("alertUser", { msg: "You can upload 5 files max.", type: "error", title: "Error" });
            } else {
                if (check.success) {
                    // display loading gif and hide button if all fields were validated properly clientside
                    this.creatingPost = true;
                        
                    GraphQLService.createNewPost(this.$store.getters.accessToken, post)
                        .then((returnPost) => {
                            if (returnPost.errors?.length) {
                                // hide loading gif even if there are errors
                                this.creatingPost = false;

                                this.$store.dispatch("alertUser", { msg: returnPost.errors[0].message, type: "error", title: "Error" });
                                return;
                            }

                            FileUploadService.addPostImages(this.files, returnPost.data.makePost.id, this.$store.getters.accessToken).then(async (res) => {
                                // hide loading gif if it reaches this point
                                this.creatingPost = false;
                                
                                if (!/Successfully/.test(res.message)) {
                                    this.$store.dispatch("alertUser", { msg: res.message, type: "error", title: "Error" });
                                    return;
                                }
                                this.$store.dispatch("alertUser", { msg: "Created post!", type: "success", title: "Success" });

                                if (this.$route.name == "Home") {
                                    console.log(res);
                                    this.$emit("updateFeed", res.post);
                                } else {
                                    this.$router.push("/");
                                }

                                this.close();
                            });
                        })
                        .catch(() => {
                            this.$store.dispatch("alertUser", { msg: "Internal error. Please try again later.", type: "error", title: "Error" });
                        });
                } else {
                    this.$store.dispatch("alertUser", { msg: check.err, type: "error", title: "Error" });
                }
            }
        },
        toggleStoreState() {
            this.isOnStore = !this.isOnStore;
        },

        handleFiles(event) {
            if (event.target.files.length > 5 || this.files.length > 5) {
                this.$store.dispatch("alertUser", { msg: "You can upload a maximum of 5 files!", type: "error", title: "Error" });
                return;
            }

            if (!this.files) {
                this.files = [];
            }
            let tmp = [];
            for (const file of event.target.files) {
                // ! adding an extra array called compressedFiles while testing
                this.files.push(file);

                new Compressor(file, {
                    quality: 0.6,
                    maxWidth: 800,
                    maxHeight: 800,
                    success(result) {
                        tmp.push(result);
                    },
                    error(err) {
                        console.log(err.message);
                    },
                });
            }

            this.compressedFiles = tmp;
        },

        removeFile(index) {
            if (!this.files.length) {
                this.files = null;
            } else {
                this.files.splice(index, 1);
            }
        },
    },
};
</script>

<style scoped>
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
    margin: 0px auto 70px auto;
    /* box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); */
    /*box-shadow: 0px 4px 20px var(--main-font-color);*/
    padding-right: 10px;
    padding-left: 10px;
    background-color: var(--secondary-color);
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
.tag_container p {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: var(--main-font-color);
    margin-bottom: 0px;
}
.tag_header {
    display: flex;
    height: auto;
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
    background-color: var(--main-accent);
    border: none;
    outline: none;
    border-radius: 12px;
    width: 75%;
    height: 40px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin: 0px auto 40px auto;
    cursor: pointer;
}
.create_post_button:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}

.add_image:hover {
    stroke-width: 2px;
    cursor: pointer;
}

.new_image {
    display: block;
    color: var(--main-font-color);
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

/* ROBBED SECTION, copyright f0lg0 xD*/
.upload-card {
    width: 100%;
    max-width: 750px;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 60px;
    border-radius: 32px;
    text-align: center;
}
.input-grid-container {
    display: grid;
    grid-template-columns: auto auto;
    width: 100%;
    padding: 20px;
    max-width: 900px;
}
.input-grid-item {
    padding: 20px;
}
.file-area {
    width: 88%;
    height: 240px;
    margin: auto;
    cursor: pointer;
    border: 1px dashed #979797;
}
#upload-icon {
    margin-top: 35px;
}
.input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}
.upload-text {
    margin-top: 20px;
}
#upload-link {
    cursor: pointer;
}
.file-uploaded {
    border-radius: 32px;
    width: 88%;
    height: 100%;
    margin: auto;
}
.folder-icon {
    margin-top: 20px;
    margin-bottom: 10px;
}
.uploading-header {
    font-size: 20px;
    margin-bottom: 35px;
}
.file {
    width: 100%;
    height: 50px;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    flex-flow: flex-start;
    flex-wrap: nowrap;
    justify-content: center;
}
.wrapper {
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
@media screen and (max-width: 740px) {
    .upload-card {
        width: 90%;
    }
    .wrapper {
        width: 100%;
    }
}
.icon-container {
    width: 72px;
    height: 52px;
    border: 1px solid #979797;
    border-radius: 16px;
    background: none;
}
.file svg {
    margin-top: 10px;
    stroke: var(--main-font-color);
    opacity: 0.8;
}
.file-name {
    font-weight: bold;
    font-size: 15px;
    text-align: left;
    width: 100%;
    margin-left: 25px;
}
.remove-file {
    width: 50px;
    height: 50px;
    cursor: pointer;
}
.remove-file svg {
    stroke: #f44336;
    margin: auto;
    margin-top: 10px;
}
.add-file-area {
    width: 50%;
    height: 150px;
    margin: auto;
    margin-top: 60px;
    cursor: pointer;
    border: 1px dashed #979797;
}
#add-file {
    margin-top: 35px;
}
#add-link {
    cursor: pointer;
}
.add-file-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}
.upload-text {
    margin-top: 20px;
}
</style>

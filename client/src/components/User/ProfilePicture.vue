<template>
    <!-- This component is for showing profile pcitures to avoid rewriting the query a thousand times -->
    <div class="wrapper" :style="cssProps">
        <img
            v-if="image_link && default_image"
            :src="require('@/assets/profile_pictures/' + image_link)"
            ref="main_image"
            alt="profile_pic"
            class="profile_pic"
        />

        <img v-else-if="image_link && !default_image" :src="image_link" alt="profile_pic" ref="main_image" class="profile_pic" />

        <!-- For Upload = true -->
        <input
            v-if="forUpload"
            class="upload_container"
            @mouseenter="darkenImage()"
            @mouseleave="undarkenImage()"
            type="button"
            onclick="document.getElementById('file_uploader').click();"
        />

        <input
            v-if="forUpload"
            style="display: none"
            type="file"
            id="file_uploader"
            enctype="multipart/form-data"
            multiple
            accept=".jpg, .png, .jpeg, .gif"
            @change="handleFiles($event)"
        />

        <ImageCropperPopup v-if="forUpload" ref="cropper" />

        <p ref="file_upload_label" class="file_upload_name"></p>
    </div>
</template>

<script>
//'@/assets/profile_pictures/profilePlaceholder.png'
import GraphQLService from "@/services/graphql.service";
import ImageCropperPopup from "@/components/ImageCropperPopup.vue";
import Compressor from "compressorjs";

export default {
    data() {
        return {
            image_link: undefined,
            default_image: undefined,
            isChangingImage: false,
            yourPfp: false,
        };
    },
    components: {
        ImageCropperPopup,
    },
    props: {
        username: String,
        wrapperSize: {
            type: String,
            default: "100px",
        },
        maxWrapper: {
            type: String,
            default: "none",
        },
        minWrapper: String,
        forUpload: {
            type: Boolean,
            default: false,
        },
        // if true, will darken the image when its hovered over
        darkenOnHover: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        this.fetchImageLink();
    },
    computed: {
        cssProps() {
            return {
                "--wrapper-size": this.wrapperSize,
                "--max-wrapper": this.maxWrapper,
                "--min-wrapper": this.minWrapper || this.wrapperSize,
            };
        },
        yourPfpLink() {
            return this.$store.getters.profile_pic;
        },
    },
    watch: {
        yourPfpLink(newLink) {
            if (this.username == this.$store.getters.username) {
                this.image_link = newLink;

                // default pic could be stored in localstorage
                if (newLink === "profile_pic_placeholder.png") {
                    this.default_image = true;
                } else {
                    this.default_image = false;
                }
            }
        },
    },
    methods: {
        handleFiles(event) {
            const file = event.target.files[0];
            let compressed = null;

            if (file != undefined) {
                this.$refs.file_upload_label.innerText = file.name;

                new Compressor(file, {
                    quality: 0.6,
                    maxWidth: 500,
                    maxHeight: 500,
                    success: (result) => {
                        compressed = result;

                        const compressedBlobToFile = new File([compressed], compressed.name, { type: compressed.type });

                        if (compressedBlobToFile) {
                            this.$refs.cropper.open(compressedBlobToFile);
                        }
                    },
                    error(err) {
                        console.error("Error while compressing image: ", err.message);
                    },
                });
            }
        },

        //had to use some js here for complicated reasons
        darkenImage() {
            this.$refs.main_image.style.filter = "brightness(50%)";
        },
        undarkenImage() {
            this.$refs.main_image.style.filter = "brightness(100%)";
        },
        fetchImageLink() {
            const callAPI = () => {
                GraphQLService.fetchUserDetails(this.username, ["profile_pic"]).then((obj) => {
                    if (obj.data.user.profile_pic) {
                        if (obj.data.user.profile_pic === "profile_pic_placeholder.png") {
                            this.default_image = true;
                            this.image_link = obj.data.user.profile_pic;
                        } else {
                            this.default_image = false;
                            if (/http/.test(obj.data.user.profile_pic)) {
                                this.image_link = obj.data.user.profile_pic;
                            } else {
                                this.image_link = `${process.env.VUE_APP_PROFILE_PICTURES}${obj.data.user.profile_pic}`;
                            }
                        }
                        localStorage.setItem("profile_pic_link", this.image_link);
                        this.$store.dispatch("check_and_cache_pfp"); // cache what is in the localstorage
                    } else {
                        this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Something went wrong while fetching user details" });
                    }
                });
            };
            if (this.username != this.$store.getters.username) {
                const link = this.$store.getters.getPfpLink(this.username);

                if (link) {
                    if (link === "profile_pic_placeholder.png") {
                        this.default_image = true;
                    } else {
                        this.default_image = false;
                    }
                    this.image_link = link;
                } else {
                    GraphQLService.fetchUserDetails(this.username, ["profile_pic"]).then((obj) => {
                        if (obj.data.user.profile_pic) {
                            if (obj.data.user.profile_pic === "profile_pic_placeholder.png") {
                                this.default_image = true;
                                this.image_link = obj.data.user.profile_pic;
                            } else {
                                this.default_image = false;

                                if (/http/.test(obj.data.user.profile_pic)) {
                                    this.image_link = obj.data.user.profile_pic;
                                } else {
                                    this.image_link = `${process.env.VUE_APP_PROFILE_PICTURES}${obj.data.user.profile_pic}`;
                                }
                            }
                            this.$store.commit("cachePfpLink", { username: this.username, link: this.image_link });
                        } else {
                            this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Something went wrong while fetching user details" });
                        }
                    });
                }
            } else {
                const link = this.$store.getters.profile_pic;

                if (link) {
                    const check = link.split("/");
                    if (check[check.length - 1] != "null") {
                        if (link == "profile_pic_placeholder.png") {
                            this.default_image = true;
                        } else {
                            this.default_image = false;
                        }
                        this.image_link = link;
                    } else {
                        callAPI();
                    }
                } else {
                    // This is a fallback in case for some random reason the pfp wasent placed in the store (if everything goes right, it should never reach this point)
                    callAPI();
                }
            }
        },
    },
};
</script>

<style scoped>
.wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: var(--wrapper-size) !important;
    height: var(--wrapper-size) !important;
    max-width: var(--max-wrapper);
    max-height: var(--max-wrapper);
    min-width: var(--min-wrapper);
    min-height: var(--min-wrapper);
    overflow: hidden;
    border-radius: 50%;
}
.profile_pic {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    object-fit: cover;
}

.upload_container {
    position: absolute;
    background-color: transparent;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: none;
}
.upload_container:focus {
    outline: none;
}

.file_upload_name {
    display: none;
}
</style>

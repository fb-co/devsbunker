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

        <img
            v-else-if="image_link && !default_image"
            :src="image_link"
            alt="profile_pic"
            ref="main_image"
            class="profile_pic"
        />

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

        <ImageCropperPopup
            v-if="forUpload"
            ref="cropper"
            @success="reload($event)"
        />

        <p ref="file_upload_label" class="file_upload_name"></p>
    </div>
</template>

<script>
//'@/assets/profile_pictures/profilePlaceholder.png'
import GraphQLService from "../services/graphql.service";
import CacheService from "../services/cache.service";
import ImageCropperPopup from "@/components/ImageCropperPopup.vue";

export default {
    data() {
        return {
            image_link: undefined,
            default_image: undefined,
            isChangingImage: false
        };
    },
    components: {
        ImageCropperPopup
    },
    props: {
        username: String,
        wrapperSize: {
            type: String,
            default: "100px"
        },
        maxWrapper: {
            type: String,
            default: "none"
        },
        minWrapper: String,
        forUpload: {
            type: Boolean,
            default: false
        },
        // if true, will darken the image when its hovered over
        darkenOnHover: {
            type: Boolean,
            default: false
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
                "--min-wrapper": this.minWrapper || this.wrapperSize
            };
        }
    },
    methods: {
        handleFiles(event) {
            const file = event.target.files[0];

            if (file != undefined) {
                this.$refs.file_upload_label.innerText = file.name;
            }
            if (file) {
                this.$refs.cropper.open(file);
            }
        },

        //had to use some js here for complicated reasons
        darkenImage() {
            this.$refs.main_image.style.filter = "brightness(50%)";
        },
        undarkenImage() {
            this.$refs.main_image.style.filter = "brightness(100%)";
        },
        
        reload(status) {
            if (status) {
                this.fetchImageLink();
                //this.$emit("success", status);
            } else {
                // SHOW AN ERROR TO THE USER HERE
            }
        },
        fetchImageLink() {
            CacheService.getProfilePicLink();
            
            // fetch the users profile image link (THIS SHOULD BE CACHED EVENTULLY)
            GraphQLService.fetchUserDetails(this.username, ["profile_pic"]).then(
                obj => {
                    if (obj.data.user.profile_pic) {
                        if (obj.data.user.profile_pic === "profile_pic_placeholder.png") {
                            this.default_image = true;
                            this.image_link = obj.data.user.profile_pic;
                        } else {
                            this.default_image = false;
                            this.image_link = `${process.env.VUE_APP_PROFILE_PICTURES}${obj.data.user.profile_pic}`;
                        }
                    } else {
                        console.log("err");
                    }
                }
            );
        }
    }
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
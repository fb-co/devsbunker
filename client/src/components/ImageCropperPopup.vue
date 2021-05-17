<!--Parent element must have a function to close it closeCropper() -->
<template>
    <div @click="close()" ref="cropper" class="image_cropper_container" :key="reload">
        <div @click.stop class="popup_container">
            <div class="x-button">
                <svg
                    @click="close()"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-x close_button"
                    width="40"
                    height="40"
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
            </div>
            <div class="image_content">
                <div class="wrapper">
                    <img v-if="image_url" :src="image_url" class="demo_image" />
                </div>
                <div style="flex-grow: 1"></div>
                <!--Placeholder-->
                <button @click="upload()" class="upload_button">Upload</button>
            </div>
        </div>
    </div>
</template>

<script>
import FileUploadService from "@/services/fileUpload.service.js";

export default {
    data() {
        return {
            image_url: null,
            file: null,
            reload: 0,
        };
    },
    methods: {
        close() {
            document.body.style.overflowY = "auto";
            this.$refs.cropper.style.display = "none";
        },
        open(file) {
            this.file = file;
            this.image_url = URL.createObjectURL(file);

            document.body.style.overflowY = "hidden";
            this.$refs.cropper.style.display = "block";
        },
        upload() {
            console.log("[DEBUG] Uploading: ", this.file);
            FileUploadService.uploadProfilePic(this.file, this.$store.getters.accessToken).then((res) => {
                if (res.data) {
                    localStorage.removeItem("profile_pic_link");
                }
            });

            this.close();
        },
    },
};
</script>

<style scoped>
.image_cropper_container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.popup_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 25%;
    min-width: 350px;
    height: 400px;
    border-radius: 10px;
    background-color: var(--secondary-color);
    cursor: auto;
}
.x-button {
    display: flex;
    flex-direction: row;
    justify-content: left;
    height: 50px;
}
.close_button {
    margin: 10px;
    cursor: pointer;
}
.image_content {
    display: flex;
    flex-direction: column;
    height: calc(100% - 50px);
}
.upload_button {
    width: 125px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: var(--main-accent);
    color: #fff;
    border: 1px solid var(--main-accent);
    cursor: pointer;
    margin: 0px auto 20px auto;
}
.upload_button:hover {
    outline: none;
    box-shadow: 0px 4px 5px var(--main-accent);
}

.demo_image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0 auto;
}

.wrapper {
    position: absolute;
    overflow: hidden;
    width: 250px;
    height: 250px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>

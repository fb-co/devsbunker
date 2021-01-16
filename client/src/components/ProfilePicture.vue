<template>
    <!-- This component is for showing profile pcitures to avoid rewriting the query a thousand times -->
    <div class="wrapper" :style="cssProps">
        <img
            v-if="image_link && default_image"
            :src="require('@/assets/profile_pictures/' + image_link)"
            alt="profile_pic"
            class="profile_pic"
        />

        <img
            v-else-if="image_link && !default_image"
            :src="image_link"
            alt="profile_pic"
            class="profile_pic"
        />

        <input
            v-if="forUpload" 
            class="upload_container" 
            type="file"
            enctype="multipart/form-data"
            multiple
            accept=".jpg, .png, .jpeg, .gif"
        />
    </div>
</template>

<script>
//'@/assets/profile_pictures/profilePlaceholder.png'
import GraphQLService from "../services/graphql.service";

export default {
    data() {
        return {
            image_link: undefined,
            default_image: undefined
        };
    },
    props: {
        username: String,
        wrapperSize: {
            type: String,
            default: "100px"
        },
        forUpload: {
            type: Boolean,
            default: false
        }
    },
    created() {
        // fetch the users profile image link (THIS SHOULD BE CACHED EVENTULLY)
        GraphQLService.fetchUserDetails(this.username, ["profile_pic"]).then(
            obj => {
                if (obj.data.user.profile_pic) {
                    if (
                        obj.data.user.profile_pic ===
                        "profile_pic_placeholder.png"
                    ) {
                        this.default_image = true;
                        this.image_link = obj.data.user.profile_pic;
                    } else {
                        this.default_image = false;
                        this.image_link = `${process.env.VUE_APP_PROFILE_PICTURES}${obj.data.user.profile_pic}`;
                    }
                } else {
                    console.log("dude wtf err");
                }
            }
        );
    },
    computed: {
        cssProps() {
            return {
                "--wrapper-size": this.wrapperSize
            };
        },
    },
}
</script>

<style scoped>
    .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: var(--wrapper-size) !important;
        height: var(--wrapper-size) !important;
        border-radius: 50%;
        overflow: hidden;
    }
    .profile_pic {
        width: 100%;
        margin: 0 auto;
    }

    .upload_container {
        position: absolute;
        background-color: transparent;
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: none;
    }
</style>
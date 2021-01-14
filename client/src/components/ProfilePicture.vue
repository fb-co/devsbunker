<template>
    <!-- This component is for showing profile pcitures to avoid rewriting the query a thousand times -->
    <img
        v-if="image_link && default_image"
        :src="require('@/assets/profile_pictures/' + image_link)"
        alt="profile_pic"
    />

    <img
        v-else-if="image_link && !default_image"
        :src="image_link"
        alt="profile_pic"
    />
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
        img_width: {
            type: String,
            default: "100%"
        },
        img_height: {
            type: String,
            default: "auto"
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
    }
};
</script>

<style scoped>
.profile_pic {
    background-color: red;
}
</style>
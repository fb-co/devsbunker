<template>
    <!-- This component is for showing profile pcitures to avoid rewriting the query a thousand times -->
    <img v-if="image_link" :src="require('@/assets/profile_pictures/' + image_link)" alt="profile_pic">
</template>

<script>
//'@/assets/profile_pictures/profilePlaceholder.png'
import GraphQLService from "../services/graphql.service";

export default {
    data() {
        return {
            image_link: undefined
        }
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
        GraphQLService.fetchUserDetails(this.username, ["profile_pic"]).then((obj) => {
            if (obj.data.user.profile_pic) {
                this.image_link = obj.data.user.profile_pic;
            }
        });
    },
}
</script>

<style scoped>
    .profile_pic {
        background-color: red;
    }
</style>
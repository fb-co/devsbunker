<template>
    <!-- This component is for showing profile pcitures to avoid rewriting the query a thousand times -->
    <div class="wrapper" :style="cssProps">
        <img v-if="image_link" :src="require('@/assets/profile_pictures/' + image_link)" alt="profile_pic" class="profile_pic">
    </div>
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
        wrapperSize: {
            type: String,
            default: "100px"
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
</style>
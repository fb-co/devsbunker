<template>
    <div class="backdrop_container" ref="image_div" />
</template>

<script>
export default {
    data() {
        return {
            default_image: undefined,
            yourPfp: false,
        };
    },
    props: {
        pfp: String,
        isGitHubUser: {
            type: Boolean,
            default: false,
        }
    },
    mounted() {
        if (this.pfp != "profile_pic_placeholder.png") {
            this.$refs.image_div.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) ), url(${this.pfpLink})`;
        } else {
            this.$refs.image_div.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) )";
            this.$refs.image_div.style.backgroundColor = "var(--accent)";
        }
    },
    computed: {
        // return the correct format of link depending on if the user is a github user or not
        pfpLink() {
            if (this.isGitHubUser) {
                return this.pfp;
            }
            return `${process.env.VUE_APP_PROFILE_PICTURES}${this.pfp}`;
        },
    },
};
</script>

<style scoped>
.backdrop_container {
    width: 100vw;
    height: 300px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>

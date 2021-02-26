<template>
    <!-- You need to provide the entire file path -->
    <!--<img v-if="image_link" :src="require(image_link)" :alt="alternate">-->
    <img v-if="image_link" :src="full_path" :alt="alternate" />
</template>

<script>
export default {
    props: {
        image_link: {
            type: String,
            required: true,
        },
        alternate: {
            type: String,
            default: "image",
        },
    },
    data() {
        return {
            full_path: undefined,
        };
    },

    // update the image link if the prop changes
    watch: {
        image_link: function(newVal) {
            this.full_path = `${process.env.VUE_APP_IMG_STATIC_ASSETS}${newVal}`;
        }
    },

    created() {
        this.full_path = `${process.env.VUE_APP_IMG_STATIC_ASSETS}${this.image_link}`;
    },
};
</script>

<style scoped></style>

<!-- Leaving this component in case we ever want to change to a different post view for desktop versions -->
<template>
    <div v-if="isOpen" class="backdrop" style="overflow: auto;">
        <NewPostMobile v-on:updateFeed="propagateEvent($event)" class="new_post_box" />
        <!--<NewPostDesktop v-else />-->
    </div>
</template>

<script>
import NewPostMobile from "@/components/NewPost/NewPostMobile.vue";

export default {
    data() {
        return {
            isOpen: false,
        };
    },
    components: {
        NewPostMobile,
    },

    methods: {
        close() {
            document.body.style.overflow = "auto";
            this.isOpen = false;
        },
        open() {
            document.body.style.overflow = "hidden";
            this.isOpen = true;
        },
        getStatus() {
            return this.isOpen;
        },
        propagateEvent(post) {
            this.$emit("updateFeed", post);
        },
    },
};
</script>

<style scoped>
.new_post_box {
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge (scrollbar hide)*/
    scrollbar-width: none; /* Firefox (scrollbar hide)*/   
}

.new_post_box::-webkit-scrollbar {
    display: none;
}
</style>

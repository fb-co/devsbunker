<!-- Leaving this component in case we ever want to change to a different post view for desktop versions -->
<template>
    <div v-if="isOpen" class="main_new_post_container">
        <div class="backdrop"></div>
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
            document.body.style.overflowY = "auto"; // reenable main page scrolling
            this.isOpen = false;
        },
        open() {
            document.body.style.overflowY = "hidden"; // disable main page scrolling
            this.isOpen = true;
        },
        propagateEvent(flag) {
            console.log("propagating event");
            this.$emit("updateFeed", flag);
        },
    },
};
</script>

<style scoped>
.main_new_post_container {
    position: absolute;
    top: calc(var(--header-height));
    width: 100%;
    z-index: 3;
}
.new_post_box {
    position: fixed;
    width: 100%;
    z-index: 3;
    overflow: auto;
    max-height: calc(100% - var(--header-height));

    -ms-overflow-style: none; /* IE and Edge (scrollbar hide)*/
    scrollbar-width: none; /* Firefox (scrollbar hide)*/
}
.backdrop {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: var(--main-color);
}

.new_post_box::-webkit-scrollbar {
    display: none;
}
</style>

<!-- Leaving this component in case we ever want to change to a different post view for desktop versions -->
<template>
    <div v-if="isOpen" class="main_new_post_container">
        <NewPostMobile v-on:postFlag="propagateEvent($event)" />
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
            this.isOpen = false;
        },
        open() {
            this.isOpen = true;
        },
        propagateEvent(flag) {
            this.$emit("postFlag", flag);
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
    background-color: var(--main-color);
}
</style>

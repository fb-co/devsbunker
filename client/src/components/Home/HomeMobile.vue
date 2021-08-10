<template>
    <div>
        <div v-if="$store.getters.following_list.length > 0">
            <MobileFollowingList />
            <div class="custom_line" />
        </div>
        <PostFeed 
            :rootComponent="$parent" 
            :showFilter="false"
            :desktop="false" 
            v-if="loaded" 
            title="Discover Projects" 
        />
    </div>
</template>
<script>
import PostFeed from "@/components/PostFeed.vue";
import MobileFollowingList from "./mobile/MobileFollowingList.vue";

export default {
    props: {
        loaded: Boolean,
    },
    methods: {
        makeNewPost() {
            this.$parent.openPostMenu();
        },
    },
    components: {
        PostFeed,
        MobileFollowingList,
    },
};
</script>

<style scoped>
.custom_line {
    width: 90vw;
    min-height: 2px;
    max-height: 2px;
    margin: 0 auto;
    background-color: var(--secondary-color);
    margin-top: 10px;
    margin-bottom: 40px;
}
</style>

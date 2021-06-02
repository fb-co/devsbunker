<template>
    <div class="user_search_container">
        <UserFeed :rootComponent="this" />
    </div>
</template>

<script>
import SharedMethods from "@/utils/shared";
import UserFeed from "@/components/UserFeed.vue";
import UserFeedMixin from "@/mixins/user_feed.mixin.js";

export default {
    async created() {
        await this.fetchUsers(); // this is from the LoadMore mixin

        SharedMethods.loadPage();
    },
    mixins: [UserFeedMixin],
    components: {
        UserFeed
    }
};
</script>

<style scoped>

</style>
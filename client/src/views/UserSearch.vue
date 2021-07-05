<template>
    <div class="user_search_container" :class="{ calculated_height: !$store.getters.mobile }">
        <p class="title">Find People</p>
        <UserFeed :rootComponent="this" />
    </div>
</template>

<script>
import SharedMethods from "@/utils/shared";
import UserFeed from "@/components/User/UserFeed.vue";
import UserFeedMixin from "@/mixins/user_feed.mixin.js";

export default {
    async created() {
        await this.fetchUsers(); // this is from the LoadMore mixin

        SharedMethods.loadPage();
    },
    mixins: [UserFeedMixin],
    components: {
        UserFeed,
    },
};
</script>

<style scoped>
.user_search_container {
    overflow: auto;
}
.title {
    padding-top: 50px;
    margin-bottom: 80px;
    font-size: 25px;
    font-weight: bold;
}
</style>

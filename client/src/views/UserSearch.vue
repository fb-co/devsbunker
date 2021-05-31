<template>
    <div class="user_search_container">
        <UserFeed :rootComponent="this" />
    </div>
</template>

<script>
import SharedMethods from "@/utils/shared";
import UserFeed from "@/components/UserFeed.vue";

export default {
    created() {
        SharedMethods.loadPage();
    },
    components: {
        UserFeed
    }
};
</script>

<style scoped>

</style>
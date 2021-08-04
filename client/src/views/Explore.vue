<template>
    <div class="main_explore_container">
        <ExploreDesktop v-if="!$store.getters.mobile" />
        <ExploreMobile v-else />
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import ExploreDesktop from "@/components/Explore/ExploreDesktop.vue";
import ExploreMobile from "@/components/Explore/ExploreMobile.vue";

import LoadMoreMixin from "@/mixins/load_more.mixin.js";
import SearchUtilities from "@/utils/search_utilities.js";

export default {
    created() {
        SharedMethods.loadPage();

        this.queryType = "explore";
        this.sortingType = SearchUtilities.getExplorePostFilter();
        this.getPosts();
    },
    components: {
        ExploreDesktop,
        ExploreMobile,
    },
    mixins: [LoadMoreMixin],
}
</script>

<style scoped>

</style>
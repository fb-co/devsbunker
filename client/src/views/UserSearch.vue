<template>
    <div class="user_search_container">
        <UserSearch class="user_search_input" />

        <div class="users_search_results">
            <div v-if="showSearchResults">
                <UserCard v-for="user in searchResults" :key="user.username" :cardData="user" />
            </div>
        </div>
    </div>
</template>

<script>
import SharedMethods from "@/utils/shared";

import UserSearch from "@/components/UserSearch.vue";
import UserCard from "@/components/UserCard.vue";

export default {
    data() {
        return {
            searchResults: [],
            showSearchResults: false,
        };
    },
    created() {
        SharedMethods.loadPage();
    },
    methods: {
        updateSearchComponent(documents, closeResults) {
            this.searchResults = documents;

            if (closeResults) {
                this.showSearchResults = false;
            } else {
                this.showSearchResults = true;
            }
        },
    },
    components: {
        UserSearch,
        UserCard,
    },
};
</script>

<style scoped>
.user_search_input {
    width: 30%;
    min-width: 300px;
    max-width: 450px;
    margin: 30px auto 30px auto;
}
.users_search_results {
    margin: 0 auto;
    width: 80%;
    min-width: 350px;
    max-width: 700px;
    height: 200px;
}
</style>
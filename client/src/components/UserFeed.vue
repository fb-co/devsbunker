<template>
    <div class="user_feed">
        <UserSearch ref="user_search_bar" class="user_search_input" />

        <div class="users_search_results">
            <div v-if="showSearchResults" class="card_container">
                <UserCard v-for="(user, index) in searchResults" :key="index" :authorData="user" />
                <button v-if="!$refs.user_search_bar.fetchedAllResults" @click="loadNew()" class="load_more_btn">Load More</button>
            </div>
            <div v-else class="card_container">
                <UserCard v-for="(user, index) in rootComponent.users" :key="index" :authorData="user" />
                <button v-if="!rootComponent.fetchedAll" @click="loadNew()" class="load_more_btn">Load More</button>
            </div>
        </div>
    </div>
</template>

<script>
import UserSearch from "@/components/SearchLogic/UserSearch.vue";
import UserCard from "@/components/UserCard.vue";

export default {
    data() {
        return {
            searchResults: [],
            showSearchResults: false,
        };
    },
    components: {
        UserSearch,
        UserCard,
    },
    props: {
        rootComponent: Object,
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
        loadNew() {
            if (!this.showSearchResults) {
                this.rootComponent.fetchUsers();
            } else {
                this.$refs.user_search_bar.loadMoreResults();
            }
        },
        /*
        updateSearchFilter(value) {
            if (!this.showSearchResults) {
                this.rootComponent.updateFilterDropdown(value);
            } else {
                this.rootComponent.updateFilterDropdown(value);
                this.$refs.post_search.updateFilter(value);
            }
        },
        */
    },
};
</script>

<style scoped>
.user_search_input {
    width: 30%;
    min-width: 300px;
    max-width: 450px;
    margin: 30px auto 60px auto;
}
.users_search_results {
    margin: 0 auto;
    width: 80%;
    min-width: 350px;
    max-width: 700px;
}
.load_more_btn {
    margin: 20px auto 40px auto;
    border-radius: 5px;
    padding: 10px;
    background-color: var(--main-accent);
    cursor: pointer;
    width: 200px;
    color: #fff;
    border: none;
}
.load_more_btn:hover {
    font-weight: bold;
    box-shadow: 0px 4px 20px var(--main-accent);
}
</style>

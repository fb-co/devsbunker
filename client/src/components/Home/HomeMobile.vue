<template>
    <div class="main_container">
        <div class="main_content_container">
            <div id="loggedIn-header" v-if="$store.getters.isLoggedIn">
                <div class="header_container">
                    <div class="horizontal_flex_center">
                        <div class="header_right_cont">
                            <p class="username_welcome">{{ "Hello " + $store.getters.username + "!" }}</p>

                            <Dropdown @itemSelected="updateFilterDropdown" :label="postFeedFilter" fontSize="12px" linkHeight="40px" height="30px" justifyLabel="left" class="filter_dropdown">
                                <button>Newest</button>
                                <button>Most Popular</button>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 30px" v-else>
                <Dropdown @itemSelected="updateFilterDropdown" :label="postFeedFilter" fontSize="12px" linkHeight="40px" height="30px" justifyLabel="left" class="filter_dropdown">
                    <button>Newest</button>
                    <button>Most Popular</button>
                </Dropdown>
            </div>

            <!-- I don't like this in the home page, we could move it to the explore/subscription one -->
            <!-- <PostSearch width="90%" class="post_search_bar" /> -->

            <div v-if="!showSearchResults" class="project-card-container">
                <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="100%" />
            </div>
            <div v-else class="project-card-container">
                <MobileProjectCard v-for="searchResult in searchResults" :key="searchResult.name" :projectData="searchResult" width="100%" />
            </div>
            <p v-if="!fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
        </div>
    </div>
</template>
<script>
import MobileProjectCard from "@/components/MobileProjectCard.vue";
import Dropdown from "@/components/global/Dropdown.vue";

export default {
    data() {
        return {
            bunkers: ["All", "Python", "Javascript", "Java", "C/C++"],
            filter: "All",
            searchResults: [],
            showSearchResults: false,
        };
    },
    props: {
        projects: Array,
        fetchedAll: Boolean,
        postFeedFilter: String,
    },
    methods: {
        updateFilterDropdown(value) {
            this.$emit("updateFilterDropdown", value);
        },
        makeNewPost() {
            this.$parent.openPostMenu();
        },
        loadNew() {
            this.$parent.loadNew();
        },
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
        MobileProjectCard,
        Dropdown,
    },
};
</script>

<style scoped>
.main_container {
    width: 100%;
    overflow-x: hidden;
}
.main_content_container {
    width: 90%;
    max-width: 500px;
    min-width: 250px;
    margin-left: auto;
    margin-right: auto;
    height: auto;
}
.filter_dropdown {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 125px;
    color: var(--soft-text);
    font-weight: normal;
}
.username_welcome {
    font-weight: bold;
    text-align: left;
    font-size: 20px;
}
.header_container {
    margin-top: 60px;
    margin-bottom: 40px;
}

.add_button {
    margin-top: 10px;
    margin-bottom: 10px;
}
.add_button:hover {
    stroke-width: 0.7px;
}

.main_search {
    border-radius: 15px;
    height: 35px;
    margin-top: 40px;
    margin-bottom: 30px;
}
.main_search > input {
    margin-left: 15px;
    border-radius: 15px;
    font-size: 14px;
}
.submit_search {
    margin-right: 15px;
    width: 40px;
}
.submit_search:hover > svg {
    stroke-width: 2.5;
}

.header_right_cont {
    width: 85%;
    margin-top: 5px;
}
.switcher_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
}
.filter_container {
    width: 33.33%;
}
.underline {
    width: 25px;
    height: 4px;
    background-color: var(--main-accent);
    margin: 0 auto;
}
.switcher_container > div > p {
    height: 40px;
}
.switcher_container > p {
    height: 40px;
}

.prev_filter_class {
    color: var(--soft-text);
    text-align: left;
    position: relative;
    left: -40%;
}
.next_filter_class {
    color: var(--soft-text);
    text-align: right;
    position: relative;
    left: 40%;
}
.prev_filter_class:hover {
    font-weight: bold;
    cursor: pointer;
}
.next_filter_class:hover {
    font-weight: bold;
    cursor: pointer;
}
.current_filter_class {
    font-size: 21px;
    cursor: default;
    font-weight: bold;
    text-align: center;
}
.current_filter_subcontainer {
    flex-grow: 1;
}

.load_more_btn {
    margin: 30px auto 30px auto;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    width: 200px;
}

/* mobile styles */
@media only screen and (max-width: 350px) {
    .profile-pic {
        display: none;
    }
}

/* added by Leonardo, so if it's shit then it's my bad */
.project-card-container {
    width: 95%;
    margin: auto;
}
</style>

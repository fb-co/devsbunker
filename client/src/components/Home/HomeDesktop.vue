<template>
    <div class="main_container">
        <LeftContent />
        <div class="center_content">
            <!--
            <div class="language_cycler_container">
                <div class="lan_cycler_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="5" y1="12" x2="9" y2="16" />
                        <line x1="5" y1="12" x2="9" y2="8" />
                    </svg>
                </div>
                <div class="lan_cycler_cont">
                    <div class="language_car">
                        <p>Javascript</p>
                        <p>Python</p>
                        <p>All</p>
                        <p>C/C++</p>
                        <p>Java</p>
                    </div>
                </div>
                <div class="lan_cycler_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="15" y1="16" x2="19" y2="12" />
                        <line x1="15" y1="8" x2="19" y2="12" />
                    </svg>
                </div>
            </div>
            -->
            <div class="scrollable_center">
                <p class="discover_label no_select">Discover Projects</p>

                <PostSearch width="50%" class="post_search_bar" />

                <div class="filter_dropdown">
                    <Dropdown :label="postFeedFilter" linkHeight="40px" height="40px" width="200px" @itemSelected="updateFilterDropdown">
                        <button>Newest</button>
                        <button>Most Popular</button>
                    </Dropdown>
                </div>
                <div v-if="loaded">
                    <div v-if="!showSearchResults" class="projects_area">
                        <DesktopProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="70%" class="project_card" />
                    </div>
                    <div v-else>
                        <DesktopProjectCard v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" width="70%" class="project_card" />
                    </div>
                </div>
                <div id="loading-gif" v-else>
                    <Loading />
                </div>
                <!-- <div>
                    <DeletedPost class="project_card" width="70%" />
                </div>-->

                <!--
                <div @click="makeNewPost()" class="projects_footer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-square-plus add_button"
                        width="70"
                        height="70"
                        viewBox="0 0 24 24"
                        stroke-width="0.4"
                        stroke="var(--main-font-color)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <line x1="9" y1="12" x2="15" y2="12" />
                        <line x1="12" y1="9" x2="12" y2="15" />
                    </svg>
                </div>
                -->
                <p v-if="!fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
            </div>
        </div>
        <RightContent :notifications="notifications" />
    </div>
</template>

<script>
import DesktopProjectCard from "@/components/DesktopProjectCard.vue";
import PostSearch from "@/components/PostSearch.vue";
import Dropdown from "@/components/global/Dropdown.vue";
import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";
import Loading from "@/components/Loading.vue";

// tmp
// import DeletedPost from "@/components/Post/DeletedPost.vue";

export default {
    data() {
        return {
            username: "",
            searchResults: [],
            showSearchResults: false,
        };
    },

    props: {
        projects: Array,
        postFeedFilter: String,
        notifications: Array,
        fetchedAll: Boolean,
        loaded: Boolean,
    },
    methods: {
        makeNewPost() {
            this.$parent.openPostMenu();
        },
        // emit the data again to get it to the parent component where the localstorage can be updated
        updateFilterDropdown(value) {
            this.$emit("updateFilterDropdown", value);
        },
        updateSearchComponent(documents, closeResults) {
            this.searchResults = documents;

            if (closeResults) {
                this.showSearchResults = false;
            } else {
                this.showSearchResults = true;
            }
        },
        loadNew() {
            this.$parent.loadNew();
        },
    },
    components: {
        DesktopProjectCard,
        Dropdown,
        PostSearch,
        LeftContent,
        RightContent,
        Loading,
        //DeletedPost
    },
};
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.post_search_bar {
    margin: 0px auto 20px auto;
}

/* CENTER CONTENT */

.center_content {
    -ms-overflow-style: none; /* IE and Edge (scrollbar hide)*/
    scrollbar-width: none; /* Firefox (scrollbar hide)*/

    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.scrollable_center {
    overflow-y: scroll;
    height: calc(100vh - var(--header-height));
}
.language_cycler_container {
    display: flex;
    flex-direction: row;
    width: 75%;
    height: 50px;
    margin: 0 auto;
}
.lan_cycler_arrow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: var(--carosel-height);
    height: 100%;
}
.lan_cycler_arrow > svg {
    margin: 0 auto;
}
.lan_cycler_arrow > svg:hover {
    stroke-width: 2.5;
}
.lan_cycler_cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
}
.lan_cycler_cont > p {
    font-size: 20px;
}
.projects_area {
    padding: 10px;
    width: 100%;
    flex-grow: 1;
}
.project_card {
    margin: 0px auto 40px auto;
    max-width: 750px;
    min-width: 400px;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 10px;
}
.project_card:hover {
    cursor: pointer;
    border: 1px solid var(--main-accent);
}

.add_button {
    margin-top: 5px;
}
.add_button:hover {
    stroke-width: 0.7;
    cursor: pointer;
}
.projects_footer {
    width: 100%;
}

.language_car {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.language_car p {
    margin-left: 20px;
    margin-right: 20px;
    padding: 5px;
}
.discover_label {
    font-size: 25px;
    margin-top: 50px;
    margin-bottom: 40px;
}
.filter_dropdown {
    width: 200px;
    margin: 30px auto 40px auto;
}
.filter_dropdown > div {
    width: 200px;
}

.load_more_btn {
    margin: 0 auto 40px auto;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    width: 200px;
}

/* (center content scrollbar)
.scrollable_center::-webkit-scrollbar {
    width: 4px;
}
.scrollable_center::-webkit-scrollbar-thumb {
    background: var(--soft-text);
    border-radius: 10px;
}
*/

.scrollable_center::-webkit-scrollbar {
    display: none;
}

/* #loading-gif {
    margin-top: 200px;
} */
</style>

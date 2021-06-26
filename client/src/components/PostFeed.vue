<template>
    <div id="main_container" ref="scrollable_container">
        <p v-if="title" class="title">{{ title }}</p>
        <div class="filter_dropdown_container">
            <PostSearch
                ref="post_search"
                @highlightPhrases="highlightCards"
                @loading="loading = true"
                @doneLoading="loading = false"
                :sortingType="rootComponent.sortingType"
                :userToFilter="rootComponent.otherData.foreignUserToFilter"
                :filter="rootComponent.queryType"
                :moreOptions="true"
                width="50%"
                class="posts_search_bar"
            />

            <Dropdown
                :label="rootComponent.sortingType"
                fontSize="12px"
                linkHeight="40px"
                height="40px"
                class="filter_dropdown"
                @itemSelected="updateSearchFilter"
            >
                <button>Newest</button>
                <button>Most Popular</button>
            </Dropdown>
        </div>
        <div v-if="loading">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="margin:auto;background:none;display:block;"
                width="100px"
                height="100px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <g transform="rotate(0 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(30 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(60 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(90 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(120 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(150 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(180 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(210 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(240 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(270 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(300 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
                <g transform="rotate(330 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                    </rect>
                </g>
            </svg>
        </div>
        <div v-else>
            <div v-if="!showSearchResults" class="project_list">
                <div v-if="rootComponent.posts.length > 0" class="post_wrapper">
                    <div v-if="!desktop" class="mobile_post_feed">
                        <!-- <MobileProjectCard class="mobile_project_card" v-for="project in rootComponent.posts" :key="project.id" :projectData="project" /> -->
                        <LargeMobileProjectCard v-for="project in rootComponent.posts" :key="project.id" :projectData="project" />
                    </div>
                    <div v-if="desktop && feedTheme === 'Simple'" class="desktop_post_feed">
                        <!-- <DesktopProjectCard class="desktop_project_card" v-for="project in rootComponent.posts" :key="project.id" :projectData="project" width="70%" /> -->
                        <LargeDesktopProjectCard v-for="project in rootComponent.posts" :key="project.id" :projectData="project" />
                        <!-- <DetailedDesktopProjCard v-for="project in rootComponent.posts" :key="project.id" :projectData="project" /> -->
                    </div>
                    <div v-if="desktop && feedTheme === 'Descriptive'" class="desktop_post_feed">
                        <DetailedDesktopProjCard v-for="project in rootComponent.posts" :key="project.id" :projectData="project" />
                    </div>
                    <p v-if="!rootComponent.fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
                </div>
                <div v-else class="no_projects">
                    <p>No projects found</p>
                </div>
            </div>
            <div v-else class="project_list">
                <div v-if="searchResults.length > 0" class="post_wrapper">
                    <div v-if="!desktop" class="mobile_post_feed">
                        <!-- <MobileProjectCard class="mobile_project_card" v-for="searchResult in searchResults" :key="searchResult.id" :projectData="searchResult" :highlight_phrase="$refs.post_search.getSearchedPhrase()" /> -->
                        <LargeMobileProjectCard
                            v-for="searchResult in searchResults"
                            :key="searchResult.id"
                            :projectData="searchResult"
                            :highlight_phrase="searchPhrase"
                        />
                    </div>
                    <div v-else class="desktop_post_feed">
                        <!-- <DesktopProjectCard class="desktop_project_card" v-for="project in searchResults" :key="project.id" :projectData="project" width="70%" :highlight_phrase="$refs.post_search.getSearchedPhrase()" /> -->
                        <LargeDesktopProjectCard
                            v-for="searchResults in searchResults"
                            :key="searchResults.id"
                            :projectData="searchResults"
                            :highlight_phrase="searchPhrase"
                        />
                    </div>
                    <p v-if="!fetchedAllSearchResults" @click="loadNew()" class="load_more_btn">Load More</p>
                </div>
                <div v-else class="no_projects">
                    <p>No projects found</p>
                </div>
            </div>
        </div>
        <!-- Just a placeholder to add some space beneath the results even after the load more button is gone -->
        <div v-if="(showSearchResults && fetchedAllSearchResults) || (!fetchedAllSearchResults && rootComponent.fetchedAll)" style="height: 60px;" />
    </div>
</template>

<script>
import PostSearch from "@/components/SearchLogic/PostSearch.vue";
import Dropdown from "@/components/global/Dropdown.vue";
//import MobileProjectCard from "@/components/ProjectCard/MobileProjectCard.vue";
//import DesktopProjectCard from "@/components/ProjectCard/DesktopProjectCard.vue";
import LargeDesktopProjectCard from "@/components/ProjectCard/LargeDesktopProjectCard.vue";
import LargeMobileProjectCard from "@/components/ProjectCard/LargeMobileProjectCard.vue";
import DetailedDesktopProjCard from "@/components/ProjectCard/DetailedDesktopProjCard.vue";
import GeneralProperties from "@/mixins/general.mixin";

export default {
    data() {
        return {
            showSearchResults: false,
            searchResults: [],
            fetchedAllSearchResults: false,
            loading: false,
            searchPhrase: undefined,
        };
    },
    mixins: [GeneralProperties],
    props: {
        rootComponent: Object,

        // specifies whether to use desktop project cards, or mobile
        desktop: {
            type: Boolean,
            default: true,
        },

        title: String,
    },
    components: {
        PostSearch,
        Dropdown,
        //MobileProjectCard,
        //DesktopProjectCard,
        LargeDesktopProjectCard,
        LargeMobileProjectCard,
        DetailedDesktopProjCard,
    },
    mounted() {
        // don't need to destroy on destroyed() because its attached to an element and will get removed anyway
        this.$refs.scrollable_container.addEventListener('scroll', () => {
            this.$refs.post_search.closeMoreMenu();
        });
    },
    methods: {
        loadNew() {
            if (!this.showSearchResults) {
                this.rootComponent.getPosts();
            } else {
                this.$refs.post_search.loadMoreResults();
            }
        },
        updateSearchFilter(value) {
            if (!this.showSearchResults) {
                this.rootComponent.updateFilterDropdown(value);
            } else {
                this.rootComponent.updateFilterDropdown(value);
                this.$refs.post_search.updateFilter(value);
            }
        },
        updateSearchComponent(documents, fetchedAllSearched, closeResults) {
            this.fetchedAllSearchResults = fetchedAllSearched;
            this.searchResults = documents;

            if (closeResults) {
                this.showSearchResults = false;
            } else {
                this.showSearchResults = true;
            }
        },
        highlightCards(phrase) {
            this.searchPhrase = phrase;
        },
    },
};
</script>

<style scoped>
.title {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
}

.project_list {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.post_wrapper {
    width: 100%;
}

.mobile_post_feed {
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 500px;
}
.desktop_post_feed {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}

.filter_dropdown_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    margin-top: 50px;
    margin-bottom: 60px;
}
.filter_dropdown {
    font-size: 12px;
    width: 150px;
    margin: 20px auto 0px auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
}

.desktop_project_card {
    margin: 0px auto 25px auto;
    max-width: 750px;
    min-width: 400px;
    width: 100%;
}
.mobile_project_card {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
}

.no_projects {
    margin-top: 20px;
}

.posts_search_bar {
    margin: 0 auto 10px auto;
    max-width: 400px;
}

.load_more_btn {
    margin: 30px auto 30px auto;
    border-radius: 5px;
    padding: 10px;
    background-color: var(--main-accent);
    cursor: pointer;
    width: 200px;
    color: #fff;
}
.load_more_btn:hover {
    font-weight: bold;
    box-shadow: 0px 4px 20px var(--main-accent);
}
</style>

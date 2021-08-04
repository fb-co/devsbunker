// This contains localstorage management and server calls for searchbars and filters

const SearchUtilities = {
    // SAVED PROJECTS FILTER (used for both saved projects, and personal proejcts list)
    setSavedPostFilter: function(filter) {
        localStorage.setItem("savedPostFilter", filter);
        return localStorage.getItem("savedPostFilter");
    },
    getSavedPostFilter: function() {
        return localStorage.getItem("savedPostFilter") || this.setSavedPostFilter("Newest");
    },
    
    // EXPLORE POST FILTER
    setExplorePostFilter: function(filter) {
        localStorage.setItem("explore_post_filter", filter);
        return localStorage.getItem("explore_post_filter");
    },
    getExplorePostFilter: function() {
        return localStorage.getItem("explore_post_filter") || this.setExplorePostFilter("Newest");
    }
}

export default SearchUtilities;
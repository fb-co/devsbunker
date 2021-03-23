// This contains localstorage management and server calls for searchbars and filters

const SearchUtilities = {
    // SAVED PROJECTS FILTER
    setSavedPostFilter: function(filter) {
        localStorage.setItem("savedPostFilter", filter);
        return localStorage.getItem("savedPostFilter");
    },
    getSavedPostFilter: function() {
        return localStorage.getItem("savedPostFilter") || this.setSavedPostFilter("Newest");
    },

    // HOME POST FILTER
    // sets and returns the given filter
    setHomePostFilter: function(filter) {
        localStorage.setItem("home_post_filter", filter);
        return localStorage.getItem("home_post_filter");
    },
    getHomePostFilter: function() {
        return localStorage.getItem("home_post_filter") || this.setHomePostFilter("Newest");
    }
}

export default SearchUtilities;
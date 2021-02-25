// This contains localstorage management and server calls for searchbars and filters

const SearchUtilities = {
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
const CommonUtils = {
    renderUsername: function(username, maxLen) {
        console.log(maxLen);

        if (username.length > (maxLen || 25)) {
            return username.substring(0, (maxLen || 25)) + "...";
        } else {
            return username;
        }
    }
};

export default CommonUtils;
const CookiesService = {
    setCookie: function (cookieParser, cookieName, cookie) {
        cookieParser.set(cookieName, cookie);
    },
    getCookie: function (cookieParser, cookieName) {
        return {
            [cookieName]: cookieParser.get(cookieName),
        }
    },
};

export default CookiesService;
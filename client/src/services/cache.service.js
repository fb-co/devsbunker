//import { store } from "../store/store";

// this will be similar to graphqlService, however its for smaller and more specific queries that will be cached,
// It will also query the server just like graphqlService if something is not in the cache that is being requested

//const URL = process.env.VUE_APP_GRAPHQL_API;

const CacheService = {
    cacheName: "devsCache",

    // cache support is pushed into the store on refresh, but ill leave this in case we need it for some reason
    checkIfCacheIsSupported: function () {
        return "caches" in window;
    },
    /*
    getProfilePicLink: function(username) {
        const query = `
            query {
                user(username: "${username}") {
                    profile_pic
                }
            }
        `;

        return fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        }).then(async (res) => {
            if (store.getters.cacheIsSupported) {
                const cache = await caches.open("devsCache");
                cache.put(URL, res);
                cache.match(URL).then((result) => {
                    console.log("[CACHE] ", result.json());
                });
            }
            
            return res.json();
        }).catch(console.error);
    }
    */
};

export default CacheService;

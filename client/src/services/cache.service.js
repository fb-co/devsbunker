import { store } from "../store/store";

// this will be similar to graphqlService, however its for smaller and more specific queries that will be cached,
// It will also query the server just like graphqlService if something is not in the cache that is being requested

//const URL = process.env.VUE_APP_GRAPHQL_API;

const CacheService = {
    cacheName: "devsCache",

    // idk how efficient calling this on every query is, so let me know if you think we should move it somewhere more global
    checkIfCacheIsSupported: function() {
        return "caches" in window;
    },

    getProfilePicLink: function() {
        console.log(store.getters.cacheIsSupported);
        if (store.getters.cacheIsSupported) {
            console.log("HERE IS A PROFILE PIC LINK");
        }
    }
};

export default CacheService;


/* FOR REFRENCE
// CACHE TEST!!!
            let isCacheSupported = "caches" in window;
            console.log("is cache supported:", isCacheSupported);
            if (isCacheSupported) {
                //let cacheName = "devsCache";
                // just caching a google req

                const query = `
                    query {
                        user(username: "TheJak") {
                            email
                            liked_posts
                        }
                    }
                `;

                fetch("http://localhost:5000/graphql", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query }),
                }).then(async (res) => {
                    const cache = await caches.open("devsCache");
                    cache.put("http://localhost:5000/graphql", res);
                    cache.match("http://localhost:5000/graphql").then((result) => {
                        console.log("[CACHE] ", result.json());
                    });
                });
            }
            */
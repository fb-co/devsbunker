const URL = process.env.VUE_APP_GRAPHQL_API;

const GraphQLService = {
    fetchUserDetails: function(username) {
        const query = `
            query {
                person(username: "${username}") {
                    username
                    email
                    tag
                }
            }`;

        return fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        })
            .then((res) => res.json())
            .catch(console.error);
    },
};

export default GraphQLService;

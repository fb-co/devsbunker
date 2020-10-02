const URL = process.env.VUE_APP_GRAPHQL_API;

const GraphQLService = {
    // fields specify which fields you want to receive
    fetchUserDetails: function(username, fields) {
        const query = `
            query {
                user(username: "${username}") {
                    ${fields}
                }
            }
        `;

        return fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        })
            .then((res) => res.json())
            .catch(console.error);
    },

    signupUser: async function(username, email, password) {
        const mutation = `
            mutation {
                signupUser(username: "${username}", email: "${email}", password: "${password}") {
                    message
                    accessToken
                }
            }
        `;

        console.log(mutation);
        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });
            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },
};

export default GraphQLService;

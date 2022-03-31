// gql things related to the Verification process
const GraphQLVerificationService = {
    verifyUser: async function (userId, token) {
        const mutation = `
            mutation {
                verifyUser(userId: "${userId}", token: "${token}") {
                    success
                    message
                }
            }
        `;

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });

            const json = await res.json();

            return json;
        } catch (err) {
            return console.error(err);
        }
    },
    verifyUserDeletion: async function (userId, token) {
        const mutation = `
            mutation {
                verifyUserDeletion(userId: "${userId}", token: "${token}") {
                    success
                    message
                }
            }
        `;

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });

            const json = await res.json();

            return json;
        } catch (err) {
            return console.error(err);
        }
    },
    askForPasswordReset: async function (email) {
        const query = `
            query {
                askForPasswordReset(email: "${email}") {
                    userId
                    success
                    message
                    stacktrace
                }
            }
        `;

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ query }),
            });

            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },
    resendAskForPasswordReset: async function (user_id) {
        const query = `
            query {
                resendAskForPasswordReset(user_id: "${user_id}") {
                    success
                    message
                    stacktrace   
                }
            }
        `;
        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ query }),
            });

            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },
    resendAccountVerificationEmail: async function (userId) {
        const query = `
            query {
                resendAccountVerificationEmail(user_id: "${userId}") {
                    success
                }
            }
        `;

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ query: query }),
            });

            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },
};

export default GraphQLVerificationService;

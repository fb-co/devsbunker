// gql things related to the Verification process
const GraphQLVerificationService = {
    resendAccountVerificationEmail: async function (userId) {
        const query = `
            query {
                resendAccountVerificationEmail(user_id: "${userId}") {
                    success
                }
            }
        `;

        try {
            const res = await fetch(URL, {
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
            const res = await fetch(URL, {
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
            const res = await fetch(URL, {
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
};

export default GraphQLVerificationService;

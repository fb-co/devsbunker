// gql things related to Notifications
const GraphQLNotificationsService = {
    getAndReadNotifications: function (token) {
        const mutation = `
            mutation {
                getAndReadNotifications {
                    read
                    sender
                    message
                    type
                    target
                    timestamp
                }
            }
        `;

        try {
            return fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            })
                .then((res) => {
                    return res.json();
                })
                .catch(console.error);
        } catch (err) {
            return console.error(err);
        }
    },

    // This will only return the AMOUNT of unread notifications, the query after it will get the actual data for unread notifications
    getUnreadNotifications: function (token) {
        const query = `
            query {
                getUnreadNotifications {
                    amount
                }
            }
        `;

        try {
            return fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ query }),
            })
                .then((res) => {
                    return res.json();
                })
                .catch(console.error);
        } catch (err) {
            return console.error(err);
        }
    },

    // this query will get the actual data for notifications that are unread
    getUnreadNotificationsData: function (token) {
        const query = `
            query {
                getUnreadNotificationsData {
                    read
                    sender
                    message
                    type
                    target
                    timestamp
                }
            }
        `;

        try {
            return fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ query }),
            })
                .then((res) => {
                    return res.json();
                })
                .catch(console.error);
        } catch (err) {
            return console.error(err);
        }
    },
    // Not sure if we should require the access token for this action
    notifyUser: async function (userToNotify, notification) {
        const mutation = `
            mutation {
                notifyUser(userToNotify: "${userToNotify}", notification: "${notification}") {
                    success
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
            return res.json();
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

export default GraphQLNotificationsService;

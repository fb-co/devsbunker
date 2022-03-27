// gql things related to the User
import { store } from "../../store/store";

const GraphQLUserService = {
    fetchUserDetails: function (username, fields, requester) {
        const query = `
            query {
                user(username: "${username}", requester: "${requester}") {
                    ${fields}
                }
            }
        `;

        return fetch(process.env.VUE_APP_GRAPHQL_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        })
            .then((res) => res.json())
            .catch(console.error);
    },
    downloadUserData: function (token) {
        const query = `
            query {
                downloadUserData {
                    user {
                        liked_posts
                        profile_pic
                        followers
                        following
                        notifications {
                            read
                            type
                            target
                            timestamp
                        }
                        email
                        username
                    }
                    posts {
                        id
                        title
                        images {
                            ogname
                            dbname
                        }
                        author
                        tags
                        thumbnail
                        createdAt
                        collaborators
                        price
                        description
                        isLiked
                        isSaved
                        links
                        likeAmt
                        comments {
                            id
                            userId
                            payload
                            createdAt
                        }
                    }
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
                .then((res) => res.json())
                .catch(console.error);
        } catch (err) {
            return console.error(err);
        }
    },
    fetchPersonalDetails: function (token, fields) {
        const query = `
            query {
                getPersonalDetails {
                    ${fields}
                }
            }
        `;
        return fetch(process.env.VUE_APP_GRAPHQL_API, {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({ query }),
        })
            .then((res) => res.json())
            .catch((err) => console.error(err));
    },
    fetchUsers: function (sortMethod, lastUserId, lastUniqueField, fields, token) {
        const query = `
            query {
                getUsers(sortMethod: "${sortMethod}", lastUserId: "${lastUserId}", lastUniqueField: "${lastUniqueField}") {
                    users {
                        ${fields}
                    }
                    fetchedAll
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

    fetchUserByPartial: function (partialUsername, sortMethod, lastUserId, lastUniqueField, fields, token) {
        if (partialUsername != "") {
            const query = `
                query {
                    partialUser(partialUsername: "${partialUsername}", sortMethod: "${sortMethod}", lastUserId: "${lastUserId}", lastUniqueField: "${lastUniqueField}") {
                        users {
                            ${fields}
                        }
                        fetchedAll
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
        }
    },

    fetchUserById: function (id, fields) {
        const query = `
            query {
                getUserById(id: "${id}") {
                    ${fields}
                }
            }
        `;

        try {
            return fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
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
    followPerson: async function (token, person) {
        const mutation = `
            mutation {
                followPerson(person: "${person}") {
                    followerAmt
                    isFollowing
                }
            }
        `;

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });

            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },

    unfollowPerson: async function (token, person) {
        const mutation = `
            mutation {
                unfollowPerson(person: "${person}") {
                    followerAmt
                    isFollowing
                }
            }
        `;

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });

            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },
    updateUserDetails: async function (token, fields) {
        // solution: we are using a variable (used to pass complex objects as params) of type UpdateUserPayload (same as backend)
        const mutation = `
            mutation Update($fields: [UpdateUserPayload!]!) {
                updateUserDetails(fields: $fields) {
                    message
                    changedData {
                        field
                        newValue
                    }
                }
            }
        `;

        // defining variables which are later added to the request alongside the query
        const variables = {
            fields: fields,
        };

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    query: mutation,
                    variables: variables, // adding variables
                }),
            });
            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },
    signupUser: async function (username, email, password) {
        const mutation = `
            mutation {
                signupUser(username: "${username}", email: "${email}", password: "${password}") {
                    message
                    user_id
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

    loginUser: async function (id, password) {
        let query;

        if (/\S+@\S+\.\S+/.test(id)) {
            // testing if the provided identifier is an email or a username
            query = `
                query {
                    loginUser(email: "${id}", password: "${password}") {
                        message
                        accessToken
                    }
                }
            `;
        } else {
            query = `
                query {
                    loginUser(username: "${id}", password: "${password}") {
                        message
                        accessToken
                    }
                }
            `;
        }

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query }),
            });

            const json = await res.json();

            if (!json.errors) {
                store.dispatch("alertUser", { title: "Success", type: "success", msg: "Successfully logged in!" });
            }

            return json;
        } catch (err) {
            return console.error(err);
        }
    },
    logoutUser: async function () {
        const query = `
            query {
                logoutUser {
                    message
                }
            }
        `;

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query }),
            });

            // consuming json here because othwerwise we'd have to repeat the following code everywhere we wanted to logout
            const json = await res.json();

            return json;
        } catch (err) {
            return console.error(err);
        }
    },
    deleteUserAccount: async function (password, token) {
        let mutation = undefined;

        // if we dont receive a pwd it means that the user is a GitHub user
        if (password === null || password === undefined) {
            mutation = `
                mutation {
                    deleteAccount {
                        success
                        message
                        stacktrace
                    }
                }
            `;
        } else {
            mutation = `
                mutation {
                    deleteAccount(password: "${password}") {
                        success
                        message
                        stacktrace
                    }
                }
            `;
        }

        try {
            const res = await fetch(process.env.VUE_APP_GRAPHQL_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });

            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },
    resetPassword: async function (password, userId, token) {
        const mutation = `
            mutation {
                resetPassword(password: "${password}", userId: "${userId}", token: "${token}") {
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
                body: JSON.stringify({ query: mutation }),
            });

            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },
};

export default GraphQLUserService;

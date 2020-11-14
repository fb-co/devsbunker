import { store } from "../store/store";

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

    fetchUserPost: function(postId, postAuthor) {
        const query = `
            query {
                userPost(postId: "${postId}", postAuthor: "${postAuthor}") {
                    title
                    description
                    githubLink
                }
            }
        `;

        try {
            return fetch(URL, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query }),
            })
                .then((res) => res.json())
                .catch(console.error);
        } catch (err) {
            return console.log(err);
        }
    },

    // requester token is an optional parameter so that the like button will stay filled if you logged in and the post was liked by you
    fetchPostsByAuthor: function(author, requesterToken) {
        const query = `
            query {
                getPostsByAuthor(author: "${author}", requesterToken: "${requesterToken}") {
                    title
                    author
                    description
                    likeAmt
                    isLiked
                    bunkerTag
                    price
                    id
                }
            }
        `;

        try {
            return fetch(URL, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query }),
            })
                .then((res) => res.json())
                .catch(console.error);
        } catch (err) {
            return console.log(err);
        }
    },

    fetchSavedPosts: function(token) {
        const query = `
            query {
                getSavedPosts(token: "${token}") {
                    title
                    author
                    description
                    likeAmt
                    isLiked
                    bunkerTag
                    price
                    id
                }
            }
        `;

        try {
            return fetch(URL, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query }),
            })
                .then((res) => res.json())
                .catch(console.error);
        } catch (err) {
            return console.log(err);
        }
    },

    fetchPosts: function(sortMethod, token) {
        let query;
        // only request the isLiked and isSaved fields if the user is logged in and passes in the auth token
        if (token) {
            query = `
                query {
                    getPosts(sortingType: "${sortMethod}", token: "${token}") {
                        title
                        author
                        description
                        likeAmt
                        isSaved
                        isLiked
                        bunkerTag
                        price
                        id
                    }
                }
            `;
        } else {
            query = `
                query {
                    getPosts(sortingType: "${sortMethod}") {
                        title
                        author
                        description
                        likeAmt
                        bunkerTag
                        price
                        id
                    }
                }
            `;
        }

        try {
            return fetch(URL, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query }),
            })
                .then((res) => {
                    return res.json();
                })
                .catch(console.error);
        } catch (err) {
            return console.log(err);
        }
    },

    likePost: async function(token, postId) {
        const mutation = `
            mutation {
                likePost(token: "${token}", postId: "${postId}") {
                    likeAmt
                    isLiked
                }
            }
        `;

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });
            return res.json();
        } catch (err) {
            return console.log(err);
        }
    },

    unlikePost: async function(token, postId) {
        const mutation = `
            mutation {
                unlikePost(token: "${token}", postId: "${postId}") {
                    likeAmt
                    isLiked
                }
            }
        `;

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });
            return res.json();
        } catch (err) {
            return console.log(err);
        }
    },

    savePost: async function(token, postId) {
        const mutation = `
            mutation {
                savePost(token: "${token}", postId: "${postId}") {
                    id
                }
            }
        `;

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });
            return res.json();
        } catch (err) {
            return console.log(err);
        }
    },

    followPerson: async function(token, person) {
        const mutation = `
            mutation {
                followPerson(token: "${token}", person: "${person}") {
                    followers
                }
            }
        `;

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query: mutation }),
            });

            return res.json();
        } catch (err) {
            return console.log(err);
        }
    },

    createNewPost: async function(token, data) {
        const mutation = `
            mutation Update($data: makePostInput!) {
                makePost(token: "${token}", data: $data) {
                    id
                    title
                    author
                    description
                    thumbnail
                    links
                    collaborators
                    tags
                    bunkerTag
                    clip
                }
            }
        `;
        const variables = {
            data: data,
        };

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    query: mutation,
                    variables: variables,
                }),
            });
            return res.json();
        } catch (err) {
            return console.log(err);
        }
    },

    // updates the users db document
    updateUserDetails: async function(token, fields) {
        // solution: we are using a variable (used to pass complex objects as params) of type UpdateUserPayload (same as backend)
        const mutation = `
            mutation Update($fields: [UpdateUserPayload!]!) {
                updateUserDetails(token: "${token}", fields: $fields) {
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
            const res = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    query: mutation,
                    variables: variables, // adding variables
                }),
            });
            return res.json();
        } catch (err) {
            return console.log(err);
        }
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

    loginUser: async function(id, password) {
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
            const res = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query }),
            });
            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },

    logoutUser: async function() {
        const query = `
            query {
                logoutUser {
                    message
                }
            }
        `;

        store.commit("refreshAccessToken", null);
        store.commit("changeLoggedInState", false);

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ query }),
            });
            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },
};

export default GraphQLService;

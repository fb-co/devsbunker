import { store } from "../store/store";

const URL = process.env.VUE_APP_GRAPHQL_API;

const GraphQLService = {
    // fields specify which fields you want to receive (requester is username string of who is asking for these details)
    // TODO: move to gql.user.service.js
    fetchUserDetails: function (username, fields, requester) {
        const query = `
            query {
                user(username: "${username}", requester: "${requester}") {
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

    // TODO: move to gql.user.service.js
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
            return fetch(URL, {
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

    // TODO: move to gql.user.service.js
    fetchPersonalDetails: function (token, fields) {
        const query = `
            query {
                getPersonalDetails {
                    ${fields}
                }
            }
        `;
        try {
            return fetch(URL, {
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

    // filter is required, just put a string of 'none' if you want to search all posts
    // SEE THE MONGO QUERY TO UNDERSTAND WHAT userToFilter is for
    // TODO: move to gql.posts.service.js
    fetchPostsByPartial: function (partial_name, filter, userToFilter, sortingType, lastPostId, lastUniqueField, token) {
        if (partial_name != "") {
            const query = `
                query {
                    partial_post(partial_name: "${partial_name}", filter: "${filter}", userToFilter: "${userToFilter}", sortingType: "${sortingType}", lastPostId: "${lastPostId}", lastUniqueField: "${lastUniqueField}") {
                        posts { 
                            author
                            title
                            description
                            thumbnail
                            likeAmt
                            isSaved
                            isLiked
                            tags
                            links
                            price
                            createdAt
                            id
                        }
                        fetchedAll
                    }
                }
            `;

            return fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query }),
            })
                .then((res) => res.json())
                .catch(console.error);
        }
    },
    // TODO: move to gql.posts.service.js
    fetchTargetedPosts: function (lastPostId, lastUniqueField, token) {
        const query = `
            query {
                getTargetedPosts(lastPostId: "${lastPostId}", lastUniqueField: "${lastUniqueField}") {
                    posts {
                        title
                        author
                        description
                        thumbnail
                        likeAmt
                        isLiked
                        isSaved
                        tags
                        price
                        createdAt
                        id
                    }
                    fetchedAll
                }
            }
        `;

        try {
            return fetch(URL, {
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

    // TODO: move to gql.posts.service.js
    fetchPostById: function (postId, commentOffSet, fields, token) {
        const query = `
            query {
                getPostById(postId: "${postId}", commentOffSet: ${commentOffSet}) {
                    ${fields}
                }
            }
        `;

        try {
            return fetch(URL, {
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

    // TODO: move to gql.posts.service.js
    fetchUserPost: function (postId, postAuthor) {
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
            return console.error(err);
        }
    },

    // requester token is an optional parameter so that the like button will stay filled if you logged in and the post was liked by you
    // TODO: move to gql.posts.service.js
    fetchPostsByAuthor: function (author, lastPostId, lastUniqueField, filter, token) {
        // this may cause errors because we are just checking if something called token exists
        const query = `
            query {
                getPostsByAuthor(author: "${author}", lastPostId: "${lastPostId}", lastUniqueField: "${lastUniqueField}", filter: "${filter}") {
                    posts {
                        title
                        author
                        thumbnail
                        description
                        likeAmt
                        isLiked
                        isSaved
                        tags
                        price
                        id
                    }
                    fetchedAll
                }
            }
        `;

        try {
            return fetch(URL, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ query }),
            })
                .then((res) => res.json())
                .catch((err) => {
                    console.error(err);
                });
        } catch (err) {
            return console.error(err);
        }
    },

    // TODO: move to gql.posts.service.js
    fetchSavedPosts: function (lastPostId, lastUniqueField, filter, token) {
        const query = `
            query {
                getSavedPosts(lastPostId: "${lastPostId}", lastUniqueField: "${lastUniqueField}", filter: "${filter}") {
                    posts {
                        title
                        author
                        description
                        thumbnail
                        likeAmt
                        isLiked
                        isSaved
                        tags
                        price
                        id
                    }
                    fetchedAll
                }
            }
        `;

        try {
            return fetch(URL, {
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

    // TODO: move to gql.posts.service.js
    setCommonTags: async function (tags, token) {
        //console.log(tags);
        const mutation = `
            mutation Update($tags: [String]!) {
                setCommonTags(tags: $tags) {
                    tag
                    interactions
                    manuallyAdded
                }
            }
        `;

        // defining variables which are later added to the request alongside the query
        const variables = {
            tags: tags,
        };

        try {
            const res = await fetch(URL, {
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

    // TODO: move to gql.notifications.service.js
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
            return fetch(URL, {
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
    // TODO: move to gql.notifications.service.js
    getUnreadNotifications: function (token) {
        const query = `
            query {
                getUnreadNotifications {
                    amount
                }
            }
        `;

        try {
            return fetch(URL, {
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
    // TODO: move to gql.notifications.service.js
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
            return fetch(URL, {
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

    // TODO: move to gql.user.service.js
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
            return fetch(URL, {
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

    // TODO: move to gql.user.service.js
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
                return fetch(URL, {
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

    // TODO: move to gql.user.service.js
    fetchUserById: function (id, fields) {
        const query = `
            query {
                getUserById(id: "${id}") {
                    ${fields}
                }
            }
        `;

        try {
            return fetch(URL, {
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

    // TODO: move to gql.posts.service.js
    // enter lastPstId as zero if you havent fetched any yet, and -1 if they have all been fetched
    fetchPosts: function (sortMethod, lastPostId, lastUniqueField, token) {
        let query;
        // only request the isLiked and isSaved fields if the user is logged in and passes in the auth token
        if (token) {
            query = `
                query {
                    getPosts(sortingType: "${sortMethod}", lastPostId: "${lastPostId}", lastUniqueField: "${lastUniqueField}") {
                        posts {
                            title
                            author
                            thumbnail
                            description
                            likeAmt
                            isSaved
                            isLiked
                            tags
                            price
                            createdAt
                            id
                        }
                        fetchedAll
                    }
                }
            `;
        } else {
            query = `
                query {
                    getPosts(sortingType: "${sortMethod}", lastPostId: "${lastPostId}", lastUniqueField: "${lastUniqueField}") {
                        posts {
                            title
                            author
                            thumbnail
                            description
                            likeAmt
                            tags
                            price
                            createdAt
                            id
                        }
                        fetchedAll
                    }
                }
            `;
        }

        try {
            return fetch(URL, {
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

    //lastPostId is the id of the last fetched post
    // TODO: move to gql.posts.service.js
    loadMorePosts: function (lastPostId, token) {
        const query = `
            query {
                loadMorePosts(lastPostId: ${lastPostId}) {
                    posts {
                        title
                        author
                        images {
                            ogname
                            dbname
                        }
                        description
                        likeAmt
                        isSaved
                        isLiked
                        price
                        createdAt
                        id
                    }
                    fetchedAll
                }
            }
        `;

        try {
            return fetch(URL, {
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

    // TODO: move to gql.posts.service.js
    likePost: async function (token, postId) {
        const mutation = `
            mutation {
                likePost(postId: "${postId}") {
                    likeAmt
                    isLiked
                }
            }
        `;

        try {
            const res = await fetch(URL, {
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

    // TODO: move to gql.posts.service.js
    unlikePost: async function (token, postId) {
        const mutation = `
            mutation {
                unlikePost(postId: "${postId}") {
                    likeAmt
                    isLiked
                }
            }
        `;

        try {
            const res = await fetch(URL, {
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

    // TODO: move to gql.posts.service.js
    commentOnPost: async function (postId, comment, token) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const timestamp = new Date();
        const finalTimeStamp = monthNames[timestamp.getMonth()] + ", " + timestamp.getFullYear();

        const mutation = `
            mutation {
                commentOnPost(postId: "${postId}", comment: "${comment}", timestamp: "${finalTimeStamp}") {
                    id
                    userId
                    payload
                    replies {
                        reply
                        replier
                    }     
                    createdBy
                    createdAt
                }
            }
        `;

        try {
            const res = await fetch(URL, {
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
    // TODO: move to gql.posts.service.js
    replyToComment: async function (token, commentId, reply) {
        const mutation = `
            mutation {
                replyToComment(commentId: "${commentId}", reply: "${reply}") {
                    reply
                    replier
                }
            }
        `;

        try {
            const res = await fetch(URL, {
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

    // TODO: move to gql.posts.service.js
    savePost: async function (token, postId) {
        const mutation = `
            mutation {
                savePost(postId: "${postId}") {
                    isSaved
                    id
                }
            }
        `;

        try {
            const res = await fetch(URL, {
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
    // TODO: move to gql.posts.service.js
    unSavePost: async function (token, postId) {
        const mutation = `
            mutation {
                unSavePost(postId: "${postId}") {
                    success
                }
            }
        `;

        try {
            const res = await fetch(URL, {
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

    // TODO: move to gql.user.service.js
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
            const res = await fetch(URL, {
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

    // TODO: move to gql.user.service.js
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
            const res = await fetch(URL, {
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

    // TODO: move to gql.posts.service.js
    createNewPost: async function (token, data) {
        const mutation = `
            mutation Update($data: makePostInput!) {
                makePost(data: $data) {
                    id
                    title
                    author
                    description
                    thumbnail
                    images {
                        ogname
                        dbname
                    }
                    links
                    collaborators
                    tags
                    likes
                    likeAmt
                    createdAt
                    price
                    comments {
                        id
                        userId
                        payload
                        createdAt
                    }
                }
            }
        `;
        const variables = {
            data: data,
        };

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    query: mutation,
                    variables: variables,
                }),
            });

            return res.json();
        } catch (err) {
            return console.error(err);
        }
    },

    // updates the users db document
    // TODO: move to gql.user.service.js
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
            const res = await fetch(URL, {
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

    // TODO: move to gql.user.service.js
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

    // TODO: move to gql.notifications.service.js
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

    // TODO: move to gql.user.service.js
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
            const res = await fetch(URL, {
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

    // TODO: move to gql.user.service.js
    logoutUser: async function () {
        const query = `
            query {
                logoutUser {
                    message
                }
            }
        `;

        try {
            const res = await fetch(URL, {
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
    // TODO: move to gql.verification.service.js
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
    // TODO: move to gql.verification.service.js
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
    // TODO: move to gql.user.service.js
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
            const res = await fetch(URL, {
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
    // TODO: move to gql.posts.service.js
    deletePostbyId: async function (postId, token) {
        const mutation = `
            mutation {
                deletePost(postId: "${postId}") {
                    success
                    message
                    stacktrace
                }
            }
        `;

        try {
            const res = await fetch(URL, {
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
    // TODO: move to gql.verification.service.js
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
            const res = await fetch(URL, {
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
    // TODO: move to gql.verification.service.js
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
            const res = await fetch(URL, {
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
    // TODO: move to gql.verification.service.js
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
    // TODO: move to gql.user.service.js
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
            const res = await fetch(URL, {
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

export default GraphQLService;

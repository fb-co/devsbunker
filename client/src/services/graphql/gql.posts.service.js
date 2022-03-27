// gql things related to Posts
const GraphQLPostsService = {
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
};

export default GraphQLPostsService;

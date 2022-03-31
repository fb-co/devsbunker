/*
    Gives various functionality to projec cards, like saving it, liking it, etc.

    Precondition: The parent of this mixin needs to contain a post object named projectData
*/

import GraphQLPostsService from "@/services/graphql/gql.posts.service.js";

const projectCard = {
    methods: {
        savePost(id) {
            if (!this.$store.getters.accessToken) {
                this.$router.push("/login");
            } else {
                GraphQLPostsService.savePost(this.$store.getters.accessToken, id).then((savedPost) => {
                    if (!savedPost.errors) {
                        this.projectData.isSaved = savedPost.data.savePost.isSaved;

                        this.$store.dispatch("updatePost", {
                            id: id,
                            fieldsToUpdate: [{ field: "isSaved", newVal: savedPost.data.savePost.isSaved }],
                        }); // update post in cache
                    } else {
                        this.$store.dispatch("alertUser", { msg: savedPost.errors[0].message, type: "error", title: "Error" });
                    }
                });
            }
        },
        unsavePost(id) {
            GraphQLPostsService.unSavePost(this.$store.getters.accessToken, id).then((unSavedPost) => {
                if (!unSavedPost.errors) {
                    this.projectData.isSaved = false;
                    this.$store.dispatch("updatePost", {
                        id: id,
                        fieldsToUpdate: [{ field: "isSaved", newVal: unSavedPost.data.unSavePost.isSaved }],
                    }); // update post in cache
                } else {
                    this.$store.dispatch("alertUser", { msg: unSavedPost.errors[0].message, type: "error", title: "Error" });
                }
            });
        },
        likePost(id) {
            if (!this.$store.getters.accessToken) {
                this.$router.push("/login");
            } else {
                GraphQLPostsService.likePost(this.$store.getters.accessToken, id).then((res) => {
                    if (!res.errors) {
                        this.projectData.likeAmt = res.data.likePost.likeAmt;
                        this.projectData.isLiked = res.data.likePost.isLiked;

                        this.$store.dispatch("updatePost", {
                            id: id,
                            fieldsToUpdate: [
                                { field: "isLiked", newVal: res.data.likePost.isLiked },
                                { field: "likeAmt", newVal: res.data.likePost.likeAmt },
                            ],
                        }); // update post in cache
                    } else {
                        this.$store.dispatch("alertUser", { msg: res.errors[0].message, type: "error", title: "Error" });
                    }
                });
            }
        },
        unlikePost(id) {
            GraphQLPostsService.unlikePost(this.$store.getters.accessToken, id).then((res) => {
                if (!res.errors) {
                    this.projectData.likeAmt = res.data.unlikePost.likeAmt;
                    this.projectData.isLiked = res.data.unlikePost.isLiked;

                    this.$store.dispatch("updatePost", {
                        id: id,
                        fieldsToUpdate: [
                            { field: "isLiked", newVal: res.data.unlikePost.isLiked },
                            { field: "likeAmt", newVal: res.data.unlikePost.likeAmt },
                        ],
                    }); // update post in cache
                } else {
                    this.$store.dispatch("alertUser", { msg: res.errors[0].message, type: "error", title: "Error" });
                }
            });
        },
    },
};

export default projectCard;

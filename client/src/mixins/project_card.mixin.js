/*
    Gives various functionality to projec cards, like saving it, liking it, etc.

    Precondition: The parent of this mixin needs to contain a post object named projectData
*/

import GraphQLService from "@/services/graphql.service";

const projectCard = {
    methods: {
        savePost(id) {
            if (!this.$store.getters.accessToken) {
                this.$router.push("/login");
            }

            GraphQLService.savePost(this.$store.getters.accessToken, id).then((savedPost) => {
                console.log(savedPost);
                this.projectData.isSaved = savedPost.data.savePost;
            });
        },
        unsavePost(id) {
            GraphQLService.unSavePost(this.$store.getters.accessToken, id).then((unSavedPost) => {
                if (unSavedPost.data.unSavePost) {
                    this.projectData.isSaved = false;
                }
            });
        },
        likePost(id) {
            if (!this.$store.getters.accessToken) {
                this.$router.push("/login");
            }

            GraphQLService.likePost(
                this.$store.getters.accessToken,
                id
            ).then((res) => {
                console.log(res);
                if (res.data.likePost) {
                    this.projectData.likeAmt = res.data.likePost.likeAmt;
                    this.projectData.isLiked = res.data.likePost.isLiked;
                    //GraphQLService.notifyUser()
                } else {
                    // add a message here that you already liked the post
                }  
            });
        },
        unlikePost(id) {
            GraphQLService.unlikePost(
                this.$store.getters.accessToken,
                id
            ).then((res) => {
                console.log(res);
                this.projectData.likeAmt = res.data.unlikePost.likeAmt;
                this.projectData.isLiked = res.data.unlikePost.isLiked;
            });
        }
    }
};

export default projectCard;
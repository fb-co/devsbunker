/*
    Gives various functionality to projec cards, like saving it, liking it, etc.

    Precondition: The parent of this mixin needs to contain a post object named projectData
*/

import GraphQLService from "@/services/graphql.service";

const projectCard = {
    methods: {
        savePost(id) {
            GraphQLService.savePost(this.$store.getters.accessToken, id).then((savedPost) => {
                console.log(savedPost);
                this.projectData.isSaved = savedPost.data.savePost ? true : false;
            });
        },
        likePost(id) {
            GraphQLService.likePost(
                this.$store.getters.accessToken,
                id
            ).then((res) => {
                if (res.data.likePost) {
                    console.log(this.projectData);
                    this.projectData.likeAmt = res.data.likePost.likeAmt;
                    this.projectData.isLiked = res.data.likePost.isLiked;
                } else {
                    // add a message here that you already liked the post
                }  
            });
        },
    }
};

export default projectCard;
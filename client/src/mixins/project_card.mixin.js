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
            });
        },
        likePost(id) {
            GraphQLService.likePost(
                this.$store.getters.accessToken,
                id
            ).then((res) => {
                if (res.data.likePost) {
                    console.log(res.data.likePost);
                    this.projectData.likeAmt = res.data.likePost.likeAmt;
                } else {
                    // add a message here that you already liked the post
                }  
            });
        },
    }
};

export default projectCard;
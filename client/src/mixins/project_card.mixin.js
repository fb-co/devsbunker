/*
    Gives various functionality to projec cards, like saving it, liking it, etc.
*/
import GraphQLService from "@/services/graphql.service";

const projectCard = {
    methods: {
        saveProject(id) {
            GraphQLService.savePost(this.$store.getters.accessToken, id).then((savedPost) => {
                console.log(savedPost);
            });
        }
    }
};

export default projectCard;
import GraphQLService from "@/services/graphql.service";

const userCard = {
    methods: {
        followUser(username) {
            GraphQLService.followPerson(this.$store.getters.accessToken, username).then((newFollowers) => {
                if (newFollowers.data.followPerson) {
                    this.cardData.followerAmt = newFollowers.data.followPerson.followers;
                }
            });
        }
    }
};

export default userCard;
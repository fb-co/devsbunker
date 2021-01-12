import GraphQLService from "@/services/graphql.service";

const userCard = {
    methods: {
        followUser(username) {
            GraphQLService.followPerson(this.$store.getters.accessToken, username).then((newFollowers) => {
                if (newFollowers.data.followPerson) {
                    this.cardData.followerAmt = newFollowers.data.followPerson.followerAmt;
                    this.cardData.isFollowing = newFollowers.data.followPerson.isFollowing;
                }
            });
        },
        unfollowUser(username) {
            GraphQLService.unfollowPerson(this.$store.getters.accessToken, username).then((newFollowers) => {
                if (newFollowers.data.unfollowPerson) {
                    this.cardData.followerAmt = newFollowers.data.unfollowPerson.followerAmt;
                    this.cardData.isFollowing = newFollowers.data.unfollowPerson.isFollowing;
                }
            });    
        }
    }
};

export default userCard;
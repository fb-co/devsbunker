import GraphQLService from "@/services/graphql.service";

const userCard = {
    methods: {
        followUser(username) {
            GraphQLService.followPerson(this.$store.getters.accessToken, username).then((newFollowers) => {
                if (newFollowers.data.followPerson) {
                    this.authorData.followerAmt = newFollowers.data.followPerson.followerAmt;
                    this.authorData.isFollowing = newFollowers.data.followPerson.isFollowing;
                }
            });
        },
        unfollowUser(username) {
            GraphQLService.unfollowPerson(this.$store.getters.accessToken, username).then((newFollowers) => {
                if (newFollowers.data.unfollowPerson) {
                    this.authorData.followerAmt = newFollowers.data.unfollowPerson.followerAmt;
                    this.authorData.isFollowing = newFollowers.data.unfollowPerson.isFollowing;
                }
            });    
        }
    }
};

export default userCard;
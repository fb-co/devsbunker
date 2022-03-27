import GraphQLUserService from "@/services/graphql/gql.user.service.js";

const userCard = {
    methods: {
        followUser(username) {
            GraphQLUserService.followPerson(this.$store.getters.accessToken, username).then((newFollowers) => {
                if (newFollowers.data.followPerson) {
                    this.authorData.followerAmt = newFollowers.data.followPerson.followerAmt;
                    this.authorData.isFollowing = newFollowers.data.followPerson.isFollowing;
                }
            });
        },
        unfollowUser(username) {
            GraphQLUserService.unfollowPerson(this.$store.getters.accessToken, username).then((newFollowers) => {
                if (newFollowers.data.unfollowPerson) {
                    this.authorData.followerAmt = newFollowers.data.unfollowPerson.followerAmt;
                    this.authorData.isFollowing = newFollowers.data.unfollowPerson.isFollowing;
                }
            });
        },
    },
};

export default userCard;

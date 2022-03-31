import GraphQLUserService from "@/services/graphql/gql.user.service.js";

const LoadMore = {
    data() {
        return {
            users: [],
            usersInMemory: [],
            sortingType: "Most Popular",
            fetchedAll: false,
            otherData: {}, // add any other data the mixing might need for a specific case here
        };
    },
    methods: {
        async fetchUsers() {
            const res = await GraphQLUserService.fetchUsers(
                this.sortingType,
                this.getLastUserId(),
                this.getLastUserUniqueField(),
                ["id", "username", "desc", "followerAmt", "followingAmt", "isFollowing"], // requesting only these fields
                this.$store.getters.accessToken
            );
            this.users = this.users.concat(res.data.getUsers.users);
            this.fetchedAll = res.data.getUsers.fetchedAll;
        },

        // misc functions
        getLastUserId() {
            return this.users.length > 0 ? this.users[this.users.length - 1].id : 0;
        },

        getLastUserUniqueField() {
            return this.users.length > 0 ? this.users[this.users.length - 1].followers : -1;
        },
    },
};

export default LoadMore;

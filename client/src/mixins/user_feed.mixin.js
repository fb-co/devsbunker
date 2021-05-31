import GraphQLService from "@/services/graphql.service";

const LoadMore = {
    data() {
        return {
            users: [],
            usersInMemory: [],
            sortingType: null,
            fetchedAll: false,
            otherData: {}, // add any other data the mixing might need for a specific case here
        }
    },
    methods: {
        async fetchUsers() {
            const res = GraphQLService.fetchUsers(this.sortingType, this.getLastUserId())
        },


        // misc functions
        getLastUserId() {
            return this.users.length > 0 ? this.users[this.users.length - 1].id : 0;
        },
        /*
        getLastPostUniqueField() {
            return this.users.length > 0 ? this.users[this.users.length - 1].likeAmt : -1;
        },
        */
    }
};
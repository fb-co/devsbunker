import graphql from "graphql";
const { GraphQLString } = graphql;

import UserType from "../user.type.js";
import User from "../../../components/user/user.model.js";

const signup = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },

    resolve: (root, args) => {
        const user = new User({
            username: args.username,
            email: args.email,
            password: args.password,
        });

        // save to db
        // how to respond with cookies?!?!?!

        return user;
    },
};

export default signup;

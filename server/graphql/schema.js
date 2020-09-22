import User from "../components/user/user.model.js"; // the db

import graphql from "graphql";
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;


// DB Communication Methods

async function getUserEntry(name) {
    const userEntry = await User.findOne({ username: name }).then((user) => {
        if (user) {
            //console.log(user); // Its finding the user entry just fine, but the promise in the resolver is not receiving it for some reason
            return user;
        }
    }).catch((err) => {
        console.log(err)
    });
    // Not sure how to handle the error since this function isnt really middleware
}

// Graphql Endpoints

const PersonType = new GraphQLObjectType({
    name: "Person",
    description: "...",

    fields: () => ({
        username: {
            type: GraphQLString,
            resolve: (person) => person.username,
        },
        email: {
            type: GraphQLString,
            resolve: (person) => person.email,
        },
        tag: {
            type: GraphQLString,
            resolve: (person) => person.tag,
        }
    }),
});
const QueryType = new GraphQLObjectType({
    name: "Query",
    description: "...",

    fields: () => ({
        person: {
            type: PersonType,
            args: {
                username: { type: GraphQLString },
            },
            resolve: (root, args) => {                
                /*
                let person = {
                    username: args.username,
                    email: undefined,
                    tag: undefined
                };

                const userFromDb = getUserEntry(args.username).then((user) => {
                    person.email = "PHUCC THIS";
                    //person.email = user.email,
                    //person.tag = user.tag;
                    console.log(user);
                }).catch((err) => {
                    console.log(err);
                });
                */
                
                // WHY IS USER UNDEFINED ?!?!?!!?!?!?!??! (IV tried putting return statement inside then block)
                // THIS IS GIVING ME CRIPPLING ANXIETY
                const result = getUserEntry(args.username).then((user) => {
                    console.log(result);  
                }).catch((err) => {
                    console.log(err);
                });
                return result;
            },
        },
    }),
});

export default new GraphQLSchema({
    query: QueryType,
});

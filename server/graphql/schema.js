import User from "../components/user/user.model.js"; // the db

import graphql from "graphql";
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;


// DB Communication Methods

// gets user document from db with a username parameter, we could also make another for the id if you want
async function getUserEntry(name) {
    return new Promise(resolve => {
        User.findOne({ username: name }).then((user) => {
            resolve(user)
        }).catch((err) => {
            console.log(err)
        });
    });    
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
                /* I think its because before I was returning the result of the promise in 'getUserEntry()' while now I literally return a promise and just call the promise */

                return getUserEntry(args.username);
            },
        },
    }),
});

export default new GraphQLSchema({
    query: QueryType,
});

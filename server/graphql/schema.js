const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const PersonType = new GraphQLObjectType({
    name: "Person",
    description: "...",

    fields: () => ({
        firstName: {
            type: GraphQLString,
            resolve: (person) => person.firstName,
        },
    }),
});
const QueryType = new GraphQLObjectType({
    name: "Query",
    description: "...",

    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: { type: GraphQLString },
            },
            resolve: (root, args) => {
                let person = { firstName: undefined };
                if (args.id === "1") {
                    person.firstName = "Jacopo";
                } else if (args.id === "2") {
                    person.firstName = "Leonardo";
                }

                return person;
            },
        },
    }),
});

module.exports = new GraphQLSchema({
    query: QueryType,
});

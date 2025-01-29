import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { User } from "./user";

const createApolloGraphQLServer = async () => {
    const apolloServer = new ApolloServer({
        typeDefs: `
            ${User.typedef}
            type Query {
                ${User.queries}
            }

            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        }
    })

    await apolloServer.start();
    return apolloServer;
}

export default createApolloGraphQLServer;
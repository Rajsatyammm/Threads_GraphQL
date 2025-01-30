import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { User } from "./user";
import { Post } from "./post";

const createApolloGraphQLServer = async () => {
    const apolloServer = new ApolloServer({
        typeDefs: `
            ${User.typedef}
            ${Post.typedef}
            type Query {
                ${User.queries}
                ${Post.queries}
            }

            type Mutation {
                ${User.mutations}
                ${Post.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Post.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Post.resolvers.mutations
            }
        }
    })

    await apolloServer.start();
    return apolloServer;
}

export default createApolloGraphQLServer;
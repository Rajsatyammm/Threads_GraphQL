import express from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { config } from 'dotenv';

config();

const PORT: number = Number(process.env.PORT) || 4000;

async function initServer() {
    const app = express();

    app.use(express.json());

    const apolloServer = new ApolloServer({
        typeDefs: `
            type User {
                id: ID
                name: String
                rollNo: Int
            }

            type Query {
                users: [User]
            }

            type Query {
                sayHello(name: String): String
                hello: Int
            }
        `,
        resolvers: {
            Query: {
                hello: () => 2,
                sayHello: (_, { name }: { name: string }) => `Hello ${name} how are you`
            },
        }
    })

    await apolloServer.start();

    app.use('/graphql', expressMiddleware(apolloServer))

    app.listen(PORT, () => console.log(`Server running at PORT :: ${PORT}`))
}

initServer();
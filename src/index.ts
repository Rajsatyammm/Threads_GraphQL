import { expressMiddleware } from "@apollo/server/express4";
import { config } from 'dotenv';
import express from 'express';
import createApolloGraphQLServer from './graphql';

config();

const PORT: number = Number(process.env.PORT) || 5000;

async function initServer() {
    const app = express();

    app.use(express.json());

    app.use('/graphql', expressMiddleware(await createApolloGraphQLServer()))

    app.listen(PORT, () => console.log(`Server running at PORT :: ${PORT}`))
}

initServer();
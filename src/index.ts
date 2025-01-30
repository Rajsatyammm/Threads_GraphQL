import { expressMiddleware } from "@apollo/server/express4";
import { config } from 'dotenv';
import express from 'express';
import createApolloGraphQLServer from './graphql';
import UserService from "./service/user.service";

config();

const PORT: number = Number(process.env.PORT) || 5000;

const returnToken = async ({ req }: any) => {
    try {
        const token = req.headers.authorization;
        if (!token)
            throw new Error('token not found');
        const user = UserService.verifyJwtToken(token);
        return { user };
    } catch (e) {
        return {};
    }
}

async function initServer() {
    const app = express();

    app.use(express.json());

    app.use('/graphql', expressMiddleware(await createApolloGraphQLServer(), {
        context: returnToken
    }))

    app.listen(PORT, () => console.log(`Server running at PORT :: ${PORT}`))
}

initServer();
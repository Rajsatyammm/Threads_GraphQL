import UserService, { GetUserTokenPayload } from "../../service/user.service";
import { CreateUserPayload } from "../../service/user.service";

export const queries = {
    sayHello: (_: any, { name }: { name: string }) => `Hello ${name} how are you`,
    getUserToken: async (_: any, payload: GetUserTokenPayload) => {
        return await UserService.getUserToken(payload);
    },
    getCurrentLoggedInUser: (_: any, param: any, context: any) => {
        if (context)
            return UserService.getUserById(context.user.id);
        throw new Error("error occured")
    }
};
export const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        try {
            return await UserService.createUser(payload);
        } catch (e) {
            return `error occured ${e}`;
        }
    }
};

export const resolvers = { queries, mutations };
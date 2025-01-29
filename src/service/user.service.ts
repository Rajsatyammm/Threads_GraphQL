import { createHmac, randomBytes } from 'crypto';
import prismaClient from '../lib/db';
import Jwt from 'jsonwebtoken';

const JWT_SECRET: string = String(process.env.JWT_SECRET);

export interface CreateUserPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface GetUserTokenPayload {
    email: string,
    password: string
}

class UserService {

    private static generateHashPassword(salt: string, password: string) {
        return createHmac("sha256", salt).update(password).digest('hex');
    }

    public static async createUser(payload: CreateUserPayload) {
        try {
            const { firstName, lastName, email, password } = payload;
            const salt = randomBytes(32).toString('hex');
            const hashedPassword = UserService.generateHashPassword(salt, password);
            const user = await prismaClient.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    salt
                }
            });
            return `user added with id : ${user.id}`;
        } catch (e) {
            throw new Error('Something error occured');
        }
    }

    private static async getUserByEmail(email: string) {
        return await prismaClient.user.findUnique({ where: { email } })
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user)
            throw new Error(`User not found with email - ${email}`);
        const hashedPassword = UserService.generateHashPassword(user.salt, password);
        if (hashedPassword !== user.password)
            throw new Error(`Password does not match`);
        return Jwt.sign({ id: user.id, email: email }, JWT_SECRET);
    }
}

export default UserService;
import prismaClient from "../lib/db"

export interface CreatePostPayload {
    content: string,
    userId: string
}

export interface UpdatePostPayload {
    postId: string,
    content: string,
}


class PostService {
    public static async createPost(payload: CreatePostPayload) {
        const { content, userId } = payload
        try {
            return await prismaClient.post.create({
                data: {
                    content,
                    userId
                }
            })
        } catch (e) {
            throw new Error('Error while creating post');
        }
    }

    public static async updatePost(payload: UpdatePostPayload) {
        const { postId, content } = payload
        try {
            return await prismaClient.post.update({
                where: { postId: postId },
                data: { content }
            })
        } catch (e) {
            throw new Error('Error while updating post');
        }
    }
}

export default PostService;
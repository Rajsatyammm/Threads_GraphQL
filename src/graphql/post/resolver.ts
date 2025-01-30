import PostService, { CreatePostPayload, UpdatePostPayload } from "../../service/post.service"

const queries = {}

const mutations = {
    createPost: async (_: any, { postId, content }: { postId: string; content: string }, context: any) => {
        const payload: CreatePostPayload = {
            content: content,
            userId: context.user.id
        }
        const post = await PostService.createPost(payload);
        return post.postId;
    },
    updatePost: async (_: any, { content }: { content: string }, context: any) => {
        const payload: UpdatePostPayload = {
            content: content,
            postId: context.user.id
        }
        const updatedPost = await PostService.updatePost(payload)
        return updatedPost.postId;
    }
}

export const resolvers = { queries, mutations }
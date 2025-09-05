import { FastifyRequest, FastifyReply } from 'fastify';
import { PostsRetrievalError } from '@/use-cases/errors/post-retrieval-error';
import { makeGetAllPostsUseCase } from '@/use-cases/factories/posts/make-get-all-posts-use-case';

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllPostsUseCase = makeGetAllPostsUseCase();

    const { posts } = await getAllPostsUseCase.execute();

    return reply.status(200).send(posts);
  } catch (err) {
    if (err instanceof PostsRetrievalError) {
        return reply.status(500).send({ error: err.message });
    }

    throw err;
 }
}
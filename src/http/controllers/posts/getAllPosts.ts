import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository';
import { GetAllPostsUseCase } from '@/use-cases/posts/get-all-posts-use-case';
import { PostsRetrievalError } from '@/use-cases/errors/post-retrieval-error';

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
  try {
    const postsRepository = new PrismaPostsRepository();
    const getAllPostsUseCase = new GetAllPostsUseCase(postsRepository);

    const { posts } = await getAllPostsUseCase.execute();

    return reply.status(200).send(posts);
  } catch (err) {
    if (err instanceof PostsRetrievalError) {
        return reply.status(500).send({ error: err.message });
    }

    throw err;
 }
}
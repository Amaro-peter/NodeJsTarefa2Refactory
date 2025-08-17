import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository';
import { GetUserPostsUseCase } from '@/use-cases/posts/get-user-posts-use-case';
import { PostsRetrievalError } from '@/use-cases/errors/post-retrieval-error';

export async function getUserPosts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserPostsParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = getUserPostsParamsSchema.parse(request.params);

  try {
    const postsRepository = new PrismaPostsRepository();
    const getUserPostsUseCase = new GetUserPostsUseCase(postsRepository);

    const { posts } = await getUserPostsUseCase.execute({ userId });

    return reply.status(200).send(posts);
  } catch (err) {
    if (err instanceof PostsRetrievalError) {
        return reply.status(500).send({ error: err.message });
    }
  }
}
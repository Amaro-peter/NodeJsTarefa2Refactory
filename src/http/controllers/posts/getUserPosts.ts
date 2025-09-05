import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PostsRetrievalError } from '@/use-cases/errors/post-retrieval-error';
import { makeGetUserPostUseCase } from '@/use-cases/factories/posts/make-get-user-post-use-case';
export async function getUserPosts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserPostsParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = getUserPostsParamsSchema.parse(request.params);

  try {
    const getUserPostsUseCase = makeGetUserPostUseCase();

    const { posts } = await getUserPostsUseCase.execute({ userId });

    return reply.status(200).send(posts);
  } catch (err) {
    if (err instanceof PostsRetrievalError) {
        return reply.status(500).send({ error: err.message });
    }
  }
}
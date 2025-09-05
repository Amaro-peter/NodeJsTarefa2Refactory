import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository';
import { DeletePostUseCase } from '@/use-cases/posts/delete-posts-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { InvalidCrendentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeDeletePostsUseCase } from '@/use-cases/factories/posts/make-delete-posts-use-case';

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  const deletePostParamsSchema = z.object({
    postId: z.string().uuid(),
  });

  const { postId } = deletePostParamsSchema.parse(request.params);

  try {
    const deletePostUseCase = makeDeletePostsUseCase();

    await deletePostUseCase.execute({
      postId,
      authorId: request.user.sub,
    });
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ error: err.message });
    }

    if(err instanceof InvalidCrendentialsError) {
        return reply.status(403).send({ error: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
}
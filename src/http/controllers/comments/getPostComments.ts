import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository';
import { GetPostCommentsUseCase } from '@/use-cases/comments/get-post-comments-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function getPostComments(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPostCommentsParamsSchema = z.object({
    postId: z.string().uuid(),
  });

  const { postId } = getPostCommentsParamsSchema.parse(request.params);

  try {
    const commentsRepository = new PrismaCommentsRepository();
    const getPostCommentsUseCase = new GetPostCommentsUseCase(
      commentsRepository
    );

    const { comments } = await getPostCommentsUseCase.execute({ postId });

    return reply.status(200).send(comments);
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
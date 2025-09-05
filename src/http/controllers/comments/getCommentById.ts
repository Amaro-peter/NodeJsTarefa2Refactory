import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetCommentByIdUseCase } from '@/use-cases/comments/get-comment-by-id-use-case';
import { makeGetCommentByIdUseCase } from '@/use-cases/factories/comments/make-get-comment-by-id-use-case';

export async function getCommentById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getCommentByIdParamsSchema = z.object({
    commentId: z.string().uuid(),
  });

  const { commentId } = getCommentByIdParamsSchema.parse(request.params);

  try {
    const getCommentByIdUseCase = makeGetCommentByIdUseCase();

    const { comment } = await getCommentByIdUseCase.execute({ commentId });

    return reply.status(200).send(comment);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
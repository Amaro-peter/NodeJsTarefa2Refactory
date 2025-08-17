import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository';
import { DeleteCommentUseCase } from '@/use-cases/comments/delete-comment-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { InvalidCrendentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
  const deleteCommentParamsSchema = z.object({
    commentId: z.string().uuid(),
  });

  const { commentId } = deleteCommentParamsSchema.parse(request.params);

  try {
    const commentsRepository = new PrismaCommentsRepository();
    const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository);

    await deleteCommentUseCase.execute({
      commentId,
      authorId: request.user.sub,
    });
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message });
    }
    if(err instanceof InvalidCrendentialsError) {
        return reply.status(401).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
}
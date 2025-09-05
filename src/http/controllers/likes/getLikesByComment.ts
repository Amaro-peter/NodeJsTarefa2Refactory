import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetLikesByCommentUseCase } from '@/use-cases/factories/likes/make-get-likes-by-comment-use-case';

export async function getLikesByComment(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getLikesByCommentParamsSchema = z.object({
    commentId: z.string().uuid(),
  });

  const { commentId } = getLikesByCommentParamsSchema.parse(request.params);

  try {
    const getLikesByCommentUseCase = makeGetLikesByCommentUseCase();

    const { likes } = await getLikesByCommentUseCase.execute({ commentId });

    return reply.status(200).send(likes);
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message ?? 'Recurso não encontrado.' });
    }
  }
}
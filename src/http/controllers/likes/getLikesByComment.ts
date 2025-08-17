import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository';
import { GetLikesByCommentUseCase } from '@/use-cases/likes/get-likes-by-comment-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function getLikesByComment(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getLikesByCommentParamsSchema = z.object({
    commentId: z.string().uuid(),
  });

  const { commentId } = getLikesByCommentParamsSchema.parse(request.params);

  try {
    const likesRepository = new PrismaLikesRepository();
    const getLikesByCommentUseCase = new GetLikesByCommentUseCase(
      likesRepository
    );

    const { likes } = await getLikesByCommentUseCase.execute({ commentId });

    return reply.status(200).send(likes);
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message ?? 'Recurso não encontrado.' });
    }
  }
}
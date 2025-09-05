import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetLikesByIdUseCase } from '@/use-cases/factories/likes/make-get-likes-by-id-use-case';

export async function getLikeById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getLikeByIdParamsSchema = z.object({
    likeId: z.string().uuid(),
  });

  const { likeId } = getLikeByIdParamsSchema.parse(request.params);

  try {
    const getLikeByIdUseCase = makeGetLikesByIdUseCase();

    const { like } = await getLikeByIdUseCase.execute({ likeId });

    return reply.status(200).send(like);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
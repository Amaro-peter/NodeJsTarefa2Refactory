import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetLikeByIdUseCase } from '@/use-cases/likes/get-like-by-id-use-case';

export async function getLikeById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getLikeByIdParamsSchema = z.object({
    likeId: z.string().uuid(),
  });

  const { likeId } = getLikeByIdParamsSchema.parse(request.params);

  try {
    const likesRepository = new PrismaLikesRepository();
    const getLikeByIdUseCase = new GetLikeByIdUseCase(likesRepository);

    const { like } = await getLikeByIdUseCase.execute({ likeId });

    return reply.status(200).send(like);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
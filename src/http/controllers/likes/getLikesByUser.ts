import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository';
import { GetLikesByUserUseCase } from '@/use-cases/likes/get-likes-by-user-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetLikesByUserUseCase } from '@/use-cases/factories/likes/make-get-likes-by-user-use-case';

export async function getLikesByUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getLikesByUserParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = getLikesByUserParamsSchema.parse(request.params);

  try {
    const getLikesByUserUseCase = makeGetLikesByUserUseCase();

    const { likes } = await getLikesByUserUseCase.execute({ userId });

    return reply.status(200).send(likes);
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message ?? 'Recurso não encontrado.' });
    }
    throw err;
  }
}
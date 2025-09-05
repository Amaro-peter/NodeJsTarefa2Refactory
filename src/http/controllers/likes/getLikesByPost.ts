import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository';
import { GetLikesByPostUseCase } from '@/use-cases/likes/get-likes-by-post-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetLikesByPostUseCase } from '@/use-cases/factories/likes/make-get-likes-by-post-use-case';

export async function getLikesByPost(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getLikesByPostParamsSchema = z.object({
    postId: z.string().uuid(),
  });

  const { postId } = getLikesByPostParamsSchema.parse(request.params);

  try {
    const getLikesByPostUseCase = makeGetLikesByPostUseCase();

    const { likes } = await getLikesByPostUseCase.execute({ postId });

    return reply.status(200).send(likes);
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message ?? 'Recurso não encontrado.' });
    }

    throw err;
  }
}
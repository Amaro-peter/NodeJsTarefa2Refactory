import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository';
import { DeleteLikeUseCase } from '@/use-cases/likes/delete-like-use-case';
import { DeleteLikeError } from '@/use-cases/errors/delete-like-error';
import { InvalidCrendentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function deleteLikes(request: FastifyRequest, reply: FastifyReply) {
  const deleteLikeParamsSchema = z.object({
    likeId: z.string().uuid(),
  });

  const { likeId } = deleteLikeParamsSchema.parse(request.params);

  try {
    const likesRepository = new PrismaLikesRepository();
    const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository);

    await deleteLikeUseCase.execute({
      likeId,
      authorId: request.user.sub,
    });
  } catch (err) {
    if(err instanceof DeleteLikeError) {
        return reply.status(404).send({ message: err.message ?? 'Like não encontrado.' });
    }

    if(err instanceof InvalidCrendentialsError) {
        return reply.status(401).send({ message: err.message ?? 'Credenciais inválidas.' });
    }

    throw err;
  }

  return reply.status(204).send();
}
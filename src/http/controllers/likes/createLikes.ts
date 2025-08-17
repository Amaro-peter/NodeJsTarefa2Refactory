import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository';
import { CreateLikeUseCase } from '@/use-cases/likes/create-like-use-case';
import { CreateLikeError } from '@/use-cases/errors/create-like-error';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createLikeBodySchema = z.object({
    postId: z.string().uuid().optional(),
    commentId: z.string().uuid().optional(),
  });

  const { postId, commentId } = createLikeBodySchema.parse(request.body);

  try {
    const likesRepository = new PrismaLikesRepository();
    const createLikeUseCase = new CreateLikeUseCase(likesRepository);

    await createLikeUseCase.execute({
      ...(postId !== undefined && { postId }),
      ...(commentId !== undefined && { commentId }),
      authorId: request.user.sub,
    });

} catch (err) {
    if(err instanceof CreateLikeError) {
        return reply.status(400).send({ message: err.message ?? 'Erro ao criar o like.' });
    }
  }

  return reply.status(201).send();
}
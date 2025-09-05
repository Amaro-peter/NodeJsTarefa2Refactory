import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository';
import { CreateCommentUseCase } from '@/use-cases/comments/create-comment-use-case';
import { CreateCommentError } from '@/use-cases/errors/create-comment-error';
import { makeCreateCommentUseCase } from '@/use-cases/factories/comments/make-create-comment-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCommentBodySchema = z.object({
    conteudo: z.string(),
    postId: z.string().uuid(),
  });

  const { conteudo, postId } = createCommentBodySchema.parse(request.body);

  try {
    const createCommentUseCase = makeCreateCommentUseCase();

    const comment = await createCommentUseCase.execute({
      conteudo,
      postId,
      authorId: request.user.sub,
    });

    return reply.status(201).send({ comment });

  } catch (err) {
    if(err instanceof CreateCommentError) {
        return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  
}
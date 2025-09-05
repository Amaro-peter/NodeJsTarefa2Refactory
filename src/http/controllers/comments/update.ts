import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository';
import { UpdateCommentUseCase } from '@/use-cases/comments/update-comment-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { InvalidCrendentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeUpdateCommentUseCase } from '@/use-cases/factories/comments/make-update-comment-use-case';

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateCommentParamsSchema = z.object({
    commentId: z.string().uuid(),
  });

  const updateCommentBodySchema = z.object({
    conteudo: z.string().optional(),
  });

  const { commentId } = updateCommentParamsSchema.parse(request.params);
  const { conteudo } = updateCommentBodySchema.parse(request.body);

  try {
    const updateCommentUseCase = makeUpdateCommentUseCase();

    const data = { 
        ...(conteudo !== undefined && { conteudo: { set: conteudo } }),
     };

    const { comment } = await updateCommentUseCase.execute({
      commentId,
      authorId: request.user.sub,
      data,
    });

    return reply.status(200).send(comment);
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message ?? 'Recurso não encontrado.' });
    }
    if(err instanceof InvalidCrendentialsError) {
        return reply.status(401).send({ message: err.message ?? 'Credenciais inválidas.' });
    }

    throw err;
  }
}
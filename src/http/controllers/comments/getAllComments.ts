import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetAllCommentsUseCase } from '@/use-cases/comments/get-all-comments-use-case';

export async function getAllComments(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const commentsRepository = new PrismaCommentsRepository();
    const getAllCommentsUseCase = new GetAllCommentsUseCase(commentsRepository);

    const { comments } = await getAllCommentsUseCase.execute();

    return reply.status(200).send(comments);
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message ?? 'Recurso não encontrado.' });
    }

    throw err;
  }
}
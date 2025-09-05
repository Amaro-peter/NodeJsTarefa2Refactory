import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdatePostUseCase } from '@/use-cases/factories/posts/make-update-post-use-case';

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updatePostParamsSchema = z.object({
    postId: z.string().uuid(),
  });

  const updatePostBodySchema = z.object({
    titulo: z.string().optional(),
    conteudo: z.string().optional(),
  });

  const { postId } = updatePostParamsSchema.parse(request.params);
  const { titulo, conteudo } = updatePostBodySchema.parse(request.body);

  try {
    const updatePostUseCase = makeUpdatePostUseCase();

    const data = {
      ...(titulo !== undefined && { titulo: { set: titulo } }),
      ...(conteudo !== undefined && { conteudo: { set: conteudo } }),
    };

    const { post } = await updatePostUseCase.execute({
      postId,
      authorId: request.user.sub,
      data,
    });

    return reply.status(200).send(post);
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
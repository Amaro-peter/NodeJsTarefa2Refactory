import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository';
import { CreatePostUseCase } from '@/use-cases/posts/create-posts-use-case';
import { PostCreationError } from '@/use-cases/errors/create-post-error';
import { makeCreatePostUseCase } from '@/use-cases/factories/posts/make-create-post-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPostSchema = z.object({
    titulo: z.string(),
    conteudo: z.string(),
  });

  const { titulo, conteudo } = createPostSchema.parse(request.body);

  try {
    const createPostUseCase = makeCreatePostUseCase();

    await createPostUseCase.execute({
      titulo,
      conteudo,
      authorId: request.user.sub,
    });
  } catch (err) {
    if (err instanceof PostCreationError) {
        return reply.status(500).send({ error: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
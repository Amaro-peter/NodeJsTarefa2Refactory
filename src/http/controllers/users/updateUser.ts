import { UserPresenter } from '@/http/presenters/user-presenter'
import { updateSchema } from '@/http/schemas/users/update-schema'
import { publicIdSchema } from '@/http/schemas/utils/public-id-schema'
import { logger } from '@/lib/logger'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateUserUseCase } from '@/use-cases/factories/user/make-update-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body
    
    const { name, email, photo } = updateSchema.parse(body)
    
    const { publicId } = publicIdSchema.parse(request.params)

    const updateUserUseCase = makeUpdateUserUseCase()

    const { user } = await updateUserUseCase.execute({
      publicId: publicId || '',
      ...(typeof name === 'string' ? { name } : {}),
      ...(typeof email === 'string' ? { email } : {}),
      ...(typeof photo === 'string' ? { photo } : {}),
    })

    logger.info('User updated successfully!')

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
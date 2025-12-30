import { UserPresenter } from '@/http/presenters/user-presenter'
import { publicIdSchema } from '@/http/schemas/utils/public-id-schema'
import { logger } from '@/lib/logger'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUserUseCase } from '@/use-cases/factories/user/make-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'


export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserProfileUseCase = makeUserUseCase()

    const data = { publicId: String((request.user as any)?.sub) }

    const { publicId } = publicIdSchema.parse(data)

    const { user } = await getUserProfileUseCase.execute({ publicId })

    if (!user) {
      return reply.status(404).send({ message: 'User not found' })
    }

    logger.info('User profile retrieved successfully!')

    return reply.status(200).send({ user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}

export async function getUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserProfileUseCase = makeUserUseCase()
    const { publicId } = request.params as { publicId: string }

    const { user } = await getUserProfileUseCase.execute({ publicId })

    if (!user) {
      return reply.status(404).send({ message: 'User not found' })
    }

    logger.info('User retrieved successfully!')

    return reply.status(200).send({ user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
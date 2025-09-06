import { UserPresenter } from '@/http/presenters/user-presenter'
import { authenticateSchema } from '@/http/schemas/users/authenticate-schema'
import { logger } from '@/lib/logger'
import { InvalidCrendentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticationUseCase } from '@/use-cases/factories/user/make-authentication-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'


export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, senha } = authenticateSchema.parse(request.body)

    const authenticateUserUseCase = makeAuthenticationUseCase()

    const { user } = await authenticateUserUseCase.execute({ email, senha })

    logger.info('User authenticated successfully!')

    const token = await reply.jwtSign({ sub: user.publicId, role: user.role }, { expiresIn: '1d' })

    return reply.status(200).send({ token, user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof InvalidCrendentialsError) {
      return reply.status(400).send({ message: error })
    }

    throw error
  }
}